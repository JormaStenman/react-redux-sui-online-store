// eslint-disable-next-line import/no-anonymous-default-export
import {Button, Message, Table} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, orderSelectors} from "./ordersSlice";
import {productSelectors, updateProduct} from "../products/productsSlice";

function OrderRow({order}) {
    const dispatch = useDispatch();
    const products = useSelector(state => productSelectors.selectEntities(state));

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
    }

    return (
        <Table.Row key={order.id}>
            <Table.Cell>{order.id}</Table.Cell>
            <Table.Cell>{order.date}</Table.Cell>
            <Table.Cell>{order.status}</Table.Cell>
            <Table.Cell>
                <Button icon='trash alternate' negative onClick={() => handleCancel(order)} content='Cancel'/>
            </Table.Cell>
        </Table.Row>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const orders = useSelector(state => orderSelectors.selectAll(state));

    if (orders.length) {
        return (
            <>
                <Table striped columns={4}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {orders.map(order => (
                            <OrderRow key={order.id} order={order}/>
                        ))}
                    </Table.Body>
                </Table>
            </>
        );
    } else {
        return (
            <Message success>You have no orders.</Message>
        );
    }
}