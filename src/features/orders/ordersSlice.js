import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import client from "../../app/client";
import LoadingStatus from "../../app/LoadingStatus";

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

// noinspection DuplicatedCode
export const ordersSlice = createSlice({
    name: ordersSliceName,
    initialState: entityAdapter.getInitialState({
        status: LoadingStatus.idle,
        error: null,
        latestOrder: null,
    }),
    reducers: {
        setAll: entityAdapter.setAll,
        addOrder: (state, action) => {
            entityAdapter.addOne(state, action);
            state.latestOrder = action.payload;
        },
        deleteOrder: entityAdapter.removeOne,
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLatestOrder: (state, action) => {
            state.latestOrder = action.payload;
        }
    },
});

export const getOrderById = createAsyncThunk(
    'orders/getOrderById',
    async (orderId, {rejectWithValue}) => {
        try {
            return await client.getOrderById(orderId);
        } catch (e) {
            return rejectWithValue(e.message || 'error fetching order');
        }
    },
)

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, {dispatch}) => {
        dispatch(ordersSlice.actions.setStatus(LoadingStatus.loading));
        try {
            const result = await client.getAllOrders();
            dispatch(ordersSlice.actions.setStatus(LoadingStatus.success));
            dispatch(ordersSlice.actions.setError(null));
            dispatch(ordersSlice.actions.setAll(result.orders))
        } catch (e) {
            dispatch(ordersSlice.actions.setStatus(LoadingStatus.failed));
            dispatch(ordersSlice.actions.setError(e.message));
        }
    }
);

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (newOrder, {rejectWithValue, dispatch}) => {
        dispatch(ordersSlice.actions.setLatestOrder(null));
        try {
            const response = await client.createOrder(newOrder);
            dispatch(ordersSlice.actions.addOrder(response.order));
        } catch (e) {
            return rejectWithValue(e.message || 'error creating new order');
        }
    }
);

export const cancelOrder = createAsyncThunk(
    'orders/cancelOrder',
    async (orderId, {rejectWithValue, dispatch}) => {
        try {
            await client.deleteOrder(orderId);
            dispatch(ordersSlice.actions.deleteOrder(orderId));
        } catch (e) {
            return rejectWithValue(e.message || 'error creating new order');
        }
    }
);

export default ordersSlice.reducer;