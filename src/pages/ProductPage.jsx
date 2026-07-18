import React from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../context/ProductsContext";
import { useCartContext } from "../context/CartContext";
import { getDiscountedPrice } from "../utils/pricing";

function ProductPage() {
    const { id } = useParams();
    const { products } = useProductsContext();
    const { addToCart } = useCartContext();

    const product = products.find((p) => String(p.id) === id);

    if (!product) return <p>Product not found.</p>;

    const onSale = product.salePercentage > 0;

    const finalPrice = getDiscountedPrice(
        product.price,
        product.salePercentage,
    );

    function handleAddToCart() {
        addToCart(product);
    }

    return (
        <main className="product-page">
            <img src={product.image} alt={product.name} />

            <h1>{product.name}</h1>

            <p className="species">{product.species}</p>

            <p>{product.description}</p>

            {onSale ? (
                <p>
                    <span className="original-price">
                        ${product.price.toFixed(2)}
                    </span>{" "}
                    <span className="sale-price">${finalPrice.toFixed(2)}</span>{" "}
                    <span className="sale-badge">
                        -{product.salePercentage}% off!
                    </span>
                </p>
            ) : (
                <p>Price: ${product.price.toFixed(2)}</p>
            )}

            <button onClick={handleAddToCart}>Add to Cart</button>
        </main>
    );
}

export default ProductPage;
