import {configureStore} from '@reduxjs/toolkit';
import productsReducer, {productsSlice} from "../features/products/productsSlice";
import cartReducer, {cartSlice} from "../features/cart/cartSlice";

export default configureStore({
    reducer: {
        [productsSlice.name]: productsReducer,
        [cartSlice.name]: cartReducer,
    },
});