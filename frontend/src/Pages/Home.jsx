import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import person from '../assets/person.svg'
import cimg1 from '../assets/How_to_Choose_the_Right_Furniture_for_Your_Home.webp'
import cimg2 from '../assets/smart-home-appliance-integration-kitchen.webp'
import cimg3 from '../assets/istockphoto-2185177891-612x612.jpg'
import cimg4 from '../assets/clean-kitchen-appliances-safely.jpg.webp'
import livingRoom from '../assets/15adafbb-ddea-45f5-a2ec-afd9008065f0.webp'
import bedroom from '../assets/small-modern-bedroom-interior-design-simple-latest-elegant-ideas.avif'
import office from '../assets/ho-m5-1-1740657447-4ba63.avif'
import outdoor from '../assets/203.webp'
import working from '../assets/Screenshot 2026-06-08 193814.png'
import Carousel from 'bootstrap/js/dist/carousel';
import { NavDropdown } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
import NavBar from "../Components/NavBar.jsx"
import Footer from '../Components/Footer.jsx'

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const element = document.getElementById('carouselExampleIndicators');

        if (element) {
            new Carousel(element, {
                interval: 3000,
                ride: 'carousel',
                pause: false,
                wrap: true,
            });
        }

        // getProducts()

        check()
    }, []);

    const getProducts = async () => {
        const response = await fetch("http://localhost:8000/get-products")
        const result = await response.json()
        console.log("result = ", result)
        setProducts(result)
    }

    products.length > 0 && console.log("(products[products.length-1]).imageNames[0] = ", (products[products.length - 1]).imageNames[0])

    console.log("localStorage.getItem('isLogin') = ", localStorage.getItem('isLogin'))
    console.log("localStorage.getItem(name) = ", localStorage.getItem("name"))
    console.log("localStorage.getItem(email) = ", localStorage.getItem("email"))
    // localStorage.removeItem('isLogin')

    const check = async () => {
        const response = await fetch("http://localhost:8000/check")
        const result = await response.json()
        console.log("check result = ", result)
    }


    return (
        <div>
            <NavBar />

            <div id="carouselExampleIndicators" className="carousel slide my-carousel" >
                <div className='carousel-text'>
                    Rent Furniture & Appliances <br />
                    Easily & Affordably

                    <div className='carousel-text2'>
                        High-quality furniture & appliances for every home and lifestyle. Rent. Live. Love.
                    </div> <br />

                    <button className='carousel-btn'>Browse Catalog ›</button>
                </div>

                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="3"
                        aria-label="Slide 4"
                    ></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={cimg1} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                        <img src={cimg2} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                        <img src={cimg3} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                        <img src={cimg4} className="d-block w-100" />
                    </div>
                </div>
                <button style={{ display: "none" }} className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button style={{ display: "none" }} className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <form className='search-form'>
                <input type='text' placeholder='Search furniture and appliances by type, style, or price...' className='search-input' />
            </form>

            <div className='categories'>
                <h4>Featured Categories</h4>

                <div className='category-options'>
                    <div className='category-option'>
                        <div className='img' style={{ backgroundImage: `url(${livingRoom})` }}></div>
                        <div className='title'>Living Room</div>
                    </div>
                    <div className='category-option'>
                        <div className='img' style={{ backgroundImage: `url(${bedroom})` }}></div>
                        <div className='title'>Bedroom</div>
                    </div>
                    <div className='category-option'>
                        <div className='img' style={{ backgroundImage: `url(${office})` }}></div>
                        <div className='title'>Office</div>
                    </div>
                    <div className='category-option'>
                        <div className='img' style={{ backgroundImage: `url(${outdoor})` }}></div>
                        <div className='title'>Outdoor</div>
                    </div>
                </div>
            </div>

            <div className='working' style={{ backgroundImage: `url(${working})` }}></div>

            <Footer />

            {/* {products.length > 0 && <img src={`http://localhost:8000/uploads/${(products[products.length-1]).imageNames[0]}`} />} */}
        </div>
    )
}

export default Home