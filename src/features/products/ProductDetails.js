import {Card, Image, Message} from "semantic-ui-react";
import {useRouteMatch} from "react-router-dom";
import {productImageSrc} from "../../app/productUtils";
import {currency} from "../../app/numberFormats";
import {useEffect, useReducer} from "react";
import Loading from "../loading/Loading";
import client from "../../app/client";
import {createAction, createReducer} from "@reduxjs/toolkit";

const loadStart = createAction('productDetails/loadStart');
const loadReady = createAction('productDetails/loadReady');
const loadError = createAction('productDetails/loadError');

const detailsReducer = createReducer({}, builder => {
    builder
        .addCase(loadStart, (state, action) => {
            state.loadingStatus = 'loading';
        })
        .addCase(loadReady, (state, action) => {
            state.loadingStatus = 'idle';
            state.product = action.payload;
        })
        .addCase(loadError, (state, action) => {
            state.loadingStatus = 'error';
            state.error = action.payload;
        });
});

export default function ProductDetails() {
    const match = useRouteMatch();
    const [state, dispatch] = useReducer(detailsReducer, {
        productId: match.params.productId,
        product: null,
        loadingStatus: 'idle',
        error: null,
    }, initialState => initialState);

    useEffect(() => {
        async function fetchData() {
            if (!state.product && state.loadingStatus === 'idle') {
                dispatch(loadStart());
                try {
                    const result = await client.getProductById(parseInt(state.productId));
                    dispatch(loadReady(result.product));
                } catch (e) {
                    dispatch(loadError(e.message || 'error loading product'))
                }
            }
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchData();
        // eslint-disable-next-line
    }, []);

    function productDetails() {
        const product = state.product;
        if (product) {
            return (
                <Card centered fluid>
                    <Image size='small' inline src={productImageSrc(product.id)}/>
                    <Card.Content>
                        <Card.Header>
                            {product.name}
                        </Card.Header>
                        <Card.Meta>
                            <span className='price'>{currency.format(product.price || 0)}</span>
                        </Card.Meta>
                        <Card.Description>
                            {product.details}
                        </Card.Description>
                    </Card.Content>
                </Card>
            );
        } else {
            return null;
        }
    }

    switch (state.loadingStatus) {
        case 'idle':
            return productDetails();
        case 'loading':
            return <Loading what={`product ${state.productId}`}/>
        case 'error':
            return <Message error content={state.error}/>
        default:
            return null;
    }

}