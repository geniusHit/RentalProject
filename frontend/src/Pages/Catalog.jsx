import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Style/Catalog.css'
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { useForm } from "react-hook-form"
import { jwtDecode } from "jwt-decode";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const Catalog = () => {
    const [products, setProducts] = useState([])
    const [itemMessage, setItemMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [IP, setIP] = useState("")
    const [loginUser, setLoginUser] = useState({})
    const [paymentToken, setPaymentToken] = useState([])
    const [paymentData, setPaymentData] = useState()
    const [paymentStatus, setPaymentStatus] = useState()
    const navigate = useNavigate()

    console.log("VITE_API_URL : ", VITE_API_URL)

    const getProducts = async () => {
        const response = await fetch(`https://rental-project-opal.vercel.app/get-products`)
        const result = await response.json()
        setProducts(result)
    }

    const getIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIP(data.ip)
    };

    const getLoginUser = async () => {
        const response = await fetch(`http://localhost:8000/get-login-user`, {
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
        getLoginUser()
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
            const payment = await fetch(`http://localhost:8000/create-test-payment-link`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...product, email: loginUser?.user?.email, userName: loginUser?.user?.name })
            })
            const paymentData = await payment.json()
            setPaymentData(paymentData)
            const savePaymentToken = await fetch(`http://localhost:8000/save-payment-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ payment_token: paymentData?.payment_token })
            })
            window.location.href = paymentData?.link_url
        }
        else {
            navigate("/login")
        }
    }

    const getPaymentToken = async (req, res) => {
        const response = await fetch(`http://localhost:8000/get-payment-token`)
        const data = await response.json()
        setPaymentToken(data)
    }

    const paymentVerify = async () => {
        const paymentData2 = jwtDecode(paymentToken[0].payment_token);
        setPaymentData(paymentData2)

        if (paymentData2 !== null) {
            const verifyPayment = await fetch("http://localhost:8000/verify-payment-link", {
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

        const deleteToken = await fetch("http://localhost:8000/delete-payment-token")
        const result2 = await deleteToken.json()
        console.log("result2 : ", result2)
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

    console.log("paymentData : ", paymentData)
    console.log("paymentStatus : ", paymentStatus)
    console.log("loginUser : ", loginUser)
    console.log("paymentToken : ", paymentToken)

    return (
        <div>
            <NavBar />

            <form className='search-form' onSubmit={handleSubmit(searchProds)}>
                <input type='text' placeholder='Search furniture and appliances by type, style, or price...' className='search-input'
                    {...register("search")} />
                <input type='submit' className='search-btn' value="Search" />
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