import {Message, Placeholder, Table} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllOrders, orderSelectors, orderStatusToText, selectOrdersSlice} from "./ordersSlice";
import {Link, useLocation} from "react-router-dom";
import {fetchAllProducts, productSelectors, selectProductsSlice} from "../products/productsSlice";
import {useEffect} from "react";
import Loading from "../loading/Loading";
import {truncate} from "lodash/string";

function OrderRow({order}) {
    const location = useLocation();
    const dispatch = useDispatch();
    const productsById = useSelector(state => productSelectors.selectEntities(state));
    const loading = useSelector(state => selectProductsSlice(state).loading);
    const loadError = useSelector(state => selectProductsSlice(state).error);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    function orderContents() {
        if (loading) {
            return (
                <Placeholder fluid>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                </Placeholder>
            );
        }

        if (loadError) {
            return <Message error content={loadError}/>
        }

        return Object.keys(order.products).map(productId => {
            const product = productsById[parseInt(productId)];
            if (product) {
                return truncate(product.name, {length: 20});
            }
            return '';
        });
    }

    const orderUrl = `${location.pathname}/${order.id}`;

    return (
        <Table.Row>
            <Table.Cell>{order.date}</Table.Cell>
            <Table.Cell>{orderStatusToText(order.status)}</Table.Cell>
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
    const loading = useSelector(state => selectOrdersSlice(state).loading);
    const loadError = useSelector(state => selectOrdersSlice(state).error);

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    if (loading) {
        return <Loading what='orders'/>;
    }

    if (loadError) {
        return <Message error content={loadError}/>
    }

    if (orders) {
        if (orders.length === 0) {
            return (
                <Message success>You have no orders.</Message>
            );
        }
        return (
            <>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Status</Table.HeaderCell>
                            <Table.HeaderCell width={5}>ID</Table.HeaderCell>
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
    }

    return null;
}