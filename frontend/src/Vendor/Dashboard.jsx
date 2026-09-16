'use client';
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form"
import {
    FaCouch,
    FaClipboardList,
    FaTruck,
    FaPlus,
} from "react-icons/fa";
import "../Style/VendorDashboardStyle.css";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"
import { MdDelete } from "react-icons/md";

const VendorDashboard = () => {
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:8000"
            : "https://rental-project-backend.vercel.app";

    console.log("API_URL : ", API_URL)

    const [activePage, setActivePage] = React.useState("dashboard");
    const browseInput = useRef()
    const { register, handleSubmit } = useForm()
    const [images, setImages] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    const [rentalProducts, setRentalProducts] = useState([])
    const [products, setProducts] = useState([])
    const [allRentals, setAllRentals] = useState([])
    const [showMessage, setShowMessage] = useState(false)
    const [deliveryStatus, setDeliveryStatus] = useState([])
    const [availableProducts, setAvailableProducts] = useState(0)
    const [message, setMessage] = useState("")

    const browseFiles = (e) => {
        let images2 = browseInput.current.files;

        for (let image of images2) {
            setImages(prevImages => [...prevImages, image["name"]])
            let imgUrl = URL.createObjectURL(image)
            setImageUrls(prevImgUrls => [...prevImgUrls, imgUrl])
        }
    }

    const submit = async (data) => {
        let formData = new FormData();
        for (let img of browseInput.current.files) {
            formData.append("image", img)
        }
        const saveImages = await fetch(`${API_URL}/save-product-images`, {
            method: "POST",
            body: formData,
        })
        const saveImagesName = await saveImages.json()

        let data2 = { ...data, imageNames: saveImagesName }
        const result = await fetch(`${API_URL}/add-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data2)
        })

        setShowMessage(true)
        setMessage("Product added.")
    }

    const getRentalProducts = async () => {
        const rp = await fetch(`${API_URL}/all-rentals`)
        const result = await rp.json()
        setRentalProducts(result)
    }

    const getProducts = async () => {
        const response = await fetch(`${API_URL}/get-products`)
        const result = await response.json()
        setProducts(result)
    }

    const getAllRentals = async () => {
        const response = await fetch(`${API_URL}/all-rentals`)
        const result = await response.json()
        setAllRentals(result)
    }

    useEffect(() => {
        getRentalProducts()
        getProducts()
        getAllRentals()
        getDeliveryStatus()
    }, [])

    const deliverItem = async (item) => {
        const response = await fetch(`${API_URL}/deliver-item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })

        setShowMessage(true)
        setMessage("Request sent for delivery.")
    }

    const saveInventory = async () => {
        const saveApi = await fetch(`${API_URL}/update-inventory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(products)
        })

        setShowMessage(true)
        setMessage("Inventory saved.")
    }

    const getDeliveryStatus = async () => {
        const items = await fetch(`${API_URL}/items-delivery-status`)
        const result = await items.json()
        setDeliveryStatus(result)
    }

    useEffect(() => {
        products.length > 0 && products.map((prod) => {
            setAvailableProducts((prev) => Number(prev + prod.quantity))
        })
    }, [products])

    const deleteProduct = async (id) => {
        try {
            const deleteProd = await fetch(`${API_URL}/delete-product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: id
                })
            })

            if (!deleteProd.ok) {
                throw new Error("Unable to delete item.");
            }

            setShowMessage(true)
            setMessage("Product deleted.")
        }
        catch (err) {
            console.log(err)
            setShowMessage(true)
            setMessage("Unable to delete product.")
        }
    }

    return (
        <div className="vendor-dashboard">
            <aside className="sidebar">
                <Link to="/" className="logoLink"> <h2 className="logo"><img src={Logo} className="" width="200px" /></h2> </Link>

                <ul>
                    <li
                        className={activePage === "dashboard" ? "active" : ""}
                        onClick={() => setActivePage("dashboard")}
                    >
                        Dashboard
                    </li>

                    <li
                        className={activePage === "manageInventory" ? "active" : ""}
                        onClick={() => setActivePage("manageInventory")}
                    >
                        Manage Inventory
                    </li>

                    <li
                        className={activePage === "addProduct" ? "active" : ""}
                        onClick={() => setActivePage("addProduct")}
                    >
                        Add Product
                    </li>

                    <li
                        className={activePage === "rentals" ? "active" : ""}
                        onClick={() => setActivePage("rentals")}
                    >
                        Rentals
                    </li>

                    <li
                        className={activePage === "deliveries" ? "active" : ""}
                        onClick={() => setActivePage("deliveries")}
                    >
                        Deliveries
                    </li>
                </ul>
            </aside>

            <main className="dashboard-content">

                {activePage === "dashboard" ? (
                    <>
                        <div className="topbar">
                            <div>
                                <h2>Welcome Back Vendor</h2>
                                <p>Here's what's happening today.</p>
                            </div>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <FaTruck className="stat-icon" />
                                <h3>Available Quantity</h3>
                                <h2>{availableProducts}</h2>
                            </div>

                            <div className="stat-card">
                                <FaCouch className="stat-icon" />
                                <h3>Total Rentals</h3>
                                <h2>{rentalProducts?.length}</h2>
                            </div>

                            <div className="stat-card">
                                <FaClipboardList className="stat-icon" />
                                <h3>Pending Orders</h3>
                                <h2>{deliveryStatus?.pending?.length}</h2>
                            </div>

                            <div className="stat-card">
                                <FaTruck className="stat-icon" />
                                <h3>Delivered</h3>
                                <h2>{deliveryStatus?.delivered?.length}</h2>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h2>Recent Rentals</h2>
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
                                        <th>Return <br /> Policy</th>
                                        <th>Assembly <br /> Required</th>
                                        <th>Delivery <br /> Charge</th>
                                        <th>Description</th>
                                        <th>Notes</th>
                                        <th>Rent <br /> Days</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {(allRentals.slice(0, 3)).map((item, index) => (
                                        <tr key={index}>

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

                                            <td>{item.notes}</td>

                                            <td>{item.rentDays}</td>

                                            <td>{item.user.email}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>

                ) : activePage === "addProduct" ? (

                    <form onSubmit={handleSubmit(submit)} method="POST" encType="multipart/form-data">
                        <div className="add-product-page">
                            <div className="page-header">
                                <h1>Add Product</h1>
                                <p>Dashboard &gt; Inventory &gt; Add Product</p>
                            </div>

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

                                        <select {...register("category")}>
                                            <option value="">Select Category</option>
                                            <option value="sofa">Sofa</option>
                                            <option value="bed">Bed</option>
                                            <option value="chair">Chair</option>
                                            <option value="table">Table</option>
                                            <option value="tv">TV</option>
                                            <option value="fridge">Fridge</option>
                                            <option value="washing-machine">Washing Machine</option>
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
                                </div>
                            </div>

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
                            </div>
                        </div>

                        <div className="btn-row">
                            <input type="submit" className="save-btn" value="Add Product" />
                        </div>
                    </form>
                ) : activePage === "manageInventory" ? (
                    <div>
                        <h2>Manage Inventory</h2>

                        <div className="card">
                            <div className="card-header">
                                <h3>Products</h3>
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
                                        <th>Return <br /> Policy</th>
                                        <th>Assembly <br /> Required</th>
                                        <th>Delivery <br /> Charge</th>
                                        <th>Description</th>
                                        <th>Notes</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((item, index) => (
                                        <tr key={index}>
                                            <td><input type="text" className="inventoryInput" value={item.name} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, name: updatedValue } : prod
                                                        )
                                                    );
                                                }
                                            } /></td>

                                            <td><input type="text" className="inventoryInput" value={item.brand} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, brand: updatedValue } : prod
                                                        )
                                                    );
                                                }
                                            } /></td>

                                            <td><select className="inventoryInput" value={item.condition} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, condition: updatedValue } : prod
                                                        )
                                                    );
                                                }} >
                                                <option value="Used">Used</option>
                                                <option value="New">New</option>
                                            </select></td>

                                            <td><input type="text" className="inventoryInput" value={item.material} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, material: updatedValue } : prod
                                                        )
                                                    );
                                                }
                                            } /></td>

                                            <td><input type="text" className="inventoryInput" value={item.price} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, price: updatedValue } : prod
                                                        )
                                                    );
                                                }
                                            } /></td>

                                            <td><input type="text" className="inventoryInput" value={item.quantity} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, quantity: updatedValue } : prod
                                                        )
                                                    );
                                                }
                                            } /></td>

                                            <td><input type="text" className="inventoryInput" value={item.returnPolicy} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, returnPolicy: updatedValue } : prod
                                                        )
                                                    );
                                                }} /></td>

                                            <td><select type="text" className="inventoryInput" value={item.assemblyRequired} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, assemblyRequired: updatedValue } : prod
                                                        )
                                                    );
                                                }}>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select></td>

                                            <td><input type="text" className="inventoryInput" value={item.deliveryCharge} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, deliveryCharge: updatedValue } : prod
                                                        )
                                                    );
                                                }} /></td>

                                            <td><input type="text" className="inventoryInput" value={item.description} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, description: updatedValue } : prod
                                                        )
                                                    );
                                                }} /></td>

                                            <td><input type="text" className="inventoryInput" value={item.notes} onChange={
                                                (e) => {
                                                    const updatedValue = e.target.value;
                                                    setProducts((prevProducts) =>
                                                        prevProducts.map((prod, i) =>
                                                            i === index ? { ...prod, notes: updatedValue } : prod
                                                        )
                                                    );
                                                }
                                            } /></td>

                                            <td className="deleteProduct" onClick={() => deleteProduct(item?._id)}>
                                                <MdDelete />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <br />
                        </div>

                        <div>
                            <button className="inventorySave" onClick={saveInventory}>Save</button>
                        </div>
                    </div>
                ) : activePage === "rentals" ? (
                    <div>
                        <h2>Rentals</h2>

                        <div className="card">
                            <div className="card-header">
                                <h3>Products</h3>
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
                                        <th>Return <br /> Policy</th>
                                        <th>Assembly <br /> Required</th>
                                        <th>Delivery <br /> Charge</th>
                                        <th>Description</th>
                                        <th>Notes</th>
                                        <th>Rent <br /> Days</th>
                                        <th>User <br /> Name</th>
                                        <th>Action</th>
                                        { }
                                    </tr>
                                </thead>

                                <tbody>
                                    {allRentals.map((item, index) => (
                                        <tr key={index}>

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

                                            <td>{item.notes}</td>

                                            <td>{item.rentDays}</td>

                                            <td>{item.user.name}</td>

                                            <td>
                                                {
                                                    item?.deliveryStatus === "PENDING" ?
                                                        <button className="deliverBtn" onClick={() => deliverItem(item)}>Deliver Item</button> : `Delivered`}
                                            </td>

                                            { }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : activePage === "deliveries" && (
                    <div>
                        <h2>Deliveries</h2>

                        <div className="card">
                            <div className="card-header">
                                <h3>Products</h3>
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
                                        <th>Return <br /> Policy</th>
                                        <th>Assembly <br /> Required</th>
                                        <th>Delivery <br /> Charge</th>
                                        <th>Description</th>
                                        <th>Notes</th>
                                        <th>Rent<br /> Days</th>
                                        <th>User<br /> Name</th>
                                        <th>Rented <br /> Date</th>
                                        <th>Delivery <br /> Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {deliveryStatus.delivered.map((item, index) => (
                                        <tr key={index}>

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

                                            <td>{item.notes}</td>

                                            <td>{item.rentDays}</td>

                                            <td>{item.user.name}</td>

                                            <td>{item.rentedDate}</td>

                                            <td>{item.deliveryStatus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {showMessage === true
                &&
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Message</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                    setShowMessage(false)
                                    getRentalProducts()
                                    getProducts()
                                    getAllRentals()
                                    getDeliveryStatus()
                                }}></button>
                            </div>
                            <div className="modal-body">
                                <p>{message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                                    setShowMessage(false)
                                    getRentalProducts()
                                    getProducts()
                                    getAllRentals()
                                    getDeliveryStatus()
                                }}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default VendorDashboard;