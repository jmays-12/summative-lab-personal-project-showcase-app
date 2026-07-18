import React from "react";

import { Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            <section className="hero">
                <h1>The Saltwater Source</h1>

                <p>Premium saltwater livestock for reef enthusiasts.</p>

                <Link to="/shop">Browse Fish</Link>
            </section>

            <section className="featured">
                <h2>Featured Species</h2>
            </section>

            <section className="about">
                <h2>Healthy Fish. Expert Care.</h2>

                <p>Every species selected with reef keepers in mind.</p>
            </section>
        </>
    );
}

export default HomePage;
