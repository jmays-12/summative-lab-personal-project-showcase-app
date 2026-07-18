import React, { useState } from "react";
import { useCartContext } from "../context/CartContext";

function CartPage() {
    const {
        cart,
        removeFromCart,
        setQuantity,
        getCartItemPrice,
        subtotal,
        tax,
        shipping,
        total,
    } = useCartContext();

    const [removingId, setRemovingId] = useState(null);

    function handleRemove(id) {
        setRemovingId(id);

        setTimeout(() => {
            removeFromCart(id);
            setRemovingId(null);
        }, 300);
    }

    return (
        <main className="cart-page">
            <h1>Your Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cart.map((item) => {
                            const finalPrice = getCartItemPrice(item);

                            return (
                                <li
                                    key={item.id}
                                    className={`cart-item ${
                                        removingId === item.id ? "removing" : ""
                                    }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width="150"
                                    />

                                    <div className="cart-item-info">
                                        <h2>{item.name}</h2>

                                        {item.salePercentage > 0 ? (
                                            <p>
                                                <span className="original-price">
                                                    ${item.price.toFixed(2)}
                                                </span>{" "}
                                                <span className="sale-price">
                                                    ${finalPrice.toFixed(2)}
                                                </span>
                                            </p>
                                        ) : (
                                            <p>${finalPrice.toFixed(2)}</p>
                                        )}

                                        <div className="quantity-controls">
                                            <button
                                                onClick={() =>
                                                    setQuantity(
                                                        item.id,
                                                        item.quantity - 1,
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    setQuantity(
                                                        item.id,
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <button
                                                onClick={() =>
                                                    setQuantity(
                                                        item.id,
                                                        item.quantity + 1,
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p>
                                            Subtotal: $
                                            {(
                                                finalPrice * item.quantity
                                            ).toFixed(2)}
                                        </p>

                                        {removingId === item.id ? (
                                            <p>Removing...</p>
                                        ) : (
                                            <button
                                                className="remove-button"
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>

                            <span>Tax:</span>
                            <span>${tax.toFixed(2)}</span>

                            <span>Shipping:</span>
                            <span>${shipping.toFixed(2)}</span>

                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="checkout-button">Checkout</button>
                </>
            )}
        </main>
    );
}

export default CartPage;
