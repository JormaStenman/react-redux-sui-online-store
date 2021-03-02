import {Loader, Message, Placeholder, Table} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, LoadingStatus, selectTopState} from "./productsSlice";
import {useEffect} from "react";
import {currency} from "../../app/numberFormats";

const ProductList = () => {
    const products = useSelector(state => selectTopState(state).products);
    const loadingStatus = useSelector(state => selectTopState(state).status);
    const error = useSelector(state => selectTopState(state).error);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loadingStatus === LoadingStatus.idle) {
            dispatch(fetchProducts());
        }
    }, [loadingStatus, dispatch]);

    switch (loadingStatus) {
        case LoadingStatus.loading:
            return (
                <Placeholder>
                    <Message content='loading products...'/>
                    <Loader active/>
                </Placeholder>
            );
        case LoadingStatus.failed:
            return (
                <Placeholder>
                    <Message error content={error}/>
                </Placeholder>
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