import {Link, Redirect, useHistory, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, orderSelectors} from "./ordersSlice";
import {Button, Grid, Image, Table} from "semantic-ui-react";
import {productSelectors, updateProduct} from "../products/productsSlice";
import {productImageSrc} from "../../app/productUtils";
import {currency} from "../../app/numberFormats";

function OrderRow({orderRow}) {
    return (
        <Table.Row>
            <Table.Cell>
                <Link to={`/products/${orderRow.product.id}`}>
                    <Image size='tiny' inline src={productImageSrc(orderRow.product.id)}/>
                    &nbsp;
                    {orderRow.product.name}
                </Link>
            </Table.Cell>
            <Table.Cell>{orderRow.quantity}</Table.Cell>
            <Table.Cell>
                <span className='price'>{currency.format(orderRow.unitPrice)}</span>
            </Table.Cell>
        </Table.Row>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const history = useHistory();
    // noinspection JSUnresolvedVariable
    const order = useSelector(state => orderSelectors.selectById(state, match.params.orderId));
    const productsById = useSelector(state => productSelectors.selectEntities(state));
    const products = useSelector(state => productSelectors.selectEntities(state));

    let totalPrice = 0.0;

    function orderRows() {
        return Object.keys(order.products).map(productId => {
            const product = productsById[parseInt(productId)];
            const {quantity, unitPrice} = order.products[productId];
            totalPrice += quantity * unitPrice;
            return {
                product,
                quantity,
                unitPrice,
            };
        });
    }

    function reStock(order) {
        Object.keys(order.products).forEach(productId => {
            const product = products[productId];
            const quantity = (order.products)[productId].quantity;
            const remaining = product.inventory + quantity;
            dispatch(updateProduct({
                id: parseInt(productId),
                changes: {
                    inventory: remaining,
                }
            }));
        });
    }

    function handleCancel(order) {
        dispatch(deleteOrder(order.id));
        reStock(order);
        history.replace('/orders');
    }

    if (order) {
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
                                {(orderRows() || []).map(orderRow => (
                                    <OrderRow orderRow={orderRow} key={orderRow.product.id}/>)
                                )}
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
                            <Button icon='arrow alternate circle left outline' content='All orders' as={Link}
                                    to='/orders'/>
                            <Button
                                icon='trash alternate'
                                negative
                                onClick={() => handleCancel(order)} content='Cancel order'
                            />
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
    return <Redirect to='/orders'/>
};