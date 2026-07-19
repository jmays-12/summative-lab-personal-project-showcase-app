import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/ProductsContext";
import { useCartContext } from "../context/CartContext";
import { getDiscountedPrice } from "../utils/pricing";

function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, isLoading } = useProductsContext();
    const { addToCart } = useCartContext();

    const product = products.find((p) => String(p.id) === id);

    if (isLoading) return <div className="loading">Loading...</div>;

    if (!product)
        return (
            <div className="loading">
                Product not found.{" "}
                <button onClick={() => navigate("/shop")}>Back to shop</button>
            </div>
        );

    const onSale = product.salePercentage > 0;
    const finalPrice = getDiscountedPrice(
        product.price,
        product.salePercentage,
    );

    return (
        <main className="product-page">
            <div className="product-page-card">
                <div className="product-page-image-container">
                    <img
                        className="product-page-image"
                        src={product.image}
                        alt={product.name}
                    />
                </div>

                <div className="product-page-info">
                    <h1 className="product-page-title">{product.name}</h1>

                    <p className="product-page-species">{product.species}</p>

                    <p className="product-page-description">
                        {product.extendedDescription}
                    </p>

                    <div className="product-page-footer">
                        <div className="product-page-price">
                            {onSale ? (
                                <>
                                    <span className="original-price">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className="sale-price">
                                        ${finalPrice.toFixed(2)} each
                                    </span>
                                    <span className="sale-badge">
                                        {product.salePercentage}% off!
                                    </span>
                                </>
                            ) : (
                                <span>${product.price.toFixed(2)} each</span>
                            )}
                        </div>

                        <button
                            className="cart-button"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductPage;
