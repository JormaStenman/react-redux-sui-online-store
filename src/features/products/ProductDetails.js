import {Button, Card, Container, Grid, Image, Message, Modal} from "semantic-ui-react";
import {Link, useRouteMatch} from "react-router-dom";
import {productImageSrc} from "../../app/productUtils";
import {currency} from "../../app/numberFormats";
import {useDispatch} from "react-redux";
import {fetchProductsByIds} from "./productsSlice";
import {useEffect, useState} from "react";
import {addToCart} from "../cart/cartSlice";
import StoreModal from "../modal/StoreModal";
import Loading from "../loading/Loading";
import {unwrapResult} from "@reduxjs/toolkit";

export default function ProductDetails() {
    const match = useRouteMatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState('');
    const dispatch = useDispatch();
    const [addModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function getProduct() {
            setLoading(true);
            setLoadError('');
            try {
                const response = unwrapResult(await dispatch(fetchProductsByIds([parseInt(match.params.productId)])));
                if (!cancelled) {
                    const products = response.products;
                    if (products.length) {
                        setProduct(products[0]);
                    } else {
                        setProduct(null);
                        setLoadError('product not found');
                    }
                }
            } catch (e) {
                if (!cancelled) {
                    setProduct(null);
                    setLoadError(e);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        // noinspection JSIgnoredPromiseFromCall
        getProduct();

        return () => {
            cancelled = true;
        };
    }, [dispatch, match.params.productId]);

    function handleAddClick(productId) {
        dispatch(addToCart(productId));
        setAddModalOpen(true);
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
                                <Card.Content extra>
                                    <Card.Meta>
                                        <span>In stock: {product.inventory}</span>
                                    </Card.Meta>
                                </Card.Content>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button.Group>
                                    <Button icon='arrow alternate circle left outline' content='See more products'
                                            as={Link}
                                            to='/products'/>
                                    <Button primary icon='add to cart' content='Add to cart'
                                            onClick={() => handleAddClick(match.params.productId)}/>
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card>
                <StoreModal
                    modalOpen={addModalOpen}
                    setModalOpen={setAddModalOpen}
                    timeout={5000}
                    render={() => (
                        <>
                            <Modal.Header>
                                One of <i>{product.name}</i> added in <Link to='/cart' replace>cart</Link>.
                            </Modal.Header>
                            <Modal.Content>
                                <Image size='tiny' inline src={productImageSrc(product.id)}/>
                            </Modal.Content>
                        </>
                    )}
                />
            </Container>
        );
    }

    if (loading) {
        return <Loading what='product'/>;
    }

    if (loadError) {
        return <Message error content={loadError}/>
    }

    return null;
}