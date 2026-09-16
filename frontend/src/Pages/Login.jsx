import React, { useState } from "react";
import {
    FaTruck,
    FaHeadset,
    FaShieldAlt,
    FaArrowRight,
} from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "../Style/LoginStyle.css";
import { Link } from "react-router-dom"
import livingRoom from '../assets/ChatGPT Image Jun 11, 2026, 05_03_13 PM.png'
import Footer from "../Components/Footer";
import { useEffect } from "react";

const Login = () => {
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:8000"
            : "https://rental-project-backend.vercel.app";
    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const [IP, setIP] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getIP()
    }, [])
    const getIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIP(data.ip)
    };

    const submit = async (data) => {
        let expiry = new Date();
        expiry.setDate(expiry.getDate() + 1);

        try {
            const loginResponse = await fetch(`${API_URL}/login-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data, IP: IP, expiry: expiry })
            })

            const result = await loginResponse.json();

            if (result?.success !== true) {
                setError("password", {
                    message: "Incorrect password"
                })
                throw new Error("Incorrect password")
            }

            navigate("/")
        }
        catch (err) {
            console.log(err)
            setError("password", {
                message: "Incorrect password"
            })
        }
    }

    return (
        <>
            <div className="login-page">
                <div className="login-container" style={{ backgroundImage: `url(${livingRoom})` }}>
                    <div
                        className="login-left"
                    >
                        <div className="overlay-content">
                            <Link to="/" className="logo-link">
                                <div className="login-logo">
                                    {/* <img src={Logo} width="200" /> */}
                                    RentHive
                                </div>
                            </Link><br />

                            <div className="welcome-text">
                                <h2>Welcome Back!</h2>
                                <p>
                                    Log in to your account and continue your journey to a better
                                    living.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="login-box">
                        <div className="login-card">

                            <h2>Login to Your Account</h2>
                            <p className="subtitle">
                                Welcome back! Please enter your details.
                            </p>

                            <form onSubmit={handleSubmit(submit)}>

                                <div className="input-group">
                                    <div className="input-box">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...register("email", {
                                                required: { value: true, message: "Email is required" },
                                            })}
                                        />
                                        <div className="error">{errors?.email?.message}</div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <div className="input-box">
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...register("password", {
                                                required: { value: true, message: "Password is required" },
                                            })}
                                        />

                                        <div className="error">{errors?.password?.message}</div>
                                    </div>
                                </div>

                                <button className="login-btn" type="submit">
                                    Login <FaArrowRight />
                                </button>

                                <p className="signup-text">
                                    Don't have an account? <Link to="/signup">Sign Up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="features-2">

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
        </>
    );
};

export default Login;