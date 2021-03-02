import products from '../data/products.json';
import {random} from 'lodash'

const delay = 5000;

function getError() {
    const errorProb = 0.15;
    if (random(1, true) <= errorProb) {
        return `error probability ${errorProb} exceeded`;
    }
    return null;
}

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                    const error = getError();
                    if (error) {
                        reject({error})
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