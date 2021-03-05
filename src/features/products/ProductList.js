import {Item} from "semantic-ui-react";
import {currency} from "../../app/numberFormats";
import {truncate} from "lodash/string";
import {Link} from "react-router-dom";
import {productImageSrc} from "../../app/productUtils";
import {useSelector} from "react-redux";
import {productSelectors} from "./productsSlice";

export default function ProductList() {

    const products = useSelector(state => productSelectors.selectAll(state));

    function itemLoc(currentLoc, productId) {
        return {
            ...currentLoc,
            pathname: `${currentLoc.pathname}/${productId}`,
        };
    }

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
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    );
}