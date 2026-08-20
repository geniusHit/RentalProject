import React from 'react'
import NavBar from '../Components/NavBar';
import "../Style/HowItWorks.css";
import {
    FaSearch,
    FaCalendarAlt,
    FaTruck,
    FaCouch,
    FaTags,
    FaShieldAlt,
    FaHeadset,
    FaExchangeAlt,
    FaShippingFast
} from "react-icons/fa";
import Footer from '../Components/Footer';
const steps = [
    {
        no: 1,
        icon: <FaSearch />,
        title: "Browse & Choose",
        text: "Explore our wide range of furniture and choose your favourites."
    },
    {
        no: 2,
        icon: <FaCalendarAlt />,
        title: "Select Rental Plan",
        text: "Pick a rental duration that suits your needs."
    },
    {
        no: 3,
        icon: <FaTruck />,
        title: "Delivery & Setup",
        text: "We deliver and set up your furniture at your home."
    },
    {
        no: 4,
        icon: <FaCouch />,
        title: "Enjoy & Return",
        text: "Use the furniture and return it once your plan ends."
    }
];

const features = [
    {
        icon: <FaTags />,
        title: "Affordable Pricing"
    },
    {
        icon: <FaShieldAlt />,
        title: "Quality Assurance"
    },
    {
        icon: <FaHeadset />,
        title: "24/7 Support"
    },
    {
        icon: <FaExchangeAlt />,
        title: "Flexible Rental Plans"
    },
    {
        icon: <FaShippingFast />,
        title: "Fast Delivery"
    }
];

const HowItWorks = () => {
    return (
        <div>
            <NavBar />

            <div className="how-container">

                {/* Hero */}

                <section className="hero">

                    <div className="hero-left">

                        <p className="breadcrumb">
                            Home &nbsp; &gt; &nbsp; How It Works
                        </p>

                        <h1>How It Works</h1>

                        <p>
                            Renting furniture has never been easier.
                            Choose your favourite furniture, rent it,
                            and enjoy a hassle-free experience.
                        </p>

                    </div>

                    <div className="hero-right">

                        <img
                            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
                            alt=""
                        />

                    </div>

                </section>

                {/* Steps */}

                <section className="steps-section">

                    <h2>4 Simple Steps to Rent</h2>

                    <p>
                        From browsing to delivery, we make furniture rental
                        simple and convenient.
                    </p>

                    <div className="steps">

                        {steps.map((item) => (

                            <div className="step-card" key={item.no}>

                                <div className="number">
                                    {item.no}
                                </div>

                                <div className="icon">
                                    {item.icon}
                                </div>

                                <h3>{item.title}</h3>

                                <p>{item.text}</p>

                            </div>

                        ))}

                    </div>

                </section>

                {/* Features */}

                <section className="features">  

                    <h2>Why Choose FurniRent?</h2> <br />

                    <div className="feature-grid">

                        {features.map((item, index) => (

                            <div
                                className="feature"
                                key={index}
                            >

                                <div className="feature-icon">
                                    {item.icon}
                                </div>

                                <h4>{item.title}</h4>

                            </div>

                        ))}

                    </div>

                </section>

                {/* CTA */}

                <section className="cta">

                    <div className="cta-left">

                        <h2>
                            Ready to Make Your Home
                            More Comfortable?
                        </h2>

                        <p>
                            Browse hundreds of premium furniture items
                            available for rent.
                        </p>

                        <button>
                            Browse Catalog
                        </button>

                    </div>

                    <div className="cta-right">

                        <img
                            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
                            alt=""
                        />

                    </div>

                </section>
            </div>

            <Footer />
        </div>
    )
}

export default HowItWorks