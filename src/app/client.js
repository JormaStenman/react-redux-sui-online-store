import initialProducts from '../data/products.json';
import {random} from 'lodash/number'
import {v4 as uuid} from 'uuid';

export const getProductById = id => {
    return promiseToReturn({
        resultFunc: () => {
            const products = loadProducts();
            if (id in products) {
                return {
                    product: products[id],
                }
            }
            throw new Error(`no product found matching id ${id}`);
        }
    });
};

export const getProductsByIds = ids => {
    return promiseToReturn({
        resultFunc: () => {
            const idSet = new Set(ids);
            const products = loadProducts();
            const requestedProducts = idSet.keys().reduce((ary, productId) => {
                if (products[productId]) {
                    ary.push(products[productId]);
                }
                return ary;
            }, []);
            return {
                products: requestedProducts,
            };
        },
    });
};

export const getAllProducts = () => {
    return promiseToReturn({
        resultFunc: () => ({
            products: Object.values(loadProducts())
        }),
    });
};

export const updateProduct = update => {
    return promiseToReturn({
        resultFunc: () => {
            const products = loadProducts();
            if (update.id in products) {
                products[update.id] = {
                    ...products[update.id],
                    ...update,
                };
                storeProducts(products);
                return {
                    updated: products[update.id],
                };
            }
            throw new Error(`No product found with id ${update.id}.`);
        },
    });
};

export const getAllOrders = () => {
    return promiseToReturn({
        resultFunc: () => ({
            orders: Object.values(loadOrders())
        }),
    });
};

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
};

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
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createOrder,
    deleteOrder,
    getAllOrders,
    getAllProducts,
    getProductById,
    getProductsByIds,
    updateProduct,
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

// noinspection SpellCheckingInspection
const productsKey = 'me.stenman.products';

function loadProducts() {
    const item = window.localStorage.getItem(productsKey);
    return item ? JSON.parse(item) :
        initialProducts.reduce((productsById, product) => {
            productsById[product.id] = product;
            return productsById;
        }, {});
}

function storeProducts(products) {
    window.localStorage.setItem(productsKey, JSON.stringify(products));
}


// (() => {
//     console.log('clearing orders from localStorage');
//     window.localStorage.removeItem(ordersKey);
//     console.log('clearing products from localStorage');
//     window.localStorage.removeItem(productsKey);
// })();