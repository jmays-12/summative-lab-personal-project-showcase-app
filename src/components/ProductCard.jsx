function ProductCard({ product }) {
    const onSale = product.salePercentage > 0;

    const finalPrice = getDiscountedPrice(
        product.price,
        product.salePercentage,
    );

    return (
        <li className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="product-info">
                <h3>{product.name}</h3>

                <p className="species">{product.species}</p>

                <p>{product.description}</p>

                <div className="price">
                    {onSale ? (
                        <>
                            <span className="original-price">
                                ${product.price.toFixed(2)}
                            </span>

                            <span className="sale-price">
                                ${finalPrice.toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span>${product.price.toFixed(2)}</span>
                    )}
                </div>

                <Link className="product-button" to={`/products/${product.id}`}>
                    View Details
                </Link>
            </div>
        </li>
    );
}
