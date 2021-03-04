import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
        addToCart: (state, action) => {
            const productId = action.payload;
            state[productId] |= 0;
            state[productId]++;
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state[productId] |= 0;
            state[productId]--;
            if (state[productId] < 0) {
                state[productId] = 0;
            }
        },
        emptyCart: _ => ({}),
    },
});

export const {addToCart, removeFromCart, emptyCart} = cartSlice.actions;

export const selectCartSlice = state => state[cartSlice.name];

export default cartSlice.reducer;