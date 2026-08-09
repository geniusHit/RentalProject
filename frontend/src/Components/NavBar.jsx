import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
import Logo from '../assets/Logo.png'

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/"><img src={Logo} className="" width="200px" /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarText">
                        <span>
                            <ul></ul>
                        </span>

                        <span>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link active">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/catalog">Catalog</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/how-it-works">How It Works</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                </li>
                            </ul>
                        </span>

                        <NavDropdown title={<FaRegUser />}>
                            <NavDropdown.Item as={Link} to="">
                                My Profile
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to="/my-rental-items">
                                My Orders
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to="/login">
                                Login
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item as={Link} to="/vendor-dashboard">
                                Vendor Dashboard
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to="">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
