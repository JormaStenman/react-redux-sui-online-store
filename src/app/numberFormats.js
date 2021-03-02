export const currency = new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
});
const numberFormats = {
    currency,
};
export default numberFormats;