import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, LoadingStatus, productSelectors, selectProductsSlice} from "./productsSlice";
import {useEffect} from "react";
import ProductsLoadError from "./ProductsLoadError";
import ProductsLoading from "./ProductsLoading";

export default function WithProducts({render}) {
    const loadingStatus = useSelector(state => selectProductsSlice(state).status);
    const dispatch = useDispatch();
    const products = useSelector(state => productSelectors.selectAll(state));

    useEffect(() => {
        if ((!products || !products.length) && loadingStatus === LoadingStatus.idle) {
            dispatch(fetchProducts());
        }
    }, [products, loadingStatus, dispatch]);

    switch (loadingStatus) {
        case LoadingStatus.loading:
            return (
                <ProductsLoading/>
            );
        case LoadingStatus.failed:
            return (
                <ProductsLoadError/>
            );
        default:
            return render(products);
    }
}