import {Button, Item, Message} from "semantic-ui-react";
import {currency} from "../../app/numberFormats";
import {truncate} from "lodash/string";
import {Link} from "react-router-dom";
import {productImageSrc} from "../../app/productUtils";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, productSelectors, selectProductsSlice} from "./productsSlice";
import {useEffect} from "react";
import LoadingStatus from "../../app/LoadingStatus";
import Loading from "../loading/Loading";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const dispatch = useDispatch();
    const products = useSelector(state => productSelectors.selectAll(state));
    const loadingStatus = useSelector(state => selectProductsSlice(state).status);
    const loadingError = useSelector(state => selectProductsSlice(state).error);

    useEffect(() => {
        if ((!products || !products.length) && loadingStatus === LoadingStatus.idle) {
            dispatch(fetchProducts());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    function itemLoc(currentLoc, productId) {
        return {
            ...currentLoc,
            pathname: `${currentLoc.pathname}/${productId}`,
        };
    }

    switch (loadingStatus) {
        case LoadingStatus.success:
        case LoadingStatus.idle:
            return (
                <Item.Group divided>
                    {products.map(product => (
                        <Item key={product.id} as={Link} to={loc => itemLoc(loc, product.id)}>
                            <Item.Image size='tiny' src={productImageSrc(product.id)}/>
                            <Item.Content>
                                <Item.Header>{product.name}</Item.Header>
                                <Item.Meta>
                                    <span className='price'>{currency.format(product.price || 0)}</span>
                                </Item.Meta>
                                <Item.Description>
                                    {truncate(product.details, {length: 200})}
                                </Item.Description>
                                <Item.Extra>
                                    <Button>Select</Button>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            );
        case LoadingStatus.loading:
            return <Loading what='products'/>
        case LoadingStatus.failed:
            return (
                <Message error>
                    <p>Error loading products: {loadingError}</p>
                    <p>Try refreshing the page.</p>
                </Message>
            );
        default:
            return null;
    }
}