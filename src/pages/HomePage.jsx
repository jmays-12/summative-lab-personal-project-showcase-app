import React from "react";

import { Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            <section className="hero">
                <h1 className="heroTitle">The Saltwater Source</h1>

                <p>
                    Captive raised favorites, rare reef species, and everything
                    you need for your next saltwater setup.
                </p>

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
