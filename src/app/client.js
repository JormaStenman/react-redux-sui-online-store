import products from '../data/products.json';
import {random} from 'lodash/number'
import {v4 as uuid} from 'uuid';

export const getProductsByIds = ids => {
    const idSet = new Set(ids);
    return promiseToReturn({
        resultFunc: () => ({
            products: products.filter(product => idSet.has(product.id))
        }),
    });
}

export const getOrderById = id => {
    return promiseToReturn({
        resultFunc: () => ({
            order: loadOrders()[id],
        }),
    });
}

export const getAllProducts = () => {
    return promiseToReturn({
        resultFunc: () => ({
            products
        })
    });
}

export const getProductById = productId => {
    return promiseToReturn({
        resultFunc: () => {
            const product = products.find(product => product.id === productId);
            if (!product) {
                throw new Error(`No product found matching id ${productId}.`);
            }
            return {
                product
            };
        }
    });
}

export const getAllOrders = () => {
    return promiseToReturn({
        resultFunc: () => ({
            orders: Object.values(loadOrders())
        })
    });
}

export const createOrder = newOrder => {
    return promiseToReturn({
        resultFunc: () => {
            const id = uuid();
            const order = {
                ...newOrder,
                id,
                date: new Date().toISOString().substr(0, 10),
                createdAt: Date.now(),
            };
            const orders = loadOrders();
            orders[id] = order;
            storeOrders(orders);
            return {
                order,
            }
        },
    });
}

export const deleteOrder = orderId => {
    return promiseToReturn({
        resultFunc: () => {
            const orders = loadOrders();
            delete orders[orderId]
            storeOrders(orders);
            return {
                deleted: orderId,
            }
        },
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createOrder,
    deleteOrder,
    getAllOrders,
    getAllProducts,
    getOrderById,
    getProductById,
    getProductsByIds,
};

function getError(errorProb) {
    if (random(1, true) <= errorProb) {
        return `A fake API error occurred. Error probability
        ${(errorProb * 100).toFixed()}% is adjustable in client.js.`;
    }
    return null;
}

function promiseToReturn({resultFunc = () => undefined, maxDelay = 5000, errorProb = 0.0}) {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                    const error = getError(errorProb);
                    if (error) {
                        reject(new Error(error))
                    } else {
                        let result;
                        try {
                            result = resultFunc();
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

// noinspection SpellCheckingInspection
const ordersKey = 'me.stenman.orders';

function loadOrders() {
    return JSON.parse(window.localStorage.getItem(ordersKey) || '{}');
}

function storeOrders(orders) {
    window.localStorage.setItem(ordersKey, JSON.stringify(orders));
}

// (() => {
//     console.log('clearing orders from localStorage');
//     window.localStorage.removeItem(ordersKey);
// })();