import React, { useEffect, useState } from 'react'
import "../Style/MyRentalItems.css"
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { jwtDecode } from "jwt-decode";

const MyRentalItems = () => {
    const [products, setProducts] = useState([])

    const token = jwtDecode(localStorage.getItem("login-user"));

    console.log("token : ", token)

    const searchItems = async (req, res) => {
        const rentalItems = await fetch("http://localhost:8000/my-rental-items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: token.email,
                name: token.name
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
                                backgroundImage: `url(http://localhost:8000/uploads/${prod.imageNames[0]})`
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