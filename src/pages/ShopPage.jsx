import React from "react";
import { useProductsContext } from "../context/ProductsContext";
import useSearch from "../hooks/useSearch";
import ProductCard from "../components/ProductCard";

function ShopPage() {
    const { products, isLoading } = useProductsContext();
    const { searchTerm, setSearchTerm, inputRef, filteredItems } = useSearch(
        products,
        ["name"],
    );

    if (isLoading) return <p>Loading products...</p>;

    return (
        <main className="shop-page">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search fish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="product-grid">
                {filteredItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </main>
    );
}

export default ShopPage;
