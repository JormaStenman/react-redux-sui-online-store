import {configureStore} from '@reduxjs/toolkit';
import productsReducer, {productsSlice} from "../features/products/productsSlice";
import ordersReducer, {ordersSlice} from "../features/orders/ordersSlice";
import cartReducer, {cartSlice} from "../features/cart/cartSlice";

export default configureStore({
    reducer: {
        [productsSlice.name]: productsReducer,
        [ordersSlice.name]: ordersReducer,
        [cartSlice.name]: cartReducer,
    },
});