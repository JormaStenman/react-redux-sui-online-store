import {Card, Image} from "semantic-ui-react";
import {useRouteMatch} from "react-router-dom";
import {productImageSrc} from "../../app/productUtils";
import {currency} from "../../app/numberFormats";

export default function ProductDetails({products}) {
    const match = useRouteMatch();
    const product = products.find(prod => prod.id === parseInt(match.params.productId));

    if (!product) {
        return null;
    }
    return (
        <Card centered fluid>
            <Image size='small' inline src={productImageSrc(product.id)}/>
            <Card.Content>
                <Card.Header>{product.name}</Card.Header>
                <Card.Meta>
                    <span className='price'>{currency.format(product.price || 0)}</span>
                </Card.Meta>
                <Card.Description>
                    {product.details}
                </Card.Description>
            </Card.Content>
        </Card>
    );
}