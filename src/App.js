import React from 'react';
import './App.css';
import ProductsList from "./features/products/ProductsList";
import {Container} from "semantic-ui-react";

function App() {
    return (
        <Container>
            <ProductsList/>
        </Container>
    );
}

export default App;