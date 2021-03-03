import React from 'react';
import './App.css';
import ProductsList from "./features/products/ProductsList";
import {Container, Message} from "semantic-ui-react";
import Navbar from "./features/navbar/Navbar";
import {Redirect, Route, Switch} from "react-router-dom";

function App() {
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
                    <ProductsList/>
                </Route>
                <Route path='/'>
                    <Redirect to='/main'/>
                </Route>
            </Switch>
        </Container>
    );
}

export default App;