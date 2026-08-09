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
        console.log("data = ", data)

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

                {/* Hero Section */}
                <div className="login-container" style={{ backgroundImage: `url(${livingRoom})` }}>

                    {/* Left Side */}
                    <div
                        className="login-left"
                    >
                        <div className="overlay-content">
                            <div className="logo">
                                {/* <h1>
                Furni<span>Rent</span>
              </h1>
              <p>Live Better. Rent Smarter.</p> */}
                                <img src={Logo} width="200" />
                            </div>

                            <div className="welcome-text">
                                <h2>Welcome Back!</h2>
                                <p>
                                    Signup in to your account and continue your journey to a better
                                    living.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="login-box">
                        <div className="login-card">

                            <h2>Signup to Your Account</h2>
                            <p className="subtitle">
                                Welcome back! Please enter your details.
                            </p>

                            <form onSubmit={handleSubmit(submit)}>
                                <div className="input-group">
                                    <label>Full Name</label>
                                    <div className="input-box">
                                        <i className="fa fa-user"></i>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            {...register("name")}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label>Email Address</label>
                                    <div className="input-box">
                                        <FaEnvelope />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...register("email")}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label>Phone Number</label>
                                    <div className="input-box">
                                        <i className="fa fa-phone"></i>
                                        <input
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            {...register("phone")}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label>Password</label>
                                    <div className="input-box">
                                        <FaLock />
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...register("password")}
                                        />
                                    </div>
                                </div>

                                <div className="login-options">
                                    <label>
                                        <input type="checkbox" />
                                        Remember me
                                    </label>

                                    <a href="/">Forgot Password?</a>
                                </div>

                                <button className="login-btn">
                                    Signup <FaArrowRight />
                                </button>

                                <div className="divider">
                                    <span>OR</span>
                                </div>

                                <button type="button" className="social-btn">
                                    <FaGoogle />
                                    Continue with Google
                                </button>

                                <button type="button" className="social-btn">
                                    <FaApple />
                                    Continue with Apple
                                </button>

                                <p className="signup-text">
                                    Don't have an account? <Link to="/signup">Sign Up</Link>
                                </p>

                            </form>

                        </div>
                    </div>
                </div>

                {/* Features */}
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

            {/* Footer */}
            <Footer />
            <div className="copyright">
                © 2024 FurniRent. All rights reserved.
            </div>
        </>
    );
};

export default Signup;