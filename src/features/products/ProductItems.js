import {Item} from "semantic-ui-react";
import {currency} from "../../app/numberFormats";

export default function ProductItems({products}) {
    return (
        <Item.Group divided>
            {products.map(product => (
                <Item key={product.id}>
                    <Item.Image size='tiny' src={`/product_pics/${product.id}.jpeg`}/>
                    <Item.Content>
                        <Item.Header>{product.name}</Item.Header>
                        <Item.Meta>
                            <span className='price'>{currency.format(product.price || 0)}</span>
                        </Item.Meta>
                        <Item.Description>{product.details}</Item.Description>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    );
}