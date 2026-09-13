'use client';
import React, { useEffect, useState } from 'react'
import "../Style/MyRentalItems.css"
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const MyRentalItems = () => {
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:8000"
            : "https://rental-project-opal.vercel.app";

    console.log("API_URL : ", API_URL)

    const [products, setProducts] = useState([])
    const [loginUser, setLoginUser] = useState()
    const [IP, setIP] = useState("")

    const getLoginUser = async () => {
        const response = await fetch(`/get-login-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                IP: IP,
            })
        })
        const data = await response.json()
        setLoginUser(data)
    }

    const getIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIP(data.ip)
    };

    const searchItems = async (req, res) => {
        if (loginUser !== undefined && loginUser?.loggedUser !== null) {
            const rentalItems = await fetch(`/my-rental-items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: loginUser?.user?.email,
                    name: loginUser?.user?.name
                })
            })

            const result = await rentalItems.json()
            setProducts(result)
        }
        else {
            setProducts([])
        }
    }
    useEffect(() => {
        getIP()
    }, [])

    !loginUser?.user?.email && getLoginUser()

    useEffect(() => {
        searchItems()
    }, [loginUser])

    return (
        <div>
            <NavBar />

            <h4 className='heading'>My Rental Items</h4>

            <div className='products'>
                {
                    products.map((prod, index) => {
                        return <div className='product' key={index}>
                            <div className='img' style={{
                                backgroundImage: `url(https://rental-project-backend.vercel.app/uploads/${prod.imageNames[0]})`
                            }}></div>
                            <div className='details'>
                                <div className='prodName'>{prod.name}</div>
                                <div className='price'>₹{prod.price} / month</div>
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