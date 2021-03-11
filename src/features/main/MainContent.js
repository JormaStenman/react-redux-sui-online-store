import {Button, Container, Header, List} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearOrders, orderSelectors} from "../orders/ordersSlice";
import {clearProducts, productSelectors} from "../products/productsSlice";

export default function MainContent() {
    const dispatch = useDispatch();
    const ordersCount = useSelector(state => orderSelectors.selectTotal(state));
    const productsCount = useSelector(state => productSelectors.selectTotal(state));
    const [clearButtonDisabled, setClearButtonDisabled] = useState(false);
    const [clearButtonLoading, setClearButtonLoading] = useState(false);

    useEffect(() => {
        const count = ordersCount + productsCount;
        if (count === 0) {
            setClearButtonLoading(false);
        }
        setClearButtonDisabled(count === 0);
    }, [ordersCount, productsCount]);

    function handleClear() {
        setClearButtonLoading(true);
        setClearButtonDisabled(true);
        dispatch(clearOrders());
        dispatch(clearProducts());
    }

    return (
        <Container style={{marginTop: '3em'}}>
            <Header as='h2' dividing>Demo Online Store</Header>
            <p>
                This web application demonstrates the following features usually found in any online store
                website:
            </p>
            <List bulleted relaxed style={{marginTop: '2em', marginBottom: '2em'}}>
                <List.Item>A list of products can be browsed.</List.Item>
                <List.Item>The details of any product can be viewed.</List.Item>
                <List.Item>Products can be added into a shopping cart.</List.Item>
                <List.Item>The contents of the shopping cart can be manipulated before ordering.</List.Item>
                <List.Item>The list of orders can be viewed.</List.Item>
                <List.Item>The details of any order can be viewed.</List.Item>
                <List.Item>An order can be cancelled.</List.Item>
                <List.Item>Product inventories change when orders are placed or cancelled.</List.Item>
                <List.Item>A navigation bar is always visible at the top of the page.</List.Item>
            </List>
            <Header as='h2' dividing>Implementation aspects</Header>
            <p>
                A few implementation details worth mentioning:
            </p>
            <List bulleted relaxed style={{marginTop: '2em', marginBottom: '2em'}}>
                <List.Item>
                    The application is a <a href='https://en.wikipedia.org/wiki/Single-page_application'>Single
                    Page Application</a> working entirely inside the browser.
                </List.Item>
                <List.Item>
                    The application currently has no database integration. Instead, it stores all product and order data
                    in <a href='https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'>the local
                    storage area</a> of the user's browser. There's a button to explicitly clear this application's
                    local storage area in the bottom of this page.
                </List.Item>
                <List.Item>
                    There's a client library simulating asynchronous client-server communication.
                </List.Item>
            </List>
            <Header as='h2' dividing>Implementation techniques</Header>
            <p>
                The application utilizes the following techniques and libraries:
            </p>
            <List bulleted relaxed style={{marginTop: '2em', marginBottom: '2em'}}>
                <List.Item>
                    All code is <a href='https://www.w3schools.com/Js/js_2018.asp'>ECMAScript 2018</a>.
                </List.Item>
                <List.Item>
                    All components are <a href='https://reactjs.org/docs/components-and-props.html'>React Function
                    Components</a>.
                </List.Item>
                <List.Item>
                    Application state is managed using <a href='https://reactjs.org/docs/hooks-intro.html'>React
                    Hooks</a> and <a href='https://redux-toolkit.js.org'>Redux Toolkit</a>.
                </List.Item>
                <List.Item>
                    Navigation within the application is managed by <a href='https://reactrouter.com'>React Router</a>.
                </List.Item>
                <List.Item>
                    UI components come from <a href='https://react.semantic-ui.com'>Semantic UI React</a>
                </List.Item>
            </List>
            <Header as='h2' dividing>What next?</Header>
            <p>
                The app is pretty basic in its current state. Here are some ideas, prioritized, of what to add
                next:
            </p>
            <List ordered relaxed style={{marginTop: '2em', marginBottom: '2em'}}>
                <List.Item>
                    As the main purpose of developing this app was to explore React and related technologies, and time
                    was a bit of an issue, unit tests were omitted.
                </List.Item>
                <List.Item>
                    There's no login/logout functionality for users.
                </List.Item>
                <List.Item>
                    Could use a real database with a backend service.
                </List.Item>
                <List.Item>
                    Currently, the app only speaks English. It could do with some l10n love.
                </List.Item>
            </List>
            <Button
                negative
                icon='trash alternate'
                content='Clear local storage area'
                onClick={() => handleClear()}
                disabled={clearButtonDisabled}
                loading={clearButtonLoading}
            />
        </Container>
    );
}