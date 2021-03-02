import products from '../data/products.json';
import {random} from 'lodash'

const delay = 5000;
const errorProb = 0.15;

function getError() {
    if (random(1, true) <= errorProb) {
        return `A fake API error occurred. Error probability
        ${(errorProb * 100).toFixed()}% is adjustable in client.js.`;
    }
    return null;
}

const getAllProducts = () => {
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

const client = {
    getAllProducts,
};

export default client;