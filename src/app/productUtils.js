export function productImageSrc(productId) {
    return `/product_pics/${productId}.jpeg`;
}

const utils = {
    imageSrc: productImageSrc,
};

export default utils;