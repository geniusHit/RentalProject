const mongoose = require("mongoose")
const formidable = require("formidable")
const fs = require("fs")
const path = require("path");
const { type } = require("os");
const jwt = require("jsonwebtoken")
const SECRET = "rohit79"

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
})
const usersModel = mongoose.model("users", users)
exports.addUser = async (req, res) => {
    console.log("req.body from addUser = ", req.body)

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
    const token = jwt.sign({name: user.name, email: user.email, phone: user.phone, password: user.password}, SECRET, {expiresIn: "1h"})
    console.log("JWT Token : ", token)
    const decodedToken = jwt.verify(token, SECRET)
    console.log("decodedToken = ", decodedToken)

    res.send({ ...user, jwtToken: token })
}

const rentalItemsSchema = mongoose.Schema({
    userName: {
        type: String
    },

    email: {
        type: String
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
        type: Number
    },
})
const rentalItems = mongoose.model("rentalItems", rentalItemsSchema)
exports.addRentalItems = async (req, res) => {
    console.log("req.body = ", req.body)

    const { email, name, userName } = req.body;
    const existingProduct = await rentalItems.findOne({email: email, userName: userName, name: name});
    console.log("existingProduct = ", existingProduct)
    if(existingProduct)
    {
        res.send({message: "Product is already in Rental Items!"});
        return;
    }

    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate()+1);
    console.log("expiryDate = ", expiryDate)
    const data = req.body;
    const item = new rentalItems({...data, expireAt: expiryDate})
    const result = await item.save()

    res.send({message: "Product added to Rental Items"})
}

exports.myRentalItems = async (req, res) => {
    const items = await rentalItems.find({ userName: req.body.name, email: req.body.email })
    res.send(items)
}

exports.allRentals = async (req, res) => {
    const allR = await rentalItems.find({})
    res.send(allR)
}

exports.searchProducts = async (req, res) => {
    const searchKey = req.body.search;
    // console.log("req.body = ", req.body)
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