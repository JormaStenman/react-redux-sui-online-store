import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cancelOrder, fetchAllOrders, orderSelectors, orderStatusToText, selectOrdersSlice} from "./ordersSlice";
import {Button, Grid, Image, Message, Placeholder, Table} from "semantic-ui-react";
import {fetchAllProducts, modifyInventory, productSelectors, selectProductsSlice} from "../products/productsSlice";
import {productImageSrc} from "../../app/productUtils";
import {currency} from "../../app/numberFormats";
import {useEffect, useState} from "react";
import Loading from "../loading/Loading";

function OrderProductRow({order, productId}) {
    const dispatch = useDispatch();
    const product = useSelector(state => productSelectors.selectById(state, productId));
    const loading = useSelector(state => selectProductsSlice(state).loading);
    const loadError = useSelector(state => selectProductsSlice(state).error);

    useEffect(() => {
        dispatch(fetchAllProducts());
    });

    function productName() {
        if (loading) {
            return (
                <Placeholder fluid>
                    <Placeholder.Line/>
                </Placeholder>
            );
        }
        if (loadError) {
            return <Message error content={loadError}/>
        }
        if (product) {
            return product.name;
        }
    }

    return (
        <Table.Row>
            <Table.Cell>
                <Link to={`/products/${productId}`}>
                    <Image size='tiny' inline src={productImageSrc(productId)}/>
                    &nbsp;
                    {productName()}
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
    const [totalPrice, setTotalPrice] = useState(0.0);
    const order = useSelector(state => orderSelectors.selectById(state, match.params.orderId));
    const loading = useSelector(state => selectOrdersSlice(state).loading);
    const loadError = useSelector(state => selectOrdersSlice(state).error);

    useEffect(() => {
        dispatch(fetchAllOrders());
    });

    useEffect(() => {
        if (order && order.products) {
            const productIds = Object.keys(order.products);
            if (productIds && productIds.length) {
                setTotalPrice(productIds.reduce((total, productId) => {
                    const product = order.products[productId];
                    return total + product.quantity * product.unitPrice;
                }, 0.0));
            }
        }
    }, [order]);

    function reStockOrder() {
        Object.keys(order.products).forEach(productId => {
            dispatch(modifyInventory({
                productId: parseInt(productId),
                quantity: order.products[productId].quantity,
            }))
        });
    }

    function handleCancel() {
        dispatch(cancelOrder(order.id));
        reStockOrder();
        history.replace('/orders');
    }

    if (loading) {
        return <Loading what='order'/>;
    }

    if (loadError) {
        return <Message error content={loadError}/>;
    }

    if (order) {
        return (
            <Grid celled container>
                <Grid.Row>
                    <Grid.Column width={6}>
                        Order id: <b>{order.id}</b>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        Order date: {order.date}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        Order status: {orderStatusToText(order.status)}
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
                                {Object.keys(order.products).map(productId => (
                                    <OrderProductRow
                                        key={productId}
                                        order={order}
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
                        <b><span className='price'>{currency.format(totalPrice)}</span></b>
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

    return null;
};