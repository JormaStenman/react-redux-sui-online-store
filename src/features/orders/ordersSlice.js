import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import client from "../../app/client";
import LoadingStatus from "../../app/LoadingStatus";
import {v4 as uuid} from 'uuid';

export const OrderStatus = {
    ordered: 'ordered',
    waitingForProducts: 'waitingForProducts',
};

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, {rejectWithValue}) => {
        try {
            return await client.getAllOrders();
        } catch (e) {
            return rejectWithValue(e.message || 'error fetching orders');
        }
    }
);

const entityAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.date.localeCompare(b.date),
});

// noinspection DuplicatedCode
export const ordersSlice = createSlice({
    name: 'orders',
    initialState: entityAdapter.getInitialState({
        status: LoadingStatus.idle,
        error: null,
    }),
    reducers: {
        addOrder: {
            reducer: entityAdapter.addOne,
            prepare: userPayload => ({
                payload: {
                    ...userPayload,
                    id: uuid(),
                    date: new Date().toISOString().substr(0, 10),
                    createdAt: Date.now(),
                }
            }),
        },
        deleteOrder: entityAdapter.removeOne,
    },
    extraReducers: {
        [fetchOrders.pending]: state => {
            state.status = LoadingStatus.loading;
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.status = LoadingStatus.success;
            entityAdapter.setAll(state, action.payload.orders || []);
            state.error = null;
        },
        [fetchOrders.rejected]: (state, action) => {
            state.status = LoadingStatus.failed;
            state.error = action.payload;
        },
    },
});

export const {addOrder, deleteOrder} = ordersSlice.actions;

export const selectOrdersSlice = state => state[ordersSlice.name];

export const orderSelectors = entityAdapter.getSelectors(state => selectOrdersSlice(state));

export const selectLatestOrder = state => {
    const sorted = orderSelectors.selectAll(state)
        .sort((a, b) => b.createdAt - a.createdAt);
    return sorted && sorted.length ? sorted[0] : undefined;
};

export default ordersSlice.reducer;