import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import client from "../../app/client";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await client.getAllProducts();
    return response.products || response;
});

export const LoadingStatus = {
    failed: 'failed',
    idle: 'idle',
    loading: 'loading',
    success: 'success',
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: LoadingStatus.idle,
        error: null,
    },
    reducers: {
        setAll: {
            reducer: (state, action) => {
                state.products = action.payload;
            }
        },
    },
    extraReducers: {
        [fetchProducts.pending]: state => {
            state.status = LoadingStatus.loading;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = LoadingStatus.success;
            state.products = action.payload;
            state.error = null;
        },
        [fetchProducts.rejected]: state => {
            state.status = LoadingStatus.failed;
            state.error = 'error loading products';
        },
    },
});

export const {setAll} = productsSlice.actions;

export const selectTopState = state => state[productsSlice.name];

export default productsSlice.reducer;