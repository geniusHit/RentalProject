import React, { useState } from "react";
import {
    FaArrowRight,
} from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "../Style/VendorLoginStyle.css";
import { Link } from "react-router-dom"
import livingRoom from '../assets/ChatGPT Image Jun 11, 2026, 05_03_13 PM.png'
import Footer from "../Components/Footer";

const VendorLogin = () => {
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:8000"
            : "https://rental-project-backend.vercel.app";
    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const navigate = useNavigate()

    const submit = async (data) => {
        try {
            const loginResponse = await fetch(`${API_URL}/login-admin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const result = await loginResponse.json();

            if (result?.success !== true) {
                setError("password", {
                    message: "Incorrect password"
                })
                throw new Error("Incorrect password")
            }

            navigate("/vendor-dashboard")
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

                            <h2>Login to Admin</h2>
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
                                    Login to Vendor <FaArrowRight />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default VendorLogin;