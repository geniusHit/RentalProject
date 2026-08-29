const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET
const nodemailer = require("nodemailer")

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
    city: {
        type: String
    },
    address: {
        type: String
    }
})
const usersModel = mongoose.model("users", users)
exports.addUser = async (req, res) => {
    const user = await new usersModel(req.body)
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
    }
})
const productsModel = mongoose.model("product", products)
exports.addProduct = async (req, res) => {
    console.log("req.body = ", req.body)
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
    console.log("req.body from loginUser = ", req.body)
    const user = await usersModel.findOne({ password: req.body.password, email: req.body.email })
    console.log("user from loginUser : ", user)
    const token = jwt.sign({ name: user.name, email: user.email, phone: user.phone, password: user.password, city: user.city, address: user.address }, SECRET, { expiresIn: "1h" })
    console.log("JWT Token : ", token)
    const decodedToken = jwt.verify(token, SECRET)
    console.log("decodedToken = ", decodedToken)

    res.send({ ...user, jwtToken: token })
}

const rentalItemsSchema = mongoose.Schema({
    user: {
        name: { type: String },
        email: { type: String },
        city: { type: String },
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
})
const rentalItems = mongoose.model("rentalItems", rentalItemsSchema)
exports.addRentalItems = async (req, res) => {
    console.log("req.body from addRentalItems = ", req.body)
    const { email, name, userName } = req.body;
    const user = await usersModel.findOne({ email: email })
    console.log("user : ", user)
    const existingProduct = await rentalItems.findOne({ email: email, userName: userName, name: name });
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
    }
    const item = new rentalItems({
        ...data2, user: {
            name: userName,
            email: email,
            city: user.city,
            address: user.address
        }, expireAt: expiryDate
    })
    console.log("rental item : ", item)
    const result = await item.save()

    res.send({ message: "Product added to Rental Items" })
}

exports.myRentalItems = async (req, res) => {
    console.log("req.body from myRentalItems : ", req.body)
    const { name, email } = req.body;
    const items = await rentalItems.find({ "user.name": name, "user.email": email })
    console.log("items from myRentalItems : ", items)

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
            { notes: { $regex: `${searchKey}`, $options: 'i' } }
        ]
    });

    res.send(products)
}

exports.deliverItem = async (req, res) => {
    console.log("req.body from deliverItem : ", req.body)
    const { name, email, city, address } = req.body.user

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
    console.log("req.body from createTestPaymentLink : ", req.body)
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
            customer_phone: "9999999999",
            customer_email: `${user.email}`,
            customer_name: `${user.name}`
        },
        link_notify: {
            send_sms: false,
            send_email: false
        },
        link_meta: {
            return_url: `http://localhost:5173/catalog`
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
    console.log("Response:", data);
    console.log("Payment Link URL:", data.link_url);
    const token = jwt.sign({ ...req.body, link_id: data.link_id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    console.log("payment jwt token : ", token)

    res.send({...data, payment_token: token})
}

exports.verifyPaymentLink = async (req, res) => {
    try {
        const { link_id } = req.body;
        console.log("req.body from verifyPaymentLink : ", req.body)
        console.log("link_id from verifyPaymentLink : ", link_id)
        console.log("req.body from verifyPaymentLink : ", req.body)
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
        console.log("data from verifyPaymentLink : ", data)

        res.send(data)

        // if (data.link_status === "PAID") {
        //   // 1. Update database / order status here
        //   return res.status(200).json({ success: true, status: "PAID", data });
        // } else {
        //   return res.status(400).json({ success: false, status: data.link_status });
        // }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};