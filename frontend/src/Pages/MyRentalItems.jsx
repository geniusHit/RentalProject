import React, { useEffect, useState } from 'react'
import "../Style/MyRentalItems.css"
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const MyRentalItems = () => {
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:8000"
            : "https://rental-project-backend.vercel.app";

    const [products, setProducts] = useState([])
    const [loginUser, setLoginUser] = useState()
    const [imageIDs, setImageIDs] = useState([])
    const [productImages, setProductImages] = useState([])
    const [IP, setIP] = useState("")
    const [imageUrl, setImageUrl] = useState([])

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

    const getIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIP(data.ip)
    };

    const searchItems = async (req, res) => {
        if (loginUser !== undefined && loginUser?.loggedUser !== null) {
            const rentalItems = await fetch(`${API_URL}/my-rental-items`, {
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

    useEffect(() => {
        IP !== "" && getLoginUser()
    }, [IP])

    useEffect(() => {
        searchItems()
    }, [loginUser])

    products.length > 0 && imageIDs.length < 1 && products.map((item) => {
        item.imageNames.map((img_id) => setImageIDs((prev) => [...prev, img_id]))
    })

    const getImages = async () => {
        const imagesResonse = await fetch(`${API_URL}/images`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image_ids: imageIDs })
        })

        const images = await imagesResonse.json()
        setProductImages(images)
    }

    imageIDs.length > 0 && productImages.length === 0 && getImages();

    const getImageUrl = () => {
        productImages.map((item) => {
            if (!item || !item.data || !item.data.data) return '';

            const uint8Array = new Uint8Array(item.data.data);
            let binaryString = '';

            const chunkSize = 8192;
            for (let i = 0; i < uint8Array.length; i += chunkSize) {
                const chunk = uint8Array.subarray(i, i + chunkSize);
                binaryString += String.fromCharCode.apply(null, chunk);
            }

            const base64 = btoa(binaryString);
            setImageUrl((prev) => [...prev, { id: item._id, url: `data:${item.contentType};base64,${base64}` }])
            // return `data:${item.contentType};base64,${base64}`;
        })
    };

    productImages.length > 0 && imageUrl.length === 0 && getImageUrl();

    return (
        <div>
            <NavBar />

            <h4 className='heading'>My Rental Items</h4>

            <div className="products">
                {
                    products.map((prod, index) => {
                        const currentProductImages = prod?.imageNames.map((image) => {
                            return imageUrl.filter((image2) => image2.id === image)
                        })

                        return <div className='product' key={index}>
                            {currentProductImages[0][0]?.url && <div className='img' style={{
                                backgroundImage: `url(${currentProductImages[0][0].url})`
                            }}></div>}
                            <div className='details'>
                                <div className='prodName'>{prod.name}</div>
                                <div className='price'>₹{prod.price} / month</div>
                                <div className='price'>Rent Days {prod.rentDays}</div>
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