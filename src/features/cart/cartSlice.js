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
        setQuantity: (state, action) => {
            const {productId, newQuantity} = action.payload;
            state[productId] = newQuantity;
            if (state[productId] <= 0) {
                delete state[productId];
            }
        },
        emptyCart: _ => ({}),
    },
});

export const {addToCart, emptyCart, setQuantity,} = cartSlice.actions;

export const selectCartSlice = state => state[cartSlice.name];

export const selectNumberOfItemsInCart = state => Object.keys(selectCartSlice(state)).length;

export default cartSlice.reducer;