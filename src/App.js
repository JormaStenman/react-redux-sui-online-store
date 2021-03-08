import React, {useEffect} from 'react';
import './App.css';
import {Container} from "semantic-ui-react";
import Navbar from "./features/navbar/Navbar";
import {Redirect, Route, Switch} from "react-router-dom";
import MainContent from "./features/main/MainContent";
import ProductDetails from "./features/products/ProductDetails";
import ProductList from "./features/products/ProductList";
import Cart from "./features/cart/Cart";
import Orders from "./features/orders/Orders";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, productSelectors} from "./features/products/productsSlice";
import {fetchOrders, orderSelectors} from "./features/orders/ordersSlice";
import OrderDetails from "./features/orders/OrderDetails";

export default function App() {
    const dispatch = useDispatch();
    const products = useSelector(state => productSelectors.selectAll(state));
    const orders = useSelector(state => orderSelectors.selectAll(state));

    useEffect(() => {
        if (!products || !products.length) {
            dispatch(fetchProducts());
        }
        if (!orders || !orders.length) {
            dispatch(fetchOrders());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Navbar/>
            <Switch>
                <Route path='/orders/:orderId'>
                    <OrderDetails/>
                </Route>
                <Route path='/orders'>
                    <Orders/>
                </Route>
                <Route path='/cart'>
                    <Cart/>
                </Route>
                <Route path='/main'>
                    <MainContent/>
                </Route>
                <Route path='/products/:productId'>
                    <ProductDetails/>
                </Route>
                <Route path='/products'>
                    <ProductList/>
                </Route>
                <Route path='/'>
                    <Redirect to='/main'/>
                </Route>
            </Switch>
        </Container>
    );
}