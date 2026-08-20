import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form"
import {
    FaCouch,
    FaBoxOpen,
    FaClipboardList,
    FaTruck,
    FaTools,
    FaPlus,
    FaCalendarAlt,
    FaUserCircle,
    FaEye,
} from "react-icons/fa";

import "../Style/VendorDashboardStyle.css";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
    const [activePage, setActivePage] = React.useState("dashboard");
    const browseInput = useRef()
    const { register, handleSubmit } = useForm()
    const [images, setImages] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    const [rentalProducts, setRentalProducts] = useState([])
    const [products, setProducts] = useState([])

    const browseFiles = (e) => {
        console.log("browseInput.current = ", browseInput.current)
        console.log("browseInput.current.files = ", browseInput.current.files)
        console.log("e.target = ", e.target)
        let images2 = browseInput.current.files
        for (let image of images2) {
            setImages(prevImages => [...prevImages, image["name"]])
            let imgUrl = URL.createObjectURL(image)
            setImageUrls(prevImgUrls => [...prevImgUrls, imgUrl])
        }
    }

    console.log("images = ", images)
    console.log("imageUrls = ", imageUrls)
    console.log("activePage = ", activePage)

    const submit = async (data) => {
        let formData = new FormData();
        for (let img of browseInput.current.files) {
            console.log("img = ", img)
            formData.append("image", img)
        }
        const saveImages = await fetch("http://localhost:8000/save-product-images", {
            method: "POST",
            body: formData,
        })
        const saveImagesName = await saveImages.json()
        console.log("saveImages response = ", saveImagesName)


        console.log("data = ", data)
        console.log("images = ", images)
        let data2 = { ...data, imageNames: saveImagesName }
        console.log("data2 = ", data2)
        const result = await fetch("http://localhost:8000/add-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data2)
        })

        console.log("add product completed")
    }

    const rentals = [
        {
            id: "FR1234",
            customer: "Ananya T.",
            product: "Luxe 3-Seater Sofa",
            duration: "3 Months",
            delivery: "May 20, 2024",
            status: "Confirmed",
        },
        {
            id: "FR1235",
            customer: "Rahul M.",
            product: "Modern Queen Bed",
            duration: "6 Months",
            delivery: "May 21, 2024",
            status: "Scheduled",
        },
        {
            id: "FR1236",
            customer: "Priya S.",
            product: "Ergonomic Office Chair",
            duration: "1 Month",
            delivery: "May 22, 2024",
            status: "Pending",
        },
    ];

    const schedules = [
        {
            date: "20",
            month: "MAY",
            title: "Delivery",
            product: "Luxe 3-Seater Sofa",
            time: "10:00 AM",
        },
        {
            date: "21",
            month: "MAY",
            title: "Pickup",
            product: "Modern Queen Bed",
            time: "02:00 PM",
        },
        {
            date: "22",
            month: "MAY",
            title: "Delivery",
            product: "Office Chair",
            time: "11:00 AM",
        },
    ];

    const maintenance = [
        {
            title: "Sofa Repair",
            product: "Luxe 3-Seater Sofa",
            priority: "High",
        },
        {
            title: "Chair Wheels Replacement",
            product: "Office Chair",
            priority: "Medium",
        },
        {
            title: "Cushion Cleaning",
            product: "Outdoor Sofa",
            priority: "Low",
        },
    ];

    const getRentalProducts = async () => {
        const rp = await fetch("http://localhost:8000/all-rentals")
        const result = await rp.json()
        setRentalProducts(result)
    }

    const getProducts = async () => {
        const response = await fetch(`http://localhost:8000/get-products`)
        const result = await response.json()
        setProducts(result)
    }

    useEffect(() => {
        getRentalProducts()
        getProducts()
    }, [])

    console.log("products = ", products)

    return (
        <div className="vendor-dashboard">

            {/* Sidebar */}

            <aside className="sidebar">
                <Link to="/" className="logoLink"> <h2 className="logo">FurniRent</h2> </Link>

                <ul>
                    <li
                        className={activePage === "dashboard" ? "active" : ""}
                        onClick={() => setActivePage("dashboard")}
                    >
                        Dashboard
                    </li>

                    <li onClick={() => setActivePage("manageInventory")}>Manage Inventory</li>

                    <li
                        className={activePage === "addProduct" ? "active" : ""}
                        onClick={() => setActivePage("addProduct")}
                    >
                        Add Product
                    </li>

                    <li onClick={() => setActivePage("rentals")}>Rentals</li>
                    <li onClick={() => setActivePage("deliveries")}>Deliveries</li>
                    <li onClick={() => setActivePage("reviews")}>Reviews</li>
                </ul>
            </aside>

            {/* Main */}

            <main className="dashboard-content">

                {activePage === "dashboard" ? (

                    <>
                        {/* Header */}

                        <div className="topbar">
                            <div>
                                <h2>Welcome Back Vendor</h2>
                                <p>Here's what's happening today.</p>
                            </div>
                        </div>

                        {/* Stats */}

                        <div className="stats-grid">

                            <div className="stat-card">
                                <FaCouch className="stat-icon" />
                                <h3>Total Rentals</h3>
                                <h2>{rentalProducts.length}</h2>
                            </div>

                            <div className="stat-card">
                                <FaClipboardList className="stat-icon" />
                                <h3>Pending Orders</h3>
                                <h2>8</h2>
                            </div>

                            <div className="stat-card">
                                <FaTruck className="stat-icon" />
                                <h3>Upcoming Deliveries</h3>
                                <h2>12</h2>
                            </div>
                        </div>

                        {/* Rentals Table */}

                        <div className="card">
                            <div className="card-header">
                                <h2>Recent Rentals</h2>
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Product</th>
                                        <th>Duration</th>
                                        <th>Delivery</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {rentals.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>

                                            <td>
                                                <div className="user">
                                                    <FaUserCircle size={28} />
                                                    {item.customer}
                                                </div>
                                            </td>

                                            <td>
                                                <div className="product">
                                                    <FaBoxOpen />
                                                    {item.product}
                                                </div>
                                            </td>

                                            <td>{item.duration}</td>
                                            <td>{item.delivery}</td>

                                            <td>
                                                <span className={`status ${item.status.toLowerCase()}`}>
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td>
                                                <FaEye />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Bottom Section */}

                        <div className="bottom-grid">

                            {/* Quick Actions */}

                            <div className="card">
                                <h2>Quick Actions</h2>

                                <div className="action-grid">
                                    <div className="action-box">
                                        <FaPlus />
                                        <p>Add Product</p>
                                    </div>

                                    <div className="action-box">
                                        <FaBoxOpen />
                                        <p>Manage Inventory</p>
                                    </div>

                                    <div className="action-box">
                                        <FaClipboardList />
                                        <p>Accept Orders</p>
                                    </div>

                                    <div className="action-box">
                                        <FaTruck />
                                        <p>Schedule Delivery</p>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule */}

                            <div className="card">
                                <h2>Upcoming Schedule</h2>

                                {schedules.map((item, index) => (
                                    <div className="schedule-item" key={index}>
                                        <div className="schedule-date">
                                            <span>{item.month}</span>
                                            <h3>{item.date}</h3>
                                        </div>

                                        <div>
                                            <strong>{item.title}</strong>
                                            <p>{item.product}</p>
                                            <small>{item.time}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Last Row */}

                        <div className="bottom-grid">

                            <div className="card">
                                <h2>Inventory Overview</h2>

                                <div className="inventory-stats">
                                    <p>Available : 120</p>
                                    <p>Rented : 80</p>
                                    <p>Maintenance : 20</p>
                                    <p>Inactive : 20</p>
                                </div>
                            </div>

                            <div className="card">
                                <h2>Maintenance Requests</h2>

                                {maintenance.map((item, index) => (
                                    <div key={index} className="maintenance-item">
                                        <FaTools />

                                        <div>
                                            <h4>{item.title}</h4>
                                            <p>{item.product}</p>
                                        </div>

                                        <span>{item.priority}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>

                ) : activePage === "addProduct" ? (

                    <form onSubmit={handleSubmit(submit)} method="POST" encType="multipart/form-data">
                        <div className="add-product-page">
                            <div className="page-header">
                                <h1>Add Product</h1>
                                <p>Dashboard &gt; Inventory &gt; Add Product</p>
                            </div>

                            {/* PRODUCT IMAGES */}

                            <div className="card">
                                <h2>Product Images</h2>

                                <div className="image-section">

                                    <div className="upload-box">
                                        <FaPlus size={40} />
                                        <p>Drag & Drop Images Here</p>

                                        <input type="file" multiple className="browse-input" ref={browseInput} onChange={browseFiles} />
                                        <button type="button" className="browse-btn" onClick={() => browseInput.current.click()}>Browse Files</button>
                                    </div>

                                    <div className="preview-images">
                                        {
                                            imageUrls.map((url, index) => {
                                                return (
                                                    <img src={url} height="100" key={index} />
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                            </div>

                            {/* PRODUCT INFORMATION */}

                            <div className="card">
                                <h2>Product Information</h2>

                                <div className="form-grid">

                                    <div>
                                        <label>Product Name</label>
                                        <input
                                            type="text"
                                            placeholder="Modern Queen Bed"
                                            {...register("name")}
                                        />
                                    </div>

                                    <div>
                                        <label>SKU</label>
                                        <input
                                            type="text"
                                            placeholder="FRN-BED-001"
                                            {...register("sku")}
                                        />
                                    </div>

                                    <div>
                                        <label>Category</label>

                                        <select {...register("cetegory")}>
                                            <option>Select Category</option>
                                            <option>Sofa</option>
                                            <option>Bed</option>
                                            <option>Chair</option>
                                            <option>Table</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label>Condition</label>

                                        <select {...register("condition")}>
                                            <option>Select Condition</option>
                                            <option>New</option>
                                            <option>Used</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label>Brand</label>

                                        <input
                                            type="text"
                                            placeholder="Urban Ladder"
                                            {...register("brand")}
                                        />
                                    </div>

                                    <div>
                                        <label>Material</label>

                                        <input
                                            type="text"
                                            placeholder="Solid Wood"
                                            {...register("material")}
                                        />
                                    </div>

                                </div>

                                <div className="full-width">
                                    <label>Description</label>

                                    <textarea
                                        rows="5"
                                        placeholder="Describe product..."
                                        {...register("description")}
                                    />
                                </div>

                            </div>

                            {/* PRICING */}

                            <div className="card">
                                <h2>Pricing & Availability</h2>

                                <div className="form-grid">

                                    <div>
                                        <label>Rental Price</label>

                                        <input
                                            type="number"
                                            placeholder="1299"
                                            {...register("price")}
                                        />
                                    </div>

                                    <div>
                                        <label>Available Quantity</label>

                                        <input
                                            type="number"
                                            placeholder="5"
                                            {...register("quantity")}
                                        />
                                    </div>

                                    <div>
                                        <label>Security Deposit</label>

                                        <input
                                            type="number"
                                            placeholder="2000"
                                            {...register("securityDeposit")}
                                        />
                                    </div>

                                    <div>
                                        <label>Stock Keeping Unit</label>

                                        <input
                                            type="number"
                                            placeholder="10"
                                            {...register("stockKeepingUnit")}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ADDITIONAL */}

                            <div className="card">
                                <h2>Additional Information</h2>

                                <div className="form-grid">

                                    <div>
                                        <label>Delivery Charge</label>

                                        <input
                                            type="number"
                                            placeholder="300"
                                            {...register("deliveryCharge")}
                                        />
                                    </div>

                                    <div>
                                        <label>Return Policy</label>

                                        <select {...register("returnPolicy")}>
                                            <option>Select Return Policy</option>
                                            <option>7 Days</option>
                                            <option>15 Days</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label>Assembly Required</label>

                                        <select {...register("assemblyRequired")}>
                                            <option>Select Option</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label>Notes</label>

                                        <input
                                            type="text"
                                            placeholder="Additional Notes"
                                            {...register("notes")}
                                        />
                                    </div>
                                </div>

                                <div className="btn-row">
                                    <button className="cancel-btn">
                                        Cancel
                                    </button>

                                    <input type="submit" className="save-btn" value="Add Product" />
                                </div>
                            </div>

                        </div>
                    </form>
                ) : activePage === "manageInventory" ? (
                    <div>
                        <h2>Manage Inventory</h2>

                        <div className="card">
                            <div className="card-header">
                                <h2>Products</h2>
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Condition</th>
                                        <th>Material</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Return Policy</th>
                                        <th>Assembly Required</th>
                                        <th>Delivery Charge</th>
                                        <th>Description</th>
                                        <th>Security Deposit</th>
                                        <th>Stock Keeping Unit</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>

                                            <td>{item.brand}</td>

                                            <td>{item.condition}</td>

                                            <td>{item.material}</td>

                                            <td>{item.price}</td>

                                            <td>{item.quantity}</td>

                                            <td>{item.returnPolicy}</td>

                                            <td>{item.assemblyRequired}</td>

                                            <td>{item.deliveryCharge}</td>

                                            <td>{item.description}</td>

                                            <td>{item.securityDeposit}</td>

                                            <td>{item.stockKeepingUnit}</td>

                                            <td>{item.notes}</td>

                                            <td><FaEye /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : activePage === "rentals" ? (
                    <div>Rentals</div>
                ) : activePage === "deliveries" ? (
                    <div>Deliveries</div>
                ) : activePage === "reviews" && (
                    <div>Reviews</div>
                )}
            </main>
        </div>
    );
};

export default VendorDashboard;