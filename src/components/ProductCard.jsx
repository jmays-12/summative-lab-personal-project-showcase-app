import React from "react";
import { Link } from "react-router-dom";
import { getDiscountedPrice } from "../utils/pricing";

function ProductCard({ product }) {
    const onSale = product.salePercentage > 0;
    const finalPrice = getDiscountedPrice(
        product.price,
        product.salePercentage,
    );

    return (
        <li className="product-card" data-testid="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {onSale ? (
                <p>
                    <span className="original-price">
                        ${product.price.toFixed(2)}
                    </span>{" "}
                    <span className="sale-price">${finalPrice.toFixed(2)}</span>{" "}
                    <span className="sale-badge">
                        -{product.salePercentage}%
                    </span>
                </p>
            ) : (
                <p>Price: ${product.price.toFixed(2)}</p>
            )}
            <Link to={`/products/${product.id}`}>View Details</Link>
        </li>
    );
}

export default ProductCard;
