export function productImageSrc(productId) {
    return `${process.env.PUBLIC_URL}/product_pics/${productId}.jpeg`;
}

const utils = {
    imageSrc: productImageSrc,
};

export default utils;