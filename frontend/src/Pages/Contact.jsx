'use client';
import React, { useState } from 'react'
import '../Style/Contact.css'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaComments,
    FaPaperPlane,
    FaBuilding,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa";

const Contact = () => {
    const faqs = [
        {
            question: "How can I rent furniture from FurniRent?",
            answer:
                "Browse our catalog, choose a product, select your rental duration and place your order."
        },
        {
            question: "What is the minimum rental duration?",
            answer:
                "The minimum rental period is one month."
        },
        {
            question: "Do you provide delivery and installation?",
            answer:
                "Yes. We deliver and install every product at your location."
        },
        {
            question: "How do I return rented furniture?",
            answer:
                "Simply schedule a pickup from your account dashboard."
        },
        {
            question: "What if the furniture gets damaged?",
            answer:
                "Minor wear is acceptable. Significant damage may incur repair charges."
        }
    ];

    const [active, setActive] = useState(null);

    return (
        <div>
            <NavBar />

            <div className="contact-page">

                {/* Hero */}

                <section className="contact-hero">

                    <div className="hero-content">

                        <p className="breadcrumb">
                            Home &gt; Contact
                        </p>

                        <h1>Contact Us</h1>

                        <p>
                            We're here to help! Reach out to us for any
                            queries, support or assistance.
                        </p>

                    </div>

                    <div className="hero-image">

                        <img
                            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
                            alt=""
                        />

                    </div>

                </section>

                {/* Contact Cards */}

                <section className="contact-info">

                    <h2>Get in Touch</h2>

                    <p>
                        Choose the best way to contact us.
                    </p>

                    <div className="info-grid">

                        <div className="info-card">

                            <div className="icon">
                                <FaPhoneAlt />
                            </div>

                            <h3>Call Us</h3>

                            <p>+91 98765 43210</p>

                            <span>Mon - Sat : 9 AM - 8 PM</span>

                        </div>

                        <div className="info-card">

                            <div className="icon">
                                <FaEnvelope />
                            </div>

                            <h3>Email Us</h3>

                            <p>hello@furnirent.com</p>

                            <span>Reply within 24 hours</span>

                        </div>

                        <div className="info-card">

                            <div className="icon">
                                <FaMapMarkerAlt />
                            </div>

                            <h3>Visit Us</h3>

                            <p>Bengaluru, Karnataka</p>

                            <span>Mon - Sat : 10 AM - 7 PM</span>

                        </div>

                        {/* <div className="info-card">

                            <div className="icon">
                                <FaComments />
                            </div>

                            <h3>Live Chat</h3>

                            <p>Talk to our support team</p>

                            <span className="green">
                                Start Chat →
                            </span>

                        </div> */}

                    </div>

                </section>

                {/* Form */}

                <section className="contact-wrapper">
                    <div className="contact-form">
                        <h2>Send Us a Message</h2>

                        <p> Fill the form below and we'll get back to you. </p>

                        <div className="row">
                            <input placeholder="Full Name" />

                            <input placeholder="Email Address" />

                            <input placeholder="Phone Number"/>

                            <input placeholder="Subject" />

                            <textarea rows="6" placeholder="Your Message"></textarea>

                            <button> Send Message <FaPaperPlane /> </button>
                        </div>
                    </div>

                    <div className="location">
                        <h2>Our Location</h2>

                        <iframe
                            title="map"
                            src="https://maps.google.com/maps?q=Bengaluru&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        ></iframe>

                        <div className="office">

                            <FaBuilding />

                            <div>

                                <h4>FurniRent Head Office</h4>

                                <p>
                                    123, Koramangala, Bengaluru,
                                    Karnataka, India
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* FAQ */}

                <section className="faq">

                    <h2>Frequently Asked Questions</h2>

                    {faqs.map((item, index) => (

                        <div
                            key={index}
                            className="faq-item"
                        >

                            <div
                                className="faq-question"
                                onClick={() =>
                                    setActive(
                                        active === index
                                            ? null
                                            : index
                                    )
                                }
                            >

                                {item.question}

                                {active === index
                                    ? <FaChevronUp />
                                    : <FaChevronDown />}

                            </div>

                            {active === index && (

                                <div className="faq-answer">

                                    {item.answer}

                                </div>

                            )}

                        </div>

                    ))}

                </section>

            </div>

            <Footer />
        </div>
    )
}

export default Contact