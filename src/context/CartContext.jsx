import React, { createContext, useContext, useState } from "react";
import { getDiscountedPrice } from "../utils/pricing";

const taxRate = 0.0825;

const CartContext = createContext(null);

function getStoredCart() {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(getStoredCart);

    function updateCart(newCart) {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    function addToCart(product) {
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            updateCart(
                cart.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item,
                ),
            );
        } else {
            updateCart([
                ...cart,
                {
                    ...product,
                    quantity: 1,
                },
            ]);
        }
    }

    function removeFromCart(id) {
        updateCart(cart.filter((item) => item.id !== id));
    }

    function decreaseQuantity(id) {
        const item = cart.find((item) => item.id === id);

        if (item.quantity === 1) {
            removeFromCart(id);
            return;
        }

        updateCart(
            cart.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                      }
                    : item,
            ),
        );
    }

    function increaseQuantity(id) {
        updateCart(
            cart.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item,
            ),
        );
    }

    function setQuantity(id, quantity) {
        const newQuantity = Number(quantity);

        if (!newQuantity || newQuantity < 1) {
            removeFromCart(id);
            return;
        }

        updateCart(
            cart.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: newQuantity,
                      }
                    : item,
            ),
        );
    }

    function clearCart() {
        updateCart([]);
    }

    function getCartItemPrice(item) {
        return getDiscountedPrice(item.price, item.salePercentage);
    }

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce(
        (sum, item) => sum + getCartItemPrice(item) * item.quantity,
        0,
    );

    const tax = subtotal * taxRate;
    const shipping = subtotal >= 75 ? 0 : 7.99;
    const total = subtotal + tax + shipping;

    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                setQuantity,
                clearCart,
                getCartItemPrice,
                subtotal,
                tax,
                shipping,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCartContext must be used inside a CartProvider");
    }

    return context;
}
