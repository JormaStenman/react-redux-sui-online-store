import React from 'react';
import './App.css';
import LoadProducts from "./features/products/LoadProducts";
import {Container} from "semantic-ui-react";
import Navbar from "./features/navbar/Navbar";
import {Redirect, Route, Switch} from "react-router-dom";
import MainContent from "./features/main/MainContent";
import ProductDetails from "./features/products/ProductDetails";
import ProductItems from "./features/products/ProductItems";

export default function App() {
    return (
        <Container>
            <Navbar/>
            <LoadProducts/>
            <Switch>
                <Route path='/main'>
                    <MainContent/>
                </Route>
                <Route path='/products/:productId'>
                    <ProductDetails/>
                </Route>
                <Route path='/products'>
                    <ProductItems/>
                </Route>
                <Route path='/'>
                    <Redirect to='/main'/>
                </Route>
            </Switch>
        </Container>
    );
}