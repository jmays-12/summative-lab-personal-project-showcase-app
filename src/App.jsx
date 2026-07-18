import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import AdminPortalPage from "./pages/AdminPortalPage";
import { ProductsProvider } from "./context/ProductsContext";

function App() {
    return (
        <ProductsProvider>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/admin" element={<AdminPortalPage />} />
                <Route
                    path="*"
                    element={
                        <>
                            <h1>404 — Page Not Found</h1>
                            <p>
                                Sorry! Something went wrong, we couldn't find
                                that page. Press <Link to="/">here</Link> to
                                return to the home page.
                            </p>
                        </>
                    }
                />
            </Routes>
        </ProductsProvider>
    );
}

export default App;
