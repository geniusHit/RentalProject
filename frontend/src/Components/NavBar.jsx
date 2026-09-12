import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
import Logo from '../assets/Logo.png';
import "../Style/NavBarStyle.css"

const NavBar = () => {
    const [menuCollapsed, setMenuCollapsed] = useState(true);
    const [IP, setIP] = useState("");

    const logout = async () => {
        try {
            const logoutQuery = await fetch("http://localhost:8000/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ IP: IP })
            });

            if (!logoutQuery.ok) {
                throw new Error("Unable to logout");
            }
        }
        catch (err) {
            console.log("Unable to logout");
        }
    };

    useEffect(() => {
        getIP();
    }, []);

    const getIP = async () => {
        try {
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            setIP(data.ip);
        } catch (err) {
            console.log("Unable to get IP");
        }
    };

    const closeMenu = () => {
        setMenuCollapsed(true);
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">

                {/* Logo */}
                <NavLink
                    className="navbar-brand"
                    to="/"
                    onClick={closeMenu}
                >
                    <img
                        src={Logo}
                        className="navbar-logo"
                        alt="Logo"
                    />
                </NavLink>

                {/* Hamburger */}
                <button
                    className={`navbar-toggler ${menuCollapsed ? 'collapsed' : ''}`}
                    type="button"
                    onClick={() => setMenuCollapsed(prev => !prev)}
                    aria-controls="navbarText"
                    aria-expanded={!menuCollapsed}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu */}
                <div
                    className={`collapse navbar-collapse ${
                        !menuCollapsed ? 'show' : ''
                    }`}
                    id="navbarText"
                >
                    <div></div>

                    <ul className="navbar-nav mb-2 mb-lg-0 text-center">

                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className="nav-link"
                                onClick={closeMenu}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/catalog"
                                onClick={() => {
                                    localStorage.setItem("search", "");
                                    closeMenu();
                                }}
                            >
                                Catalog
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/how-it-works"
                                onClick={closeMenu}
                            >
                                How It Works
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/contact"
                                onClick={closeMenu}
                            >
                                Contact
                            </NavLink>
                        </li>

                    </ul>

                    {/* User Dropdown */}
                    <div className="user-dropdown">
                        <NavDropdown title={<FaRegUser />}>

                            <NavDropdown.Item
                                as={Link}
                                to="/my-rental-items"
                                onClick={closeMenu}
                            >
                                My Orders
                            </NavDropdown.Item>

                            <NavDropdown.Item
                                as={Link}
                                to="/login"
                                onClick={closeMenu}
                            >
                                Login
                            </NavDropdown.Item>

                            <NavDropdown.Item
                                as={Link}
                                to="/vendor-dashboard"
                                onClick={closeMenu}
                            >
                                Vendor Dashboard
                            </NavDropdown.Item>

                            <NavDropdown.Item
                                as={Link}
                                to="/"
                                onClick={() => {
                                    logout();
                                    closeMenu();
                                }}
                            >
                                Logout
                            </NavDropdown.Item>

                        </NavDropdown>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavBar;