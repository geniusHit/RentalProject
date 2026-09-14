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
    loggedInIPS: [{
        IP: {
            type: String,
        },
        expireAt: {
            type: Date,
        }
    }],
})
const usersModel = mongoose.model("users", users)
// exports.sendSignupOtp = async (req, res) => {
//     let a = Math.random()
//     a = Math.ceil(a * 999999)

//     const auth = nodemailer.createTransport({
//         service: "gmail",
//         secure: true,
//         port: 465,
//         auth: {
//             user: "rohitthakur792002@gmail.com",
//             pass: "pnsg ismb vdou ccax"
//         }
//     })

//     await auth.verify();

//     const receiver = {
//         from: "rohitthakur792002@gmail.com",
//         to: `${req.body?.email}`,
//         subject: `Team Rental Items. Signup otp.`,
//         html: `Your Otp is ${a}`
//     }

//     auth.sendMail(receiver, (error, emailResponse) => {
//         if (error){
//             throw error;
//             return;
//         }
//         console.log("success!")
//         res.send({signup_otp: a})
//     })
// }
const nodemailer = require("nodemailer");
exports.sendSignupOtp = async (req, res) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        await transporter.verify();

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: `${req.body?.email}`,
            subject: "Team Rental Items - Signup OTP",
            html: `
                <h2>Your Signup OTP</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP is valid for a limited time.</p>
            `
        });

        console.log("OTP email sent successfully");

        return res.status(200).json({
            signup_otp: otp
        });

    } catch (error) {
        console.error("Email sending error:", error);

        return res.status(500).json({
            message: "Failed to send OTP",
            error: error.message
        });
    }
};

exports.addUser = async (req, res) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const user = await new usersModel({ ...req.body, password: hashedPassword })
    const result = await user.save();

    res.send(result)
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
    const product = await new productsModel(req.body)
    const result = await product.save()

    res.status(200).json({
        success: true
    })
}

exports.getProducts = async (req, res) => {
    const result = await productsModel.find({})

    res.status(200).json(result)
}

exports.loginUser = async (req, res) => {
    try {
        const user = await usersModel.findOne({ email: req.body.email })
        const match = await bcrypt.compare(req.body.password, user?.password)
        const userId = user._id.toString()
        const currentLogin = await usersModel.findOne({ _id: userId })
        const currentLoginIPS = currentLogin.loggedInIPS;
        const newLoginIPS = currentLoginIPS.filter((el) => el.IP !== req.body.IP)
        const newIPS = [...newLoginIPS, { IP: req.body.IP, expireAt: req.body.expiry }]
        const loginInSystem = await usersModel.findByIdAndUpdate(userId, { loggedInIPS: newIPS })
        const token = jwt.sign({ name: user.name, email: user.email, phone: user.phone, password: user.password, city: user.city, address: user.address }, SECRET, { expiresIn: "1h" })
        const decodedToken = jwt.verify(token, SECRET)

        res.send({ ...user, jwtToken: token })
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message })
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

    securityDeposit: {
        type: Number
    },

    stockKeepingUnit: {
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
        securityDeposit: data.securityDeposit,
        stockKeepingUnit: data.stockKeepingUnit,
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

    const updateQuantity = await productsModel.findOneAndUpdate({sku: sku}, {quantity: (quantity-1)})

    res.send({ message: "Product added to Rental Items" })
}

exports.myRentalItems = async (req, res) => {
    const { name, email } = req.body;
    const items = await rentalItems.find({ "user.email": email })

    res.send(items)
}

exports.allRentals = async (req, res) => {
    const allR = await rentalItems.find({})
    res.send(allR)
}

exports.searchProducts = async (req, res) => {
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

exports.deliverItem = async (req, res) => {
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
            pass: "pnsg ismb vdou ccax"
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

exports.createTestPaymentLink = async (req, res) => {
    console.log("req.body : ", req.body)
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
            return_url: `https://rental-project-sigma.vercel.app/catalog`
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

        res.send(data)
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
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

        res.send({ message: "Inventory has been updated." })
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message })
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
exports.manageLoggedUsers = async (req, res) => {
    try {
        const deleteOldLogins = await loggedUsersModel.deleteMany({ IP: req.body.IP })
        const newLoggedUser = await new loggedUsersModel(req.body)
        await newLoggedUser.save()

        res.send(newLoggedUser)
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message })
    }
}

exports.getLoginUser = async (req, res) => {
    console.log("req.body.IP : ", req.body.IP)
    const loggedUser = await loggedUsersModel.findOne({ IP: req.body.IP })
    console.log("loggedUser : ", loggedUser)
    const user = loggedUser !== null && await usersModel.findOne({ email: loggedUser.email })

    res.send({ loggedUser: loggedUser, user: user })
}


const paymentToken = mongoose.Schema({
    payment_token: {
        type: String,
    }
})
const paymentTokenModel = mongoose.model("paymentToken", paymentToken)
exports.savePaymentToken = async (req, res) => {
    const token = await new paymentTokenModel(req.body)
    await token.save()

    res.send("Payment token saved successfully.")
}

exports.getPaymentToken = async (req, res) => {
    const token = await paymentTokenModel.find({})

    res.send(token)
}

exports.deletePaymentToken = async (req, res) => {
    const deleteToken = await paymentTokenModel.deleteMany({})

    res.send(deleteToken)
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
    try{
        const deleteProd = await productsModel.findByIdAndDelete(req.body._id)
        res.send(deleteProd)
    }
    catch(err){
        return res.status(400).json({ success: false, message: "Unable to delete item." })
    }
}