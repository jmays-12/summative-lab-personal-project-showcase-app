//Libraries and utilities
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

//Pages
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import AdminPortalPage from "./pages/AdminPortalPage";
import CartPage from "./pages/CartPage";

//Context
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";

function App() {
    return (
        <ProductsProvider>
            <CartProvider>
                <NavBar />

                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/shop" element={<ShopPage />} />

                    <Route path="/products/:id" element={<ProductPage />} />

                    <Route path="/admin" element={<AdminPortalPage />} />

                    <Route path="/cart" element={<CartPage />} />

                    <Route
                        path="*"
                        element={
                            <>
                                <h1>404 — Page Not Found</h1>

                                <p>
                                    Sorry! Something went wrong, we couldn't
                                    find that page. Press{" "}
                                    <Link to="/">here</Link> to return home.
                                </p>
                            </>
                        }
                    />
                </Routes>
            </CartProvider>
        </ProductsProvider>
    );
}

export default App;
