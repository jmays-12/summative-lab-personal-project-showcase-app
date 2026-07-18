export function getDiscountedPrice(price, salePercentage) {
    if (!salePercentage) return price;
    return price - price * (salePercentage / 100);
}
