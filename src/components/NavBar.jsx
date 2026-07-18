import React from "react";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

function NavBar() {
    const { cartCount } = useCartContext();

    return (
        <nav className="navbar">
            <div className="navbar-main">
                <NavLink to="/">Home</NavLink>

                <NavLink to="/shop">Shop</NavLink>

                <NavLink to="/cart">Cart ({cartCount})</NavLink>
            </div>

            <div className="navbar-admin">
                <NavLink to="/admin">Admin Portal</NavLink>
            </div>
        </nav>
    );
}

export default NavBar;
