import {Button, Card, Container, Grid, Image, Message, Modal} from "semantic-ui-react";
import {Link, useRouteMatch} from "react-router-dom";
import {productImageSrc} from "../../app/productUtils";
import {currency} from "../../app/numberFormats";
import {useDispatch, useSelector} from "react-redux";
import {LoadingStatus, productSelectors, selectProductsSlice} from "./productsSlice";
import {useEffect, useState} from "react";
import {addToCart} from "../cart/cartSlice";

export default function ProductDetails() {
    const match = useRouteMatch();
    // noinspection JSUnresolvedVariable
    const productId = match.params.productId;
    const product = useSelector(state => productSelectors.selectById(state, parseInt(productId)));
    const loadingStatus = useSelector(state => selectProductsSlice(state).status);
    const dispatch = useDispatch();
    const [addModalOpen, setAddModalOpen] = useState(false);

    function handleAddClick(productId) {
        dispatch(addToCart(productId));
        setAddModalOpen(true);
    }

    function AddModal({product}) {
        useEffect(() => {
            const timeoutID = setTimeout(() => setAddModalOpen(false), 5000);
            return () => clearTimeout(timeoutID);
        });

        return (
            <Modal open closeIcon onClose={() => {
                setAddModalOpen(false);
            }}>
                <Modal.Header>
                    One <i><u>{product.name}</u></i> added in <Link to='/cart'>cart</Link>.
                </Modal.Header>
                <Modal.Content>
                    <Image size='tiny' inline src={productImageSrc(product.id)}/>
                </Modal.Content>
            </Modal>
        );
    }

    if (product) {
        return (
            <Container>
                <Card centered fluid>
                    <Grid stackable container>
                        <Grid.Row>
                            <Grid.Column>
                                <Card.Header>
                                    <span className='meta'>{product.id}</span>
                                    <span>&nbsp;</span>
                                    <span>{product.name}</span>
                                </Card.Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='3'>
                                <Image size='small' inline src={productImageSrc(product.id)}/>
                            </Grid.Column>
                            <Grid.Column width='13' textAlign='justified'>
                                <Card.Content>
                                    <Card.Meta>
                                        <span className='price'>{currency.format(product.price || 0)}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {product.details}
                                    </Card.Description>
                                </Card.Content>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button.Group>
                        <Button icon='undo' content='See more products' as={Link} to='/products'/>
                        <Button primary icon='cart' content='Add to cart' onClick={() => handleAddClick(productId)}/>
                    </Button.Group>
                </Card>
                {addModalOpen && <AddModal product={product}/>}
            </Container>
        );
    } else {
        if (loadingStatus === LoadingStatus.success) {
            return (
                <Message error>
                    No product found with id {productId}.
                </Message>
            );
        }
        return null;
    }
}