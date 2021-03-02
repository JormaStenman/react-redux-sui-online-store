import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
            state.products = action.payload.products || [];
            state.error = null;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = LoadingStatus.failed;
            state.error = action.payload;
        },
    },
});

export const {setAll} = productsSlice.actions;

export const selectTopState = state => state[productsSlice.name];

export default productsSlice.reducer;