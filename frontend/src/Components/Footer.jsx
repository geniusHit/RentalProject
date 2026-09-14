'use client';
import React from 'react'
import Logo from '../assets/Logo.png'
import { NavLink, Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
import '../Style/FooterStyle.css'

const Footer = () => {
    return (
        <div>
            <footer className="footer">

                <div className="footer-logo">
                    <img src={Logo} width="200" />
                </div>

                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <a href="/">Home</a>
                    <a href="/">Catalog</a>
                    <NavLink to="/how-it-works">How It Works</NavLink>
                    <a href="/">Pricing</a>
                    <a href="/">Contact</a>
                </div>

                <div className="footer-column">
                    <h3>Customer Support</h3>
                    <a href="/">FAQs</a>
                    <a href="/">Delivery & Returns</a>
                    <a href="/">Terms & Conditions</a>
                    <a href="/">Privacy Policy</a>
                </div>

                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <p>+91 98765 43210</p>
                    <p>hello@furnirent.com</p>
                    <p>Bengaluru, Karnataka, India</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer