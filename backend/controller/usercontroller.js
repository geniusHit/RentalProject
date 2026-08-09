const mongoose = require("mongoose")
const formidable = require("formidable")
const fs = require("fs")
const path = require("path");
const { type } = require("os");

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
    const result = await result.save()

    res.status(200).json({
        success: true
    })
}

exports.getProducts = async (req, res) => {
    const result = await productsModel.find({})

    res.status(200).json(result)
}

exports.loginUser = async (req, res) => {
    console.log("req.body = ", req.body)
    const user = await usersModel.find({password: req.body.password, email: req.body.email})
    
    res.send(user)
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
})
const rentalItems = mongoose.model("rentalItems", rentalItemsSchema)
exports.addRentalItems = async (req, res) => {
    console.log("req.body = ", req.body)

    const item = await new rentalItems(req.body)
    const result = await item.save()

    res.send(result)
}

exports.myRentalItems = async (req, res) => {
    console.log("req.body = ", req.body)

    const items = await rentalItems.find({userName: req.body.name, email: req.body.email})
    res.send(items)
}

exports.check = async (req, res) => {
    const items = await usersModel.find({name: {$regex: "Thakur", $options: "i"}})
    res.send(items)
}