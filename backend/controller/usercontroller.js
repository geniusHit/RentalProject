const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET
const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs")

const users = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    pincode: {
        type: Number
    },
    address: {
        type: String
    },
})
const usersModel = mongoose.model("users", users)
exports.sendSignupOtp = async (req, res) => {
    try {
        let a = Math.random()
        a = Math.ceil(a * 999999)

        const auth = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: "rohitthakur792002@gmail.com",
                pass: "omzd rsxw zwql xvrb"
            }
        })

        const receiver = {
            from: "rohitthakur792002@gmail.com",
            to: `${req.body?.email}`,
            subject: `Team Rental Items. Signup otp.`,
            html: `Your Otp is ${a}`
        }

        auth.sendMail(receiver, (error, emailResponse) => {
            if (error) {
                throw error;
                return;
            }
            console.log("success!")
            res.status(200).json({ signup_otp: a })
        })
    }
    catch (err) {
        res.status(400).json({ success: false, message: `Unable to send signup otp. ${err.message}` })
    }
}

exports.addUser = async (req, res) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        const user = await new usersModel({ ...req.body, password: hashedPassword })
        const result = await user.save();

        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json({ success: false, message: `Unable to add user. ${err.message}` })
    }
}

const products = mongoose.Schema({
    imageNames: {
        type: [String]
    },
    name: {
        type: String
    },
    sku: {
        type: String
    },
    category: {
        type: String
    },
    condition: {
        type: String
    },
    brand: {
        type: String
    },
    material: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    deliveryCharge: {
        type: Number
    },
    returnPolicy: {
        type: String
    },
    assemblyRequired: {
        type: String
    },
    notes: {
        type: String
    }
})
const productsModel = mongoose.model("product", products)
exports.addProduct = async (req, res) => {
    try {
        const product = await new productsModel(req.body)
        const result = await product.save()

        res.status(200).json({
            success: true
        })
    }
    catch (err) {
        res.status(200).json({ success: false, message: `Unable to add product. ${err.message}` })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const result = await productsModel.find({})
        res.status(200).json(result)
    }
    catch (err) {
        res.status(200).json({ success: false, message: `Unable to get products. ${err.message}` })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password, expiry, IP } = req.body;
        const deletePreviousLogins = await loggedUsersModel.deleteMany({ IP: IP })

        const user = await usersModel.findOne({ email: email })
        if (user?.email) {
            const match = await bcrypt.compare(password, user?.password)

            if (match === true) {
                const newLoggedUser = await new loggedUsersModel({ email: email, IP: IP, expiry: expiry })
                await newLoggedUser.save()

                res.send({ ...user, success: true })
            }
            else {
                res.json({ success: false, message: "Incorrect password." })
            }
        }
    }
    catch (err) {
        return res.status(400).json({ success: false, message: `Unable to login. ${err.message}` })
    }
}

const rentalItemsSchema = mongoose.Schema({
    user: {
        name: { type: String },
        email: { type: String },
        pincode: { type: String },
        address: { type: String },
    },

    name: {
        type: String
    },

    imageNames: {
        type: [String]
    },

    productName: {
        type: String
    },

    sku: {
        type: String
    },

    condition: {
        type: String
    },

    brand: {
        type: String
    },

    material: {
        type: String
    },

    description: {
        type: String
    },

    price: {
        type: Number
    },

    quantity: {
        type: Number
    },

    deliveryCharge: {
        type: Number
    },

    returnPolicy: {
        type: String
    },

    assemblyRequired: {
        type: String
    },

    notes: {
        type: String
    },

    rentDays: {
        type: Number,
        default: 5,
    },

    rentedDate: {
        type: String
    },

    deliveryStatus: {
        type: String,
        default: "PENDING"
    }
})
const rentalItems = mongoose.model("rentalItems", rentalItemsSchema)
exports.addRentalItems = async (req, res) => {
    try {
        const { email, name, userName, sku, quantity } = req.body;
        const user = await usersModel.findOne({ email: email })
        const existingProduct = await rentalItems.findOne({ "user.email": email, "user.name": userName, name: name });
        if (existingProduct) {
            res.send({ message: "Product is already in Rental Items!" });
            return;
        }

        let expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);
        const data = req.body;
        const data2 = {
            name: data.name,
            imageNames: data.imageNames,
            sku: data.sku,
            condition: data.condition,
            brand: data.brand,
            material: data.material,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            deliveryCharge: data.deliveryCharge,
            returnPolicy: data.returnPolicy,
            assemblyRequired: data.assemblyRequired,
            notes: data.notes,
            rentDays: data.rentDays,
            rentedDate: new Date(),
            deliveryStatus: "PENDING",
        }
        const item = new rentalItems({
            ...data2, user: {
                name: userName,
                email: email,
                pincode: user.pincode,
                address: user.address
            }
        })
        const result = await item.save()

        const updateQuantity = await productsModel.findOneAndUpdate({ sku: sku }, { quantity: (quantity - 1) })

        res.json({ message: "Product added to Rental Items" })
    }
    catch (err) {
        res.status(400).json({ success: false, message: `Unable to add rental items. ${err.message}` })
    }
}

