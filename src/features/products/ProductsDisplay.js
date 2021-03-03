import {Button, Container, Loader, Message} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, LoadingStatus, productsSelectors, selectProductsSlice} from "./productsSlice";
import {useEffect} from "react";
import ProductItems from "./ProductItems";

export default function ProductsDisplay() {
    const products = useSelector(state => productsSelectors.selectAll(state));
    const loadingStatus = useSelector(state => selectProductsSlice(state).status);
    const error = useSelector(state => selectProductsSlice(state).error);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loadingStatus === LoadingStatus.idle) {
            dispatch(fetchProducts());
        }
    }, [loadingStatus, dispatch]);

    switch (loadingStatus) {
        case LoadingStatus.loading:
            return (
                <Loader active content='loading products...'/>
            );
        case LoadingStatus.failed:
            return (
                <Container>
                    <Message error content={error}/>
                    <Button onClick={() => dispatch(fetchProducts())}>Retry</Button>
                </Container>
            );
        default:
            return (
                <ProductItems products={products}/>
            );
    }
}