import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';
import Logo from '../assets/Logo.png'
import person from '../assets/person.svg'
import { NavDropdown } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
import '../Style/Catalog.css'
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const Catalog = () => {
    const [products, setProducts] = useState([])
    const port = process.env.PORT;

    const getProducts = async () => {
        const response = await fetch(`http://localhost:${port}/get-products`)
        const result = await response.json()
        setProducts(result)
    }

    useEffect(() => {
        getProducts()
    }, [])

    console.log("products = ", products)

    const rentNow = async (product) => {
        console.log("product = ", product)
        const email = localStorage.getItem("email")
        const userName = localStorage.getItem("name")

        const rentNow = await fetch(`http://localhost:${port}/add-rental-item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...product, email: email, userName: userName})
        })
    }

    return (
        <div>
            <NavBar />

            <form className='search-form'>
                <input type='text' placeholder='Search furniture and appliances by type, style, or price...' className='search-input' />
            </form>

            <br /><br />

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
                                <button className='rentNowButton' onClick={()=>{rentNow(prod)}}>Rent Now</button>
                            </div>
                        </div>
                    })
                }
            </div>

            <br />

            {/* Footer */}
            <Footer />
            
            <div className="copyright">
                © 2024 FurniRent. All rights reserved.
            </div>
        </div>
    )
}

export default Catalog