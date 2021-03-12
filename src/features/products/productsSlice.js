import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import client from "../../app/client";

const entityAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const productsSliceName = 'products';

export const selectProductsSlice = state => state[productsSliceName];

export const productSelectors = entityAdapter.getSelectors(state => selectProductsSlice(state));

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async (_) => {
        return await client.getAllProducts();
    },
    {
        condition: (_, {getState}) => {
            const productsState = selectProductsSlice(getState());
            const total = entityAdapter.getSelectors().selectTotal(productsState);
            return total === 0 && !productsState.loading;
        },
    }
);

export const modifyInventory = createAsyncThunk(
    'products/modifyInventory',
    async ({productId, quantity}) => {
        let {product: {id, inventory}} = await client.getProductById(productId);
        inventory += quantity;
        return client.updateProduct({
            id,
            inventory,
        });
    },
);

export const clearProducts = createAsyncThunk(
    'products/clearProducts',
    async () => {
        return client.clearProducts();
    }
);

export const productsSlice = createSlice({
    name: productsSliceName,
    initialState: entityAdapter.getInitialState({
        loading: false,
        error: null,
        clearing: false,
    }),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                entityAdapter.setAll(state, action.payload.products);
            })
            .addCase(fetchAllProducts.rejected, state => {
                entityAdapter.removeAll(state);
            })
            .addCase(modifyInventory.fulfilled, (state, action) => {
                entityAdapter.upsertOne(state, action.payload.updated);
            })
            .addCase(clearProducts.rejected, state => {
                state.clearing = false;
            })
            .addCase(clearProducts.pending, state => {
                state.clearing = true;
            })
            .addCase(clearProducts.fulfilled, state => {
                entityAdapter.removeAll(state);
                state.clearing = false;
            })
            .addMatcher(action => action.type.endsWith('/pending'), state => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(action => action.type.endsWith('/fulfilled'), state => {
                state.loading = false;
                state.error = null;
            })
            .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
        ;
    },
});

export default productsSlice.reducer;