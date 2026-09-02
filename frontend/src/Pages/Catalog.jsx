import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Style/Catalog.css'
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { useForm } from "react-hook-form"
import { jwtDecode } from "jwt-decode";

const Catalog = () => {
    const [products, setProducts] = useState([])
    const [itemMessage, setItemMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const navigate = useNavigate()

    const getProducts = async () => {
        const response = await fetch(`http://localhost:8000/get-products`)
        const result = await response.json()
        setProducts(result)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const token = jwtDecode(localStorage.getItem("login-user"));

    const rentNow = async (product) => {
        const isLogin = JSON.parse((localStorage.getItem("isLogin")))

        if (isLogin === true) {
            const payment = await fetch(`http://localhost:8000/create-test-payment-link`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...product, email: token?.email, userName: token?.name })
            })
            const paymentData = await payment.json()
            localStorage.setItem("payment_id_token", paymentData?.payment_token)
            window.location.href = paymentData?.link_url
        }
        else {
            navigate("/signup")
        }
    }

    const paymentVerify = async () => {
        const paymentData = jwtDecode(localStorage.getItem("payment_id_token"));

        const verifyPayment = await fetch("http://localhost:8000/verify-payment-link", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paymentData)
        })

        const paymentStatus2 = await verifyPayment.json()

        if (paymentStatus2?.link_status === "PAID" && localStorage.getItem("payment_id_token")) {
            addRental();
            localStorage.removeItem("payment_id_token");
        };
    }

    localStorage.getItem("payment_id_token") && paymentVerify()

    const addRental = async () => {
        const paymentData = jwtDecode(localStorage.getItem("payment_id_token"));

        const rentNow = await fetch(`http://localhost:8000/add-rental-item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paymentData)
        })

        const result = await rentNow.json()
        setItemMessage(result.message)
        setShowMessage((prevValue) => !prevValue)
    }

    const { register, handleSubmit } = useForm()

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
        setProducts(result)
    }

    useEffect(() => {
        searchProds()
    }, [])

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
                                        onChange={(e) => {
                                            prod = { ...prod, rentDays: e.target.value }
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
                            </div>
                        </div>
                    </div>
                </div>  
            }

            <br />

            <Footer />

            <div className="copyright">
                © 2024 FurniRent. All rights reserved.
            </div>
        </div>
    )
}

export default Catalog