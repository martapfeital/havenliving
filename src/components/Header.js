import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); 
    };

    return (
        <header>
            <div className="header">
                <NavLink to='/'>
                    <button className="logo-button">
                        <div className="logo"></div>
                    </button>
                </NavLink>

                <nav className={`navigation ${isMenuOpen ? "active" : ""}`} id="nav-menu">
                    <NavLink to='/buy' className="nav-link">
                        Buy
                    </NavLink>
                    <NavLink to='/favourite' className="nav-link">
                        Favourites
                    </NavLink>
                    <NavLink to='/sell' className="nav-link">
                        <button className="sell-button">Sell</button>
                    </NavLink>
                </nav>

                <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu}>
                    ☰
                </div>
            </div>
        </header>
    );
}
