import {Message, Placeholder, Table} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders, orderSelectors, OrderStatus, selectOrdersSlice} from "./ordersSlice";
import {Link, useLocation} from "react-router-dom";
import {fetchProductsByIds} from "../products/productsSlice";
import {useEffect, useState} from "react";
import LoadingStatus from "../../app/LoadingStatus";
import Loading from "../loading/Loading";
import {unwrapResult} from "@reduxjs/toolkit";
import {truncate} from "lodash/string";

function OrderRow({order}) {
    const location = useLocation();
    const dispatch = useDispatch();
    const [productNamesInOrder, setProductNamesInOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {

        let cancelled = false;

        async function getProductNamesInOrder(order) {
            const productIds = Object.keys(order.products).map(productId => parseInt(productId));
            if (!cancelled) {
                setLoading(true);
                setLoadError('');
            }
            try {
                const result = unwrapResult(await dispatch(fetchProductsByIds(productIds)));
                if (!cancelled) {
                    setProductNamesInOrder(result.products.map(product => truncate(product.name, {length: 20})));
                }
            } catch (e) {
                if (!cancelled) {
                    setProductNamesInOrder([]);
                    setLoadError(e);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        // noinspection JSIgnoredPromiseFromCall
        getProductNamesInOrder(order);

        return () => {
            cancelled = true;
        };
    }, [order, dispatch]);

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

    function orderContents() {
        if (loading) {
            return (
                <Placeholder fluid>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            );
        }
        if (loadError) {
            return <Message error content={loadError}/>
        }
        return productNamesInOrder.join(', ');
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
                {orderContents()}
            </Table.Cell>
        </Table.Row>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => orderSelectors.selectAll(state));
    const loadingStatus = useSelector(state => selectOrdersSlice(state).status);
    const loadingError = useSelector(state => selectOrdersSlice(state).error);

    useEffect(() => {
        if ((!orders || !orders.length) && loadingStatus === LoadingStatus.idle) {
            dispatch(fetchOrders());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    switch (loadingStatus) {
        case LoadingStatus.success:
        case LoadingStatus.idle:
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
        case LoadingStatus.loading:
            return <Loading what='orders'/>
        case LoadingStatus.failed:
            return (
                <Message error>
                    <p>Error loading orders: {loadingError}</p>
                    <p>Try refreshing the page.</p>
                </Message>
            );
        default:
            return null;
    }

}