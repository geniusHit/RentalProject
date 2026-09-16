import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cimg5 from '../assets/nathan-fertig-FBXuXp57eM0-unsplash.jpg'
import cimg6 from '../assets/sherzod-gulomov-P0q_HK_-GGM-unsplash (1).jpg'
import cimg7 from '../assets/spacejoy-RqO6kwm4tZY-unsplash.jpg'
import cimg8 from '../assets/naomi-hebert-MP0bgaS_d1c-unsplash.jpg'
import working from '../assets/Screenshot 2026-06-08 193814.png'
import sofa from "../assets/WSFABCLPC22CFVDO_1.avif"
import bed from "../assets/WSWB7860ARIGB_1.webp"
import chair from "../assets/black_0.webp"
import table from "../assets/3009computertablecopy_fd810c37-4f90-4de3-9e94-22881083c05d.webp"
import tv from "../assets/2023-tv-buying-guide-what-is-smart-tv-f00-mo.avif"
import fridge from "../assets/refer-s-x-s-masthead_mobile3.avif"
import washingMachine from "../assets/washer-dryer-banner-750x730-1.avif"
import washingMachine2 from "../assets/WashingMachine.png"
import tv2 from "../assets/TV.png"
import fridge2 from "../assets/Fridge.png"
import bed2 from "../assets/Bed.png"
import table2 from "../assets/Table.png"
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
                        <img src={washingMachine2} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                        <img src={tv2} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                        <img src={fridge2} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                        <img src={bed2} className="d-block w-100" />
                    </div>
                    {/* <div className="carousel-item">
                        <img src={table2} className="d-block w-100" />
                    </div> */}
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
                    <div className='category-option' onClick={()=> searchProducts("Sofa")}>
                        <div className='img' style={{ backgroundImage: `url(${sofa})` }}></div>
                        <div className='title'>Sofa</div>
                    </div>
                    <div className='category-option' onClick={()=> searchProducts("Bed")}>
                        <div className='img' style={{ backgroundImage: `url(${bed})` }}></div>
                        <div className='title'>Bed</div>
                    </div>
                    <div className='category-option' onClick={()=> searchProducts("Chair")}>
                        <div className='img' style={{ backgroundImage: `url(${chair})` }}></div>
                        <div className='title'>Chair</div>
                    </div>
                    <div className='category-option' onClick={()=> searchProducts("Table")}>
                        <div className='img' style={{ backgroundImage: `url(${table})` }}></div>
                        <div className='title'>Table</div>
                    </div>
                    <div className='category-option' onClick={()=> searchProducts("TV")}>
                        <div className='img' style={{ backgroundImage: `url(${tv})` }}></div>
                        <div className='title'>Tv</div>
                    </div>
                    <div className='category-option' onClick={()=> searchProducts("Fridge")}>
                        <div className='img' style={{ backgroundImage: `url(${fridge})` }}></div>
                        <div className='title'>Fridge</div>
                    </div>
                    <div className='category-option' onClick={()=> searchProducts("Washing machine")}>
                        <div className='img' style={{ backgroundImage: `url(${washingMachine})` }}></div>
                        <div className='title'>Washing Machine</div>
                    </div>
                </div>
            </div>

            <div className='working' style={{ backgroundImage: `url(${working})` }}></div>

            <Footer />
        </div>
    )
}

export default Home