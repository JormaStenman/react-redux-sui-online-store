import products from '../data/products.json';
import {random} from 'lodash/number'

const errorProb = 0.00;

const ordersById = {};

function getError() {
    if (random(1, true) <= errorProb) {
        return `A fake API error occurred. Error probability
        ${(errorProb * 100).toFixed()}% is adjustable in client.js.`;
    }
    return null;
}

function promiseToReturn(makeResult, maxDelay) {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                    const error = getError();
                    if (error) {
                        reject(new Error(error))
                    } else {
                        let result;
                        try {
                            result = makeResult();
                        } catch (e) {
                            reject(e);
                        }
                        resolve(result);
                    }
                },
                random(maxDelay)
            );
        }
    );
}

export const getAllProducts = () => {
    return promiseToReturn(() => ({products}), 0);
}

export const getProductById = productId => {
    return promiseToReturn(() => {
        const product = products.find(product => product.id === productId);
        if (!product) {
            throw new Error(`No product found matching id ${productId}.`);
        }
        return {product};
    }, 0);
}

export const getAllOrders = () => {
    return promiseToReturn(() => ({orders: Object.values(ordersById)}), 0);
}


const client = {
    getAllProducts,
    getProductById,
    getAllOrders,
};

export default client;