import {Button, Container, Loader, Message, Table} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, LoadingStatus, productsSelectors, selectProductsSlice} from "./productsSlice";
import {useEffect} from "react";
import {currency} from "../../app/numberFormats";

const ProductList = () => {
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
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {products.map(product => (
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.id}</Table.Cell>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{currency.format(product.price || 0)}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            );
    }
};
export default ProductList;