import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {cancelOrder, getOrderById} from "./ordersSlice";
import {Button, Grid, Image, Message, Table} from "semantic-ui-react";
import {fetchProductsByIds, updateProduct} from "../products/productsSlice";
import {productImageSrc} from "../../app/productUtils";
import {currency} from "../../app/numberFormats";
import {useEffect, useRef, useState} from "react";
import {unwrapResult} from "@reduxjs/toolkit";
import Loading from "../loading/Loading";

function OrderProductRow({order, products, productId}) {
    return (
        <Table.Row>
            <Table.Cell>
                <Link to={`/products/${productId}`}>
                    <Image size='tiny' inline src={productImageSrc(productId)}/>
                    &nbsp;
                    {products[productId].name}
                </Link>
            </Table.Cell>
            <Table.Cell>{order.products[productId].quantity}</Table.Cell>
            <Table.Cell>
                <span className='price'>{currency.format(order.products[productId].unitPrice)}</span>
            </Table.Cell>
        </Table.Row>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const history = useHistory();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState('');
    const [loadError, setLoadError] = useState('');
    const totalPrice = useRef(0.0);

    useEffect(() => {

        let cancelled = false;

        async function getOrder() {
            setLoading('order');
            setLoadError('');
            try {
                const result = unwrapResult(await dispatch(getOrderById(match.params.orderId)));
                if (!cancelled) {
                    totalPrice.current = Object.keys(result.order.products).reduce(
                        (total, productId) => {
                            const product = result.order.products[productId];
                            return total + product.unitPrice * product.quantity;
                        },
                        0.0
                    );
                    setOrder(result.order);
                }
            } catch (e) {
                if (!cancelled) {
                    setOrder(null);
                    setLoadError(e);
                }
            } finally {
                if (!cancelled) {
                    setLoading('');
                }
            }
        }

        // noinspection JSIgnoredPromiseFromCall
        getOrder();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line
    }, [match]);

    useEffect(() => {
        let cancelled = false;

        async function getProducts() {
            if (!cancelled) {
                setLoading('products');
                setLoadError('');
            }
            try {
                const response = unwrapResult(await dispatch(fetchProductsByIds(
                    Object.keys(order.products).map(productId => parseInt(productId))
                )));
                if (!cancelled) {
                    setProducts(response.products.reduce((productsById, product) => {
                        productsById[product.id] = product;
                        return productsById;
                    }, {}))
                }
            } catch (e) {
                if (!cancelled) {
                    setProducts(null);
                    setLoadError(e);
                }
            } finally {
                if (!cancelled) {
                    setLoading('');
                }
            }
        }

        if (order) {
            // noinspection JSIgnoredPromiseFromCall
            getProducts();
        }

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line
    }, [order]);

    function reStock(order) {
        Object.keys(order.products).forEach(productId => {
            const product = products[productId];
            const quantity = order.products[productId].quantity;
            const remaining = product.inventory + quantity;
            dispatch(updateProduct({
                id: parseInt(productId),
                changes: {
                    inventory: remaining,
                }
            }));
        });
    }

    function handleCancel(orderId) {
        dispatch(cancelOrder(orderId));
        reStock(order);
        history.replace('/orders');
    }

    if (order && products) {
        return (
            <Grid celled container>
                <Grid.Row>
                    <Grid.Column width={8}>
                        Order id <b>{order.id}</b>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        Order date: {order.date}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Table striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={10}>Product</Table.HeaderCell>
                                    <Table.HeaderCell width={3}>Quantity</Table.HeaderCell>
                                    <Table.HeaderCell width={3}>Unit Price</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {Object.keys(products).map(productId => (
                                    <OrderProductRow
                                        key={productId}
                                        order={order}
                                        products={products}
                                        productId={productId}
                                    />
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={10}>
                        Order total:&nbsp;
                        <b><span className='price'>{currency.format(totalPrice.current)}</span></b>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button.Group fluid>
                            <Button icon='arrow alternate circle left outline' content='All orders'
                                    as={Link}
                                    to='/orders'/>
                            <Button
                                icon='trash alternate'
                                negative
                                onClick={() => handleCancel(order.id)} content='Cancel order'
                            />
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    if (loading) {
        return <Loading what={loading}/>;
    }

    if (loadError) {
        return <Message error content={loadError}/>
    }

    return null;
};