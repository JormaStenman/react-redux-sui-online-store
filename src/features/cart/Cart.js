import {Button, Input, Modal, Segment, Table} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {emptyCart, selectCartSlice, setQuantity} from "./cartSlice";
import {productSelectors, modifyInventory} from "../products/productsSlice";
import {currency} from "../../app/numberFormats";
import {Link} from "react-router-dom";
import {createOrder, OrderStatus, selectLatestOrder} from "../orders/ordersSlice";
import {useState} from "react";
import StoreModal from "../modal/StoreModal";
import Loading from "../loading/Loading";

function ProductRow({productId}) {
    const product = useSelector(state => productSelectors.selectById(state, parseInt(productId)));
    const quantity = useSelector(state => selectCartSlice(state)[product.id]);
    const dispatch = useDispatch();

    function handleQuantityChange(evt) {
        const newQuantity = parseInt(evt.target.value);
        dispatch(setQuantity({productId: product.id, newQuantity}));
    }

    if (product) {
        // noinspection JSUnresolvedVariable
        return (
            <Table.Row>
                <Table.Cell><Link to={`/products/${product.id}`}>{product.id}</Link></Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{currency.format(product.price || 0)}</Table.Cell>
                <Table.Cell>
                    <Input
                        fluid
                        label={<Button
                            icon='remove'
                            onClick={() => handleQuantityChange({target: {value: 0}})}
                            title='remove'
                        />}
                        type='number'
                        min={1}
                        max={product.inventory}
                        defaultValue={quantity}
                        onChange={handleQuantityChange}
                    />
                </Table.Cell>
            </Table.Row>
        );
    }
    return null;
}

function CartTotal() {
    const cart = useSelector(state => selectCartSlice(state));
    const products = useSelector(state => productSelectors.selectEntities(state));
    const cartTotal = Object.keys(cart).reduce(
        (total, productId) => total + cart[productId] * products[parseInt(productId)].price, 0.0
    );
    return (
        <span>Cart total:&nbsp;<strong>{currency.format(cartTotal)}</strong></span>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const cart = useSelector(state => selectCartSlice(state));
    const dispatch = useDispatch();
    const products = useSelector(state => productSelectors.selectEntities(state));
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const latestOrder = useSelector(state => selectLatestOrder(state));

    function assembleOrder() {
        return Object.keys(cart).reduce((order, productId) => {
            const product = products[parseInt(productId)];
            const quantity = cart[productId];
            // noinspection JSUnresolvedVariable
            const remaining = product.inventory - quantity;
            if (!order.products[productId]) {
                order.products[productId] = {
                    unitPrice: product.price,
                    quantity,
                };
            }
            if (order.status !== OrderStatus.waitingForProducts) {
                // any product not in stock will set order status to 'waiting for products'
                order.status = remaining < 0 ? OrderStatus.waitingForProducts : OrderStatus.ordered;
            }
            dispatch(modifyInventory({
                productId: product.id,
                quantity: -quantity,
            }));
            return order;
        }, {products: {}});
    }

    function handlePlaceOrder() {
        dispatch(createOrder(assembleOrder()));
        dispatch(emptyCart());
        setOrderModalOpen(true);
    }

    function orderModal() {
        if (latestOrder) {
            return (
                <StoreModal
                    modalOpen={orderModalOpen}
                    setModalOpen={setOrderModalOpen}
                    render={() => (
                        <>
                            <Modal.Header>
                                Thank you for your order!
                            </Modal.Header>
                            <Modal.Content>
                                <Segment.Group>
                                    <Segment.Inline>
                                        <Link to={`/orders/${latestOrder.id}`} replace>View this order.</Link>
                                    </Segment.Inline>
                                    <Segment.Inline>
                                        You can view all your orders on the <Link to='/orders' replace>Orders
                                        page</Link>
                                    </Segment.Inline>
                                </Segment.Group>
                            </Modal.Content>
                        </>
                    )}
                />
            );
        }
        if (orderModalOpen) {
            return <Loading what='order'/>
        }
        return null;
    }

    return (
        <>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width='1'>ID</Table.HeaderCell>
                        <Table.HeaderCell width='10'>Name</Table.HeaderCell>
                        <Table.HeaderCell width='3'>Unit Price</Table.HeaderCell>
                        <Table.HeaderCell width='2'>Quantity</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Object.keys(cart).map(productId => (
                        <ProductRow key={productId} productId={productId}/>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <CartTotal/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
            <Button.Group>
                <Button
                    as={Link}
                    content='See more products'
                    icon='arrow alternate circle left outline'
                    to='/products'
                />
                <Button
                    content='Cancel order'
                    disabled={Object.keys(cart).length === 0}
                    icon='trash alternate'
                    negative
                    onClick={() => dispatch(emptyCart())}
                />
                <Button
                    content='Place order'
                    disabled={Object.keys(cart).length === 0}
                    icon='share square'
                    onClick={handlePlaceOrder}
                    primary
                />
            </Button.Group>

            {orderModal()}
        </>
    );
}