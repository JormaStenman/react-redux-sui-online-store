import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import client from "../../app/client";

export const OrderStatus = {
    ordered: 'ordered',
    waitingForProducts: 'waitingForProducts',
};

const entityAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt,
});

const ordersSliceName = 'orders';

export const selectOrdersSlice = state => state[ordersSliceName];

export const selectLatestOrder = state => selectOrdersSlice(state).latestOrder;

export const orderSelectors = entityAdapter.getSelectors(state => selectOrdersSlice(state));

export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAllOrders',
    async (_) => {
        return await client.getAllOrders();
    },
    {
        condition: (_, {getState}) => {
            const ordersState = selectOrdersSlice(getState());
            const total = entityAdapter.getSelectors().selectTotal(ordersState);
            return total === 0 && !ordersState.loading;
        },
    },
);

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async newOrder => {
        return await client.createOrder(newOrder);
    },
);

export const cancelOrder = createAsyncThunk(
    'orders/cancelOrder',
    async orderId => {
        return await client.deleteOrder(orderId);
    },
);

export const clearOrders = createAsyncThunk(
    'orders/clearOrders',
    async () => {
        return await client.clearOrders();
    },
);

export const ordersSlice = createSlice({
    name: ordersSliceName,
    initialState: entityAdapter.getInitialState({
        loading: false,
        error: null,
        latestOrder: null,
    }),
    extraReducers: builder => {
        builder
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                entityAdapter.setAll(state, action.payload.orders);
            })
            .addCase(fetchAllOrders.rejected, state => {
                entityAdapter.removeAll(state);
            })
            .addCase(createOrder.pending, state => {
                state.latestOrder = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.latestOrder = action.payload.order;
                entityAdapter.addOne(state, action.payload.order);
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                entityAdapter.removeOne(state, action.payload.deleted);
            })
            .addCase(clearOrders.fulfilled, (state) => {
                entityAdapter.removeAll(state);
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

export default ordersSlice.reducer;