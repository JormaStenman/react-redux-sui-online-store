import React from 'react';
import './App.css';
import {Container} from "semantic-ui-react";
import Navbar from "./features/navbar/Navbar";
import {Redirect, Route, Switch} from "react-router-dom";
import MainContent from "./features/main/MainContent";
import ProductDetails from "./features/products/ProductDetails";
import ProductList from "./features/products/ProductList";
import Cart from "./features/cart/Cart";
import Orders from "./features/orders/Orders";
import OrderDetails from "./features/orders/OrderDetails";

export default function App() {

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