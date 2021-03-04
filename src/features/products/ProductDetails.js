import {Card, Image, Message} from "semantic-ui-react";
import {useRouteMatch} from "react-router-dom";
import {productImageSrc} from "../../app/productUtils";
import {currency} from "../../app/numberFormats";
import {useEffect, useState} from "react";
import Loading from "../loading/Loading";
import client from "../../app/client";

export default function ProductDetails() {
    const match = useRouteMatch();
    const [productId] = useState(parseInt(match.params.productId));
    const [product, setProduct] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState('idle');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            return await client.getProductById(productId);
        }

        if (!product && loadingStatus === 'idle') {
            setError(null);
            setLoadingStatus('loading');
            fetchData().then(result => {
                setProduct(result.product);
                setLoadingStatus('idle');
                setError(null);
            }).catch(e => {
                setLoadingStatus('error');
                setError(e.message || 'error loading product');
            });
        }
    }, [product, loadingStatus, productId]);

    function productDetails() {
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
            return null;
        }
    }

    switch (loadingStatus) {
        case 'idle':
            return productDetails();
        case 'loading':
            return <Loading what={`product ${productId}`}/>
        case 'error':
            return <Message error content={error}/>
        default:
            return null;
    }

}