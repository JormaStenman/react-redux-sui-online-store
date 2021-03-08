import {Message, Table} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {orderSelectors, OrderStatus} from "./ordersSlice";
import {Link, useLocation} from "react-router-dom";
import {productSelectors} from "../products/productsSlice";
import {truncate} from "lodash/string";

function OrderRow({order}) {
    const location = useLocation();
    const productsById = useSelector(state => productSelectors.selectEntities(state));

    function productNamesInOrder(order) {
        return Object.keys(order.products).map(productId => truncate(productsById[parseInt(productId)].name, {length: 20}));
    }

    function statusToText(orderStatus) {
        switch (orderStatus) {
            case OrderStatus.ordered:
                return 'ordered';
            case OrderStatus.waitingForProducts:
                return 'waiting for products';
            default:
                return '';
        }
    }

    const orderUrl = `${location.pathname}/${order.id}`;

    return (
        <Table.Row>
            <Table.Cell>{order.date}</Table.Cell>
            <Table.Cell>{statusToText(order.status)}</Table.Cell>
            <Table.Cell>
                <Link to={orderUrl}>{order.id}</Link>
            </Table.Cell>
            <Table.Cell>
                {productNamesInOrder(order).join(', ')}
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
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                            <Table.HeaderCell width={6}>ID</Table.HeaderCell>
                            <Table.HeaderCell width={6}>Contents</Table.HeaderCell>
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