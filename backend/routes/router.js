const express = require("express")
const app = express()
const router = express.Router()
const controller = require("../controller/usercontroller.js")
const multer = require("multer")
const path = require("path");

router.post("/add-user", controller.addUser)

router.post("/add-product", controller.addProduct)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 200 * 1024 * 1024 }
});
router.post('/save-product-images', upload.array('image', 10), (req, res) => {
    console.log("req.files = ", req.files)

    if (!req.files) {
        return res.send('No file uploaded.');
    }
    let filesName = req.files.map((file) => file.filename)
    res.json(filesName);
});

router.get("/get-products", controller.getProducts)

router.post("/login-user", controller.loginUser)

router.post("/add-rental-item", controller.addRentalItems)

router.post("/my-rental-items", controller.myRentalItems)

router.post("/search-products", controller.searchProducts)

router.get("/all-rentals", controller.allRentals)

router.post("/deliver-item", controller.deliverItem)

router.post("/create-test-payment-link", controller.createTestPaymentLink)

module.exports = router