import products from '../data/products.json';
import {random} from 'lodash/number'

const delay = 5000;
const errorProb = 0.15;

function getError() {
    if (random(1, true) <= errorProb) {
        return `A fake API error occurred. Error probability
        ${(errorProb * 100).toFixed()}% is adjustable in client.js.`;
    }
    return null;
}

export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                    const error = getError();
                    if (error) {
                        reject(new Error(error))
                    } else {
                        resolve({products});
                    }
                },
                random(delay)
            );
        }
    );
}

export const getProductById = productId => {
    return {product: products.find(product => product.id === productId)};
}

const client = {
    getAllProducts,
    getProductById,
};

export default client;