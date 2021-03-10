import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import client from "../../app/client";
import LoadingStatus from "../../app/LoadingStatus";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, {rejectWithValue}) => {
        try {
            return await client.getAllProducts();
        } catch (e) {
            return rejectWithValue(e.message || 'error fetching products');
        }
    }
);

export const fetchProductsByIds = createAsyncThunk(
    'products/fetchProductsById',
    async (ids, {rejectWithValue}) => {
        try {
            return await client.getProductsByIds(ids);
        } catch (e) {
            return rejectWithValue(e.message || 'error fetching products');
        }
    }
);

const entityAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.name || '').localeCompare((b.name || '')),
});

// noinspection DuplicatedCode
export const productsSlice = createSlice({
    name: 'products',
    initialState: entityAdapter.getInitialState({
        status: LoadingStatus.idle,
        error: null,
    }),
    reducers: {
        setAll: entityAdapter.setAll,
        updateProduct: entityAdapter.updateOne,
    },
    extraReducers: {
        [fetchProducts.pending]: state => {
            state.status = LoadingStatus.loading;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = LoadingStatus.success;
            entityAdapter.setAll(state, action.payload.products || []);
            state.error = null;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = LoadingStatus.failed;
            state.error = action.payload;
        },
    },
});

export const {setAll, updateProduct} = productsSlice.actions;

export const selectProductsSlice = state => state[productsSlice.name];

export const productSelectors = entityAdapter.getSelectors(state => selectProductsSlice(state));

export default productsSlice.reducer;