exports.myRentalItems = async (req, res) => {
    try {
        const { name, email } = req.body;
        const items = await rentalItems.find({ "user.email": email })

        res.json(items)
    }
    catch (err) {
        res.status(400).json({ success: false, message: `Unable to get my rental items. ${err.message}` })
    }
}

exports.allRentals = async (req, res) => {
    try {
        const allR = await rentalItems.find({})
        res.send(allR)
    }
    catch (err) {
        res.status(400).json({ success: false, message: `Unable to get rental items. ${err.message}` })
    }
}

exports.searchProducts = async (req, res) => {
    try {
        const searchKey = req.body.search;
        const products = await productsModel.find({
            $or: [
                { name: { $regex: `${searchKey}`, $options: 'i' } },
                { brand: { $regex: `${searchKey}`, $options: 'i' } },
                { condition: { $regex: `${searchKey}`, $options: 'i' } },
                { description: { $regex: `${searchKey}`, $options: 'i' } },
                { notes: { $regex: `${searchKey}`, $options: 'i' } },
                { category: { $regex: `${searchKey}`, $options: 'i' } },
            ]
        });

        res.send(products)
    }
    catch (err) {
        res.status(400).json({ success: false, message: `Unable to search products. ${err.message}` })
    }
}

exports.deliverItem = async (req, res) => {
    try {
        const { name, email, city, address } = req.body.user;
        const data = req.body
        const updatedData = { ...data, deliveryStatus: "DELIVERED" }

        const updateRentalItems = await rentalItems.findByIdAndUpdate(data._id,
            { $set: updatedData }
        )

        const auth = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: "rohitthakur792002@gmail.com",
                pass: "omzd rsxw zwql xvrb"
            }
        })
        const receiver = {
            from: "rohitthakur792002@gmail.com",
            to: `${email}`,
            subject: `Team Rental Items. Item ${req.body.name} has been shipped to your provided address.`,
            html: `<b>Hello</b> ${name}. Your ordered item ${req.body.name} has been shipped to your provided address ${address}. It will be delived in 5 days.`
        }

        auth.sendMail(receiver, (error, emailResponse) => {
            if (error)
                throw error;
            console.log("success!")
            res.end()
        })

        res.end()
    }
    catch (err) {
        res.status(400).json({ success: false, message: `Item not delivered. ${err.message}` })
    }
}

