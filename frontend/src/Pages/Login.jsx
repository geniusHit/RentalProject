import React, { useState } from "react";
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
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "../Style/LoginStyle.css";
import Logo from '../assets/Logo.png'
import livingRoom from '../assets/ChatGPT Image Jun 11, 2026, 05_03_13 PM.png'
import { toggleLogin } from "../globalStates";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Components/Footer";

const Login = () => {
    const { register, handleSubmit } = useForm()
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()

    const globalStates = useSelector((state) => state.global.value);
    const dispatch = useDispatch();

    const submit = async (data) => {
        console.log("data = ", data)

        const login = await fetch("http://localhost:5000/login-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const result = await login.json()
        console.log("result = ", result)
        result.length > 0 && (setIsLogin(true), localStorage.setItem("isLogin", true), localStorage.setItem("name", result[0].name), localStorage.setItem("email", result[0].email), localStorage.setItem("password", result.password), navigate("/"))
        // localStorage.setItem("isLogin", isLogin)
        // dispatch(toggleLogin())
    }

    console.log("isLogin = ", isLogin)
    console.log("globalStates isLogin = ", globalStates)
    console.log("localStorage.getItem(isLogin) = ", localStorage.getItem("isLogin"))
    console.log("localStorage.getItem(name) = ", localStorage.getItem("name"))

    // localStorage.removeItem("isLogin")

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
                                    Log in to your account and continue your journey to a better
                                    living.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="login-box">
                        <div className="login-card">

                            <h2>Login to Your Account</h2>
                            <p className="subtitle">
                                Welcome back! Please enter your details.
                            </p>

                            <form onSubmit={handleSubmit(submit)}>

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
                                    Login <FaArrowRight />
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
                                    Don't have an account? <a href="/signup">Sign Up</a>
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

export default Login;