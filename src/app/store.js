import {configureStore} from '@reduxjs/toolkit';
import productsReducer, {productsSlice} from "../features/products/productsSlice";

export default configureStore({
    reducer: {
        [productsSlice.name]: productsReducer,
    },
});