exports.createTestPaymentLink = async (req, res) => {
    try {
        const url = "https://sandbox.cashfree.com/pg/links";
        const linkId = `link_${Date.now()}`;
        const { email, } = req.body;
        const user = await usersModel.findOne({ email: email })

        const payload = {
            link_id: linkId,
            link_amount: Number(req.body.price),
            link_currency: "INR",
            link_purpose: "Test payment for project",
            customer_details: {
                customer_phone: `1234567890`,
                customer_email: `${user?.email}`,
                customer_name: `${user?.name}`
            },
            link_notify: {
                send_sms: false,
                send_email: false
            },
            link_meta: {
                return_url: `https://rental-project-opal.vercel.app/catalog`,
                // return_url: `http://localhost:5173/catalog`
            }
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-version": "2023-08-01",
                "x-client-id": process.env.CASHFREE_CLIENT_ID,
                "x-client-secret": process.env.CASHFREE_SECRET_KEY
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const token = jwt.sign({ ...req.body, link_id: data.link_id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.send({ ...data, payment_token: token })
    }
    catch (err) {
        res.status(400).json({ success: false, message: `Unable to create payment link. ${err.message}` })
    }
}

exports.verifyPaymentLink = async (req, res) => {
    try {
        const { link_id } = req.body;
        const url = `https://sandbox.cashfree.com/pg/links/${link_id}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-api-version": "2023-08-01",
                "x-client-id": process.env.CASHFREE_CLIENT_ID,
                "x-client-secret": process.env.CASHFREE_SECRET_KEY,
            },
        });

        const data = await response.json();

        res.json(data)
    } catch (error) {
        return res.status(500).json({ success: false, message: `Unable to verify payment. ${error.message}` });
    }
};

exports.updateInventory = async (req, res) => {
    try {
        const data = req.body;
        data.map(async (product, index) => {
            const { _id, ...updateData } = product;
            const updatedProduct = await productsModel.findByIdAndUpdate(
                _id,
                { $set: updateData },
            );
        })

        res.json({ message: "Inventory has been updated." })
    }
    catch (err) {
        return res.status(400).json({ success: false, message: `Unable to update inventory. ${err.message}` })
    }
}

exports.itemsDeliveryStatus = async (req, res) => {
    try {
        const pending = await rentalItems.find({ deliveryStatus: "PENDING" })
        const delivered = await rentalItems.find({ deliveryStatus: "DELIVERED" });
        res.json({ pending: pending, delivered: delivered })
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message })
    }
}

const loggedUsers = mongoose.Schema({
    email: {
        type: String,
    },
    IP: {
        type: String,
    },
    expiry: {
        type: Date
    }
})
const loggedUsersModel = mongoose.model("loggedUsers", loggedUsers)

exports.getLoginUser = async (req, res) => {
    try {
        const loggedUser = await loggedUsersModel.findOne({ IP: req.body.IP })
        const user = loggedUser !== null && await usersModel.findOne({ email: loggedUser.email })

        res.send({ loggedUser: loggedUser, user: user })
    }
    catch (err) {
        return res.status(400).json({ success: false, message: `Unable to get login user. ${err.message}` })
    }
}


const paymentToken = mongoose.Schema({
    payment_token: {
        type: String,
    }
})
const paymentTokenModel = mongoose.model("paymentToken", paymentToken)
exports.savePaymentToken = async (req, res) => {
    try {
        const token = await new paymentTokenModel(req.body)
        await token.save()

        res.send("Payment token saved successfully.")
    }
    catch (err) {
        return res.status(400).json({ success: false, message: `Unable to save payment token. ${err.message}` })
    }
}

exports.getPaymentToken = async (req, res) => {
    try {
        const token = await paymentTokenModel.find({})
        res.json(token)
    }
    catch (err) {
        return res.status(400).json({ success: false, message: `Unable to get payment token. ${err.message}` })
    }
}

exports.deletePaymentToken = async (req, res) => {
    try {
        const deleteToken = await paymentTokenModel.deleteMany({})
        res.send(deleteToken)
    }
    catch (err) {
        return res.status(400).json({ success: false, message: `Unable to delete item. ${err.message}` })
    }
}

exports.logout = async (req, res) => {
    try {
        const logout = await loggedUsersModel.deleteMany({ IP: req.body.IP })
        res.send(logout)
    }
    catch (err) {
        return res.status(400).json({ success: false, message: "Unable to logout" })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const deleteProd = await productsModel.findByIdAndDelete(req.body._id)
        res.send(deleteProd)
    }
    catch (err) {
        return res.status(400).json({ success: false, message: "Unable to delete item." })
    }
}

const adminSchema = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
})
const adminModel = mongoose.model("admin", adminSchema)
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email: email, password: password })

        if (admin?.email) {
            res.json({ ...admin, success: true })
        }
        else {
            res.json({ success: false })
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: `Unable to login. ${err}` })
    }
}