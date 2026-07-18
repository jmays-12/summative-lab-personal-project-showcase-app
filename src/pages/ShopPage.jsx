import React from "react";
import { useProductsContext } from "../context/ProductsContext";
import useSearch from "../hooks/useSearch";
import ProductCard from "../components/ProductCard";

function ShopPage() {
    const { products, isLoading, error } = useProductsContext();

    const { searchTerm, setSearchTerm, inputRef, filteredItems } = useSearch(
        products,
        ["name"],
    );

    if (isLoading) return <p>Loading products...</p>;

    if (error) return <p>{error}</p>;

    return (
        <main className="shop-page">
            <h1>Shop</h1>

            <div className="search-container">
                <input
                    ref={inputRef}
                    className="search-input"
                    type="text"
                    placeholder="Search fish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-results">
                    {filteredItems.length} of {products.length}
                </span>
            </div>

            {filteredItems.length === 0 ? (
                <p>No fish found matching "{searchTerm}"</p>
            ) : (
                <ul className="product-grid">
                    {filteredItems.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            )}
        </main>
    );
}

export default ShopPage;
