import React from 'react';
import './App.css';
import ProductsDisplay from "./features/products/ProductsDisplay";
import {Container, Message} from "semantic-ui-react";
import Navbar from "./features/navbar/Navbar";
import {Redirect, Route, Switch} from "react-router-dom";

export default function App() {
    return (
        <Container>
            <Navbar/>
            <Switch>
                <Route path='/main'>
                    <Container>
                        <Message>main content goes here</Message>
                    </Container>
                </Route>
                <Route path='/products'>
                    <ProductsDisplay/>
                </Route>
                <Route path='/'>
                    <Redirect to='/main'/>
                </Route>
            </Switch>
        </Container>
    );
}