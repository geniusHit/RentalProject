'use client';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import livingRoom from '../assets/15adafbb-ddea-45f5-a2ec-afd9008065f0.webp'
import cimg5 from '../assets/nathan-fertig-FBXuXp57eM0-unsplash.jpg'
import cimg6 from '../assets/sherzod-gulomov-P0q_HK_-GGM-unsplash (1).jpg'
import cimg7 from '../assets/spacejoy-RqO6kwm4tZY-unsplash.jpg'
import cimg8 from '../assets/naomi-hebert-MP0bgaS_d1c-unsplash.jpg'
import bedroom from '../assets/istockphoto-2185177891-612x612.jpg'
import office from '../assets/ho-m5-1-1740657447-4ba63.avif'
import outdoor from '../assets/203.webp'
import working from '../assets/Screenshot 2026-06-08 193814.png'
import Carousel from 'bootstrap/js/dist/carousel';
import NavBar from "../Components/NavBar.jsx"
import Footer from '../Components/Footer.jsx'

const Home = () => {
    const navigate = useNavigate()

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
    }, []);

    const searchProducts = (searchKey)=>{
        localStorage.setItem("search", searchKey)
        navigate("/catalog")
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

                    <Link to="/catalog"><button className='carousel-btn' onClick={()=>localStorage.setItem("search", "")}>Browse Catalog ›</button></Link>
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
                        <img src={cimg5} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                        <img src={cimg6} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                        <img src={cimg7} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                        <img src={cimg8} className="d-block w-100" />
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

            <div className='categories'>
                <h4>Featured Categories</h4>

                <div className='category-options'>
                    <div className='category-option' onClick={()=> searchProducts("Living Room")}>
                        <div className='img' style={{ backgroundImage: `url(${livingRoom})` }}></div>
                        <div className='title'>Living Room</div>
                    </div>
                    <div className='category-option' onClick={()=> searchProducts("Bedroom")}>
                        <div className='img' style={{ backgroundImage: `url(${bedroom})` }}></div>
                        <div className='title'>Bedroom</div>
                    </div>
                    <div className='category-option' onClick={()=> searchProducts("Office")}>
                        <div className='img' style={{ backgroundImage: `url(${office})` }}></div>
                        <div className='title'>Office</div>
                    </div>
                    <div className='category-option' onClick={()=> searchProducts("Outdoor")}>
                        <div className='img' style={{ backgroundImage: `url(${outdoor})` }}></div>
                        <div className='title'>Outdoor</div>
                    </div>
                </div>
            </div>

            <div className='working' style={{ backgroundImage: `url(${working})` }}></div>

            <Footer />
        </div>
    )
}

export default Home