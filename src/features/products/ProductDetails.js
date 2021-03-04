import {Card, Image, Message} from "semantic-ui-react";
import {useRouteMatch} from "react-router-dom";
import {productImageSrc} from "../../app/productUtils";
import {currency} from "../../app/numberFormats";
import {useSelector} from "react-redux";
import {LoadingStatus, productSelectors, selectProductsSlice} from "./productsSlice";

export default function ProductDetails() {
    const match = useRouteMatch();
    const productId = match.params.productId;
    const product = useSelector(state => productSelectors.selectById(state, parseInt(productId)));
    const loadingStatus = useSelector(state => selectProductsSlice(state).status);

    if (product) {
        return (
            <Card centered fluid>
                <Image size='small' inline src={productImageSrc(product.id)}/>
                <Card.Content>
                    <Card.Header>
                        {product.name}
                    </Card.Header>
                    <Card.Meta>
                        <span className='price'>{currency.format(product.price || 0)}</span>
                    </Card.Meta>
                    <Card.Description>
                        {product.details}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    } else {
        if (loadingStatus === LoadingStatus.success) {
            return (
                <Message error>
                    No product found with id {productId}.
                </Message>
            );
        }
        return null;
    }

}