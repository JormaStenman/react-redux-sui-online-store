import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import client from "../../app/client";

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

export const LoadingStatus = {
    failed: 'failed',
    idle: 'idle',
    loading: 'loading',
    success: 'success',
}

const entityAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.name || '').localeCompare((b.name || '')),
});

export const productsSlice = createSlice({
    name: 'products',
    initialState: entityAdapter.getInitialState({
        status: LoadingStatus.idle,
        error: null,
    }),
    reducers: {
        setAll: entityAdapter.setAll,
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

export const {setAll} = productsSlice.actions;

export const selectProductsSlice = state => state[productsSlice.name];

export const productsSelectors = entityAdapter.getSelectors(state => selectProductsSlice(state));

export default productsSlice.reducer;