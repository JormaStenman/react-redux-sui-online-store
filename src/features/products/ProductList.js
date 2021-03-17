import {Button, Item, Message} from "semantic-ui-react";
import {currency} from "../../app/numberFormats";
import {truncate} from "lodash/string";
import {Link} from "react-router-dom";
import {productImageSrc} from "../../app/productUtils";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllProducts, productSelectors, selectProductsSlice} from "./productsSlice";
import {useEffect} from "react";
import Loading from "../../app/Loading";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const dispatch = useDispatch();
    const products = useSelector(state => productSelectors.selectAll(state));
    const loading = useSelector(state => selectProductsSlice(state).loading);
    const loadError = useSelector(state => selectProductsSlice(state).error);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    function itemLoc(currentLoc, productId) {
        return {
            ...currentLoc,
            pathname: `${currentLoc.pathname}/${productId}`,
        };
    }

    if (products && products.length) {
        return (
            <Item.Group divided>
                {products.map(product => (
                    <Item key={product.id} as={Link} to={loc => itemLoc(loc, product.id)}>
                        <Item.Image size='tiny' src={productImageSrc(product.id)} alt={`product-id-${product.id}`}/>
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
    }

    if (loading) {
        return <Loading what='products'/>;
    }

    if (loadError) {
        return <Message error content={loadError}/>
    }

    return null;
}