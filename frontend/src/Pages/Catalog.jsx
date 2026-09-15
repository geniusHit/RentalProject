import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Style/Catalog.css'
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { useForm } from "react-hook-form"
import { jwtDecode } from "jwt-decode";

const Catalog = () => {
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:8000"
            : "https://rental-project-u2yo-hyklfx8xp-rohit-9631.vercel.app";

    const [products, setProducts] = useState([])
    const [itemMessage, setItemMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [IP, setIP] = useState("")
    const [loginUser, setLoginUser] = useState({})
    const [paymentToken, setPaymentToken] = useState([])
    const [paymentData, setPaymentData] = useState()
    const [paymentStatus, setPaymentStatus] = useState()
    const navigate = useNavigate()

    const getProducts = async () => {
        const response = await fetch(`${API_URL}/get-products`)
        const result = await response.json()
        setProducts(result)
    }

    const getIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIP(data.ip)
    };

    const getLoginUser = async () => {
        const response = await fetch(`${API_URL}/get-login-user`, {
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

    useEffect(() => {
        getProducts()
        getIP()
        getPaymentToken()
    }, [])

    useEffect(() => {
        IP !== "" && getLoginUser()
    }, [IP])

    useEffect(() => {
        if (paymentToken[0]?.payment_token) {
            paymentVerify()
        }
    }, [paymentToken])

    useEffect(() => {
        paymentStatus?.link_status === "PAID" && addRental()
    }, [paymentStatus])

    const rentNow = async (product) => {
        if (loginUser) {
            console.log("rent now is called")
            console.log("loginUser : ", loginUser)
            const payment = await fetch(`${API_URL}/create-test-payment-link`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...product, email: loginUser?.user?.email, userName: loginUser?.user?.name })
            })
            const paymentData = await payment.json()
            console.log("paymentData : ", paymentData)
            setPaymentData(paymentData)
            const savePaymentToken = await fetch(`${API_URL}/save-payment-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ payment_token: paymentData?.payment_token })
            })
            window.location.href = paymentData?.link_url;
        }
        else {
            navigate("/login")
        }
    }

    const getPaymentToken = async (req, res) => {
        const response = await fetch(`${API_URL}/get-payment-token`)
        const data = await response.json()
        setPaymentToken(data)
    }

    const paymentVerify = async () => {
        const paymentData2 = jwtDecode(paymentToken[0].payment_token);
        setPaymentData(paymentData2)

        if (paymentData2 !== null) {
            const verifyPayment = await fetch(`${API_URL}/verify-payment-link`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentData2)
            })

            const paymentStatus2 = await verifyPayment.json()
            setPaymentStatus(paymentStatus2)
        }
    }

    const addRental = async () => {
        const rentNow = await fetch(`${API_URL}/add-rental-item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paymentData)
        })

        const result = await rentNow.json()
        setItemMessage(result.message)
        setShowMessage((prevValue) => !prevValue)

        const deleteToken = await fetch(`${API_URL}/delete-payment-token`)
        const result2 = await deleteToken.json()
    }

    const { register, handleSubmit } = useForm()

    const searchProds = async (data) => {
        if (data !== undefined) {
            localStorage.setItem("search", data?.search)
        }

        const prods = await fetch(`${API_URL}/search-products`, {
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
                <input type='submit' className='search-btn' value="Search" />
            </form>

            <br /><br />

            <div className={`${products.length > 0 ? "products" : ""}`}>
                {
                    products.length > 0 ? products.map((prod, index) => {
                        console.log("prod : ", prod)
                        return <div className='product' key={index}>
                            <div className='img' style={{
                                backgroundImage: `url(${API_URL}/uploads/${prod.imageNames[0]})`
                            }}></div>
                            <div className='details'>
                                <div className='prodName'>{prod.name}</div>
                                <div className='price'>₹{prod.price} / month</div>
                                <div className='available'>Available <b>{prod?.quantity}</b></div>
                                <div>
                                    <label>Days for Rent</label>

                                    <input
                                        type="number"
                                        max="365"
                                        min="5"
                                        onChange={(e) => {
                                            prod = { ...prod, rentDays: e.target.value }
                                        }}
                                        readOnly={prod?.quantity < 1 ? true : false}
                                    />
                                </div>
                                <button className='rentNowButton'
                                    onClick={() => { rentNow(prod) }}
                                    disabled={prod?.quantity < 1 ? true : false}
                                >Rent Now</button>
                            </div>
                        </div>
                    })
                        :
                        <div className='spinner-box'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
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