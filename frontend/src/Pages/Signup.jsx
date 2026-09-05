'use client';
import React from "react";
import {
    FaGoogle,
    FaApple,
    FaEnvelope,
    FaLock,
    FaArrowRight,
    FaTruck,
    FaHeadset,
    FaShieldAlt,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom"
import "../Style/LoginStyle.css";
import Logo from '../assets/Logo.png'
import livingRoom from '../assets/ChatGPT Image Jun 11, 2026, 05_03_13 PM.png'
import { useForm } from "react-hook-form"
import Footer from "../Components/Footer";

const Signup = () => {
    const { watch, register, handleSubmit } = useForm()
    const port = import.meta.env.PORT;
    const submit = async (data) => {
        const addUser = await fetch(`http://localhost:8000/add-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    return (
        <>
            <div className="login-page">
                <div className="login-container" style={{ backgroundImage: `url(${livingRoom})` }}>

                    <div
                        className="login-left"
                    >
                        <div className="overlay-content">
                            <Link to="/">
                                <div className="logo">
                                    <img src={Logo} width="200" />
                                </div>
                            </Link>

                            <div className="welcome-text">
                                <h2>Welcome Back!</h2>
                                <p>
                                    Signup in to your account and continue your journey to a better
                                    living.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="login-box">
                        <div className="login-card">

                            <h2>Signup to Your Account</h2>
                            <p className="subtitle">
                                Welcome back! Please enter your details.
                            </p>

                            <form onSubmit={handleSubmit(submit)}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        {...register("name")}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email")}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        {...register("phone")}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register("password")}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        {...register("city")}
                                    />
                                </div>

                                <div className="input-group">
                                    <textarea
                                        placeholder="Delivery Address"
                                        {...register("address")}
                                    />
                                </div>

                                <button className="login-btn">
                                    Signup <FaArrowRight />
                                </button>

                                <p className="signup-text">
                                    Already have an account? <Link to="/login">Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="features">

                    <div className="feature">
                        <FaShieldAlt />
                        <div>
                            <h4>Secure & Safe</h4>
                            <p>Your data is protected with top-notch security.</p>
                        </div>
                    </div>

                    <div className="feature">
                        <FaTruck />
                        <div>
                            <h4>Hassle-Free Rentals</h4>
                            <p>Quick and easy furniture rentals at your fingertips.</p>
                        </div>
                    </div>

                    <div className="feature">
                        <FaHeadset />
                        <div>
                            <h4>24/7 Support</h4>
                            <p>We're here to help you anytime.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <div className="copyright">
                © 2024 FurniRent. All rights reserved.
            </div>
        </>
    );
};

export default Signup;