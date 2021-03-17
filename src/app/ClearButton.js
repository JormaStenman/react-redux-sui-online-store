import {useDispatch, useSelector} from "react-redux";
import {clearProducts, selectProductsSlice} from "../features/products/productsSlice";
import {clearOrders, selectOrdersSlice} from "../features/orders/ordersSlice";
import React, {useState} from "react";
import {hasDataInStorage} from "./client";
import {Button, Popup, Segment} from "semantic-ui-react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const dispatch = useDispatch();
    const productsClearing = useSelector(state => selectProductsSlice(state).clearing);
    const ordersClearing = useSelector(state => selectOrdersSlice(state).clearing);
    const [clearButtonDisabled, setClearButtonDisabled] = useState(!hasDataInStorage());

    function isClearing() {
        return productsClearing || ordersClearing;
    }

    function handleClear() {
        setClearButtonDisabled(true);
        // Handle local storage clearing through Redux, so that both states will match.
        dispatch(clearOrders());
        dispatch(clearProducts());
    }

    const trigger = (
        // If the button isn't wrapped in anything, and happens to be disabled,
        // the Popup tooltip won't show.
        <Button.Group>
            <Button
                negative
                icon='trash alternate'
                content='Clear local storage area'
                onClick={() => handleClear()}
                disabled={clearButtonDisabled}
                loading={isClearing()}
            />
        </Button.Group>
    );

    const content = clearButtonDisabled ? (
        <Segment basic compact>
            <p>No data in this application's local storage area.</p>
            <p>An easy way to load some is to visit the Products page.</p>
        </Segment>
    ) : (
        <Segment basic compact>
            <p>Click to remove this application's data from the local storage area.</p>
        </Segment>
    );

    return (
        <Popup
            content={content}
            trigger={trigger}
            on={['hover', 'click']}
            position='bottom left'
        />
    );
};