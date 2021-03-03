import React from 'react';
import './App.css';
import WithProducts from "./features/products/WithProducts";
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
            <Switch>
                <Route path='/main'>
                    <MainContent/>
                </Route>
                <Route path='/products/:productId'>
                    <WithProducts render={(products) => (
                        <ProductDetails products={products}/>
                    )}/>
                </Route>
                <Route path='/products'>
                    <WithProducts render={products => (
                        <ProductItems products={products}/>
                    )}/>
                </Route>
                <Route path='/'>
                    <Redirect to='/main'/>
                </Route>
            </Switch>
        </Container>
    );
}