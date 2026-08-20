import React, { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png'
import person from '../assets/person.svg'
import { NavDropdown } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
import '../Style/Catalog.css'
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { useForm } from "react-hook-form"
import { jwtDecode } from "jwt-decode";


const SECRET = "rohit79"

const Catalog = () => {
    const [products, setProducts] = useState([])
    const [itemMessage, setItemMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const navigate = useNavigate()
    // const port = process.env.PORT;

    const getProducts = async () => {
        const response = await fetch(`http://localhost:8000/get-products`)
        const result = await response.json()
        setProducts(result)
    }

    useEffect(() => {
        getProducts()
    }, [])

    console.log("products = ", products)

    const token = jwtDecode(localStorage.getItem("jwtToken"));
    console.log("token : ", token)

    const rentNow = async (product) => {
        console.log("product = ", product)

        // if(loca)
        console.log(`localStorage.getItem("isLogin") = `, localStorage.getItem("isLogin"))

        const email = localStorage.getItem("email")
        const userName = localStorage.getItem("name")
        const isLogin = JSON.parse((localStorage.getItem("isLogin")).toLowerCase())

        if (isLogin === true) {
            const rentNow = await fetch(`http://localhost:8000/add-rental-item`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...product, email: token.email, userName: token.name })
            })

            const result = await rentNow.json()
            console.log("result = ", result)
            setItemMessage(result.message)
            setShowMessage((prevValue) => !prevValue)
        }
        else {
            navigate("/signup")
        }
    }

    const { watch, register, handleSubmit } = useForm()

    // localStorage.setItem("search", "")

    const searchProds = async (data) => {
        if (data !== undefined) {
            localStorage.setItem("search", data?.search)
        }

        const prods = await fetch("http://localhost:8000/search-products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ search: localStorage.getItem("search") })
        })
        const result = await prods.json()
        console.log("prods = ", result)

        setProducts(result)
    }

    useEffect(() => {
        searchProds()
    }, [])

    console.log(`localStorage.getItem("search") = `, localStorage.getItem("search"))

    const [rentDayss, setRentDayss] = useState([])
    console.log("rentDayss : ", rentDayss)

    return (
        <div>
            <NavBar />

            <form className='search-form' onSubmit={handleSubmit(searchProds)}>
                <input type='text' placeholder='Search furniture and appliances by type, style, or price...' className='search-input'
                    {...register("search")} />
                <input type='submit' className='search-btn' />
            </form>

            <br /><br />

            <div className='products'>
                {
                    products.map((prod, index) => {
                        console.log("prod = ", prod)

                        return <div className='product' key={index}>
                            <div className='img' style={{
                                backgroundImage: `url(http://localhost:8000/uploads/${prod.imageNames[0]})`
                            }}></div>
                            <div className='details'>
                                <div className='prodName'>{prod.name}</div>
                                <div className='price'>₹{prod.price} / month</div>
                                <div>
                                    <label>Days for Rent</label>

                                    <input
                                        type="number"
                                        placeholder="10"
                                        max="365"
                                        min="5"
                                        onChange={(e)=> {
                                            // let rentD = rentDayss;
                                            // rentD[index] = e.target.value;
                                            // setRentDayss(rentD);
                                            prod = {...prod, rentDays: e.target.value}
                                            console.log("prod : ", prod)
                                        }}
                                    />
                                </div>
                                <button className='rentNowButton' onClick={() => { rentNow(prod) }}>Rent Now</button>
                            </div>
                        </div>
                    })
                }
            </div>


            {showMessage === true
                &&
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Message</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowMessage(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>{itemMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowMessage(false)}>Close</button>
                                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            }


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