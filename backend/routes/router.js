const express = require("express")
const router = express.Router()
const controller = require("../controller/usercontroller.js")
const multer = require("multer")
const path = require("path");
const mongoose = require('mongoose');

router.post("/add-product", controller.addProduct)

const ProductImageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    filename: String,
    createdAt: { type: Date, default: Date.now }
});
const ProductImage = mongoose.model('ProductImage', ProductImageSchema);
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 200 * 1024 * 1024 }
});
router.post('/save-product-images', upload.array('image', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const savedImages = await Promise.all(
            req.files.map((file) => {
                const newImage = new ProductImage({
                    data: file.buffer,
                    contentType: file.mimetype,
                    filename: file.originalname
                });
                return newImage.save();
            })
        );

        const imageUrls = savedImages.map(
            (img) => `${img._id}`
        );

        res.json(imageUrls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save image to MongoDB' });
    }
});

router.post("/add-user", controller.addUser)

router.post("/send-signup-otp", controller.sendSignupOtp)

router.get("/get-products", controller.getProducts)

router.post("/login-user", controller.loginUser)

router.post("/add-rental-item", controller.addRentalItems)

router.post("/my-rental-items", controller.myRentalItems)

router.post("/search-products", controller.searchProducts)

router.get("/all-rentals", controller.allRentals)

router.post("/deliver-item", controller.deliverItem)

router.post("/create-test-payment-link", controller.createTestPaymentLink)

router.post("/verify-payment-link", controller.verifyPaymentLink)

router.post("/update-inventory", controller.updateInventory)

router.get("/items-delivery-status", controller.itemsDeliveryStatus)

router.post("/get-login-user", controller.getLoginUser)

router.post("/save-payment-token", controller.savePaymentToken)

router.get("/get-payment-token", controller.getPaymentToken)

router.get("/delete-payment-token", controller.deletePaymentToken)

router.post("/logout", controller.logout)

router.post("/delete-product", controller.deleteProduct)

router.post("/login-admin", controller.loginAdmin)

router.post('/images', async (req, res) => {
    try {
        const { image_ids } = req.body;
        const image = await ProductImage.find({_id: { $in: image_ids.map(id => new mongoose.Types.ObjectId(id))}});
        if (!image) {
            return res.status(404).send('Image not found');
        }

        res.set('Content-Type', image.contentType);
        res.set('Cache-Control', 'public, max-age=31536000');
        res.send(image);
    } catch (err) {
        res.status(500).send({success: false, message: 'Error retrieving image'});
    }
});

module.exports = router