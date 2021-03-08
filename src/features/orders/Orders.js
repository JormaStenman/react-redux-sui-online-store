// eslint-disable-next-line import/no-anonymous-default-export
import {Button, Table} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, orderSelectors} from "./ordersSlice";

function OrderRow({order}) {
    const dispatch = useDispatch();

    function handleCancel(orderId) {
        dispatch(deleteOrder(orderId));
    }

    return (
        <Table.Row key={order.id}>
            <Table.Cell>{order.id}</Table.Cell>
            <Table.Cell>{order.date}</Table.Cell>
            <Table.Cell>{order.status}</Table.Cell>
            <Table.Cell>
                <Button icon='trash alternate' negative onClick={() => handleCancel(order.id)} content='Cancel'/>
            </Table.Cell>
        </Table.Row>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const orders = useSelector(state => orderSelectors.selectAll(state));

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
}