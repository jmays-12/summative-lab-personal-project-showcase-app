import { Link } from "react-router-dom";
import { getDiscountedPrice } from "../utils/pricing";
import { useCartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCartContext();

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
                <h3 className="product-title">{product.name}</h3>

                <p className="product-species">{product.species}</p>

                <p className="product-card-description">
                    {product.shortDescription}
                </p>

                <div className="product-footer">
                    <div className="product-price">
                        {onSale ? (
                            <>
                                <span className="original-price">
                                    ${product.price.toFixed(2)}
                                </span>

                                <span className="sale-price">
                                    ${finalPrice.toFixed(2)} each
                                </span>
                            </>
                        ) : (
                            <span>${product.price.toFixed(2)} each</span>
                        )}
                    </div>
                </div>

                <button
                    className="cart-button"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>

                <Link className="product-button" to={`/products/${product.id}`}>
                    View Details
                </Link>
            </div>
        </li>
    );
}
