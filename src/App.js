import React from 'react';
import './App.css';
import AllProducts from "./features/products/AllProducts";
import {Container} from "semantic-ui-react";
import Navbar from "./features/navbar/Navbar";
import {Redirect, Route, Switch} from "react-router-dom";
import MainContent from "./features/main/MainContent";
import ProductDetails from "./features/products/ProductDetails";

export default function App() {
    return (
        <Container>
            <Navbar/>
            <Switch>
                <Route path='/main'>
                    <MainContent/>
                </Route>
                <Route path='/products/:productId'>
                    <ProductDetails/>
                </Route>
                <Route path='/products'>
                    <AllProducts/>
                </Route>
                <Route path='/'>
                    <Redirect to='/main'/>
                </Route>
            </Switch>
        </Container>
    );
}