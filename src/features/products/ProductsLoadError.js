import {Button, Container, Message} from "semantic-ui-react";
import {fetchProducts, selectProductsSlice} from "./productsSlice";
import {useDispatch, useSelector} from "react-redux";

export default function ProductsLoadError() {
    const error = useSelector(state => selectProductsSlice(state).error);
    const dispatch = useDispatch();

    return (
        <Container>
            <Message error content={error}/>
            <Button onClick={() => dispatch(fetchProducts())}>Retry</Button>
        </Container>
    );
}