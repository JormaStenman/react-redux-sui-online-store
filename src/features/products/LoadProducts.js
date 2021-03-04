import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, LoadingStatus, productSelectors, selectProductsSlice} from "./productsSlice";
import {useEffect} from "react";
import Loading from "../loading/Loading";
import {Message} from "semantic-ui-react";

export default function LoadProducts() {
    const loadingStatus = useSelector(state => selectProductsSlice(state).status);
    const loadingError = useSelector(state => selectProductsSlice(state).error);
    const dispatch = useDispatch();
    const products = useSelector(state => productSelectors.selectAll(state));

    useEffect(() => {
        if ((!products || !products.length) && loadingStatus === LoadingStatus.idle) {
            dispatch(fetchProducts());
        }
    });

    switch (loadingStatus) {
        case LoadingStatus.loading:
            return <Loading what='products'/>;
        case LoadingStatus.failed:
            return (
                <Message error>
                    <p>Error while loading products: {loadingError}</p>
                    <p>Try refreshing the page.</p>
                </Message>
            );
        default:
            return null;
    }
}