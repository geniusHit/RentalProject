import React, { useState, useEffect } from "react";
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
import { Link, NavLink, useNavigate } from "react-router-dom"
import "../Style/LoginStyle.css";
import Logo from '../assets/Logo.png'
import livingRoom from '../assets/ChatGPT Image Jun 11, 2026, 05_03_13 PM.png'
import { useForm } from "react-hook-form"
import Footer from "../Components/Footer";

const Signup = () => {
    const { watch, register, handleSubmit, formState: {errors} } = useForm()
    const port = import.meta.env.PORT;
    const [IP, setIP] = useState()
    const navigate = useNavigate()

    const submit = async (data) => {
        let expiry = new Date();
        expiry.setDate(expiry.getDate() + 1);

        const addUser = await fetch(`http://localhost:8000/add-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...data, IP: IP, expiry: expiry})
        })

        navigate("/login")
    }

    useEffect(() => {
        getIP()
    }, [])
    const getIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIP(data.ip)
    };

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
                                        {...register("name", {
                                            required: {value: true, message: "Full Name is required"}
                                        })}
                                    />

                                    <div className="error">{errors?.name?.message}</div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email", {
                                            required: {value: true, message: "Email is required"}
                                        })}
                                    />

                                    <div className="error">{errors?.email?.message}</div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        {...register("phone", {
                                            required: {value: true, message: "Phone is required"}
                                        })}
                                    />

                                    <div className="error">{errors?.phone?.message}</div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register("password", {
                                            required: {value: true, message: "Password is required"}
                                        })}
                                    />

                                    <div className="error">{errors?.password?.message}</div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Pincode"
                                        {...register("pincode", {
                                            required: {value: true, message: "Pincode is required"}
                                        })}
                                    />

                                    <div className="error">{errors?.pincode?.message}</div>
                                </div>

                                <div className="input-group">
                                    <textarea
                                        placeholder="Delivery Address"
                                        {...register("address", {
                                            required: {value: true, message: "Delivery address is required"}
                                        })}
                                    />

                                    <div className="error">{errors?.address?.message}</div>
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