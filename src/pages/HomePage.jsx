import React from "react";
import { Link } from "react-router-dom";

import { useProductsContext } from "../context/ProductsContext";

function HomePage() {
    const { products } = useProductsContext();
    return (
        <>
            <section className="hero">
                <h1 className="heroTitle">The Saltwater Source</h1>

                <p>
                    Captive raised favorites, rare reef species, and everything
                    you need for your next saltwater setup.
                </p>

                <div className="featured-species">
                    {products.slice(0, 3).map((product) => (
                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            className="featured-species-item"
                        >
                            <div className="featured-species-img-wrap">
                                <img src={product.image} alt={product.name} />
                            </div>
                        </Link>
                    ))}
                </div>
                <Link to="/shop">Browse Fish</Link>
            </section>

            <section className="about">
                <h2>Healthy Fish and Expert Care.</h2>

                <p>Every species selected with reef keepers in mind.</p>
            </section>
        </>
    );
}

export default HomePage;
