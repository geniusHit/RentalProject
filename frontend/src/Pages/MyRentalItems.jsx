import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.png'
import { NavLink, Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
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
import "../Style/MyRentalItems.css"
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const MyRentalItems = () => {
    const [products, setProducts] = useState([])

    const searchItems = async (req, res) => {
        const rentalItems = await fetch("http://localhost:5000/my-rental-items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                name: localStorage.getItem("name")
            })
        })

        const result = await rentalItems.json()
        console.log("result = ", result)
        setProducts(result)
    }
    useEffect(() => {
        searchItems()
    }, [])

    console.log("products = ", products)

    return (
        <div>
            <NavBar />

            <h4 className='heading'>My Rental Items</h4>

            <div className='products'>
                {
                    products.map((prod, index) => {
                        return <div className='product' key={index}>
                            <div className='img' style={{
                                backgroundImage: `url(http://localhost:5000/uploads/${prod.imageNames[0]})`
                            }}></div>
                            <div className='details'>
                                <div className='prodName'>{prod.name}</div>
                                <div className='price'>₹{prod.price} / month</div>
                                {/* <button className='rentNowButton' onClick={() => { rentNow(prod) }}>Rent Now</button> */}
                            </div>
                        </div>
                    })
                }
            </div>

            <Footer />
        </div>
    )
}

export default MyRentalItems