require("dotenv").config();
const connection = require("./connection/database.js")
const express = require("express")
const cors = require("cors")
const app = express()
const path = require("path");
const router = require("./routes/router.js")
const port = process.env.PORT

// app.use(cors())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://rental-project-opal.vercel.app"
    ],
    credentials: true
}));
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use("/uploads", express.static("uploads"));

app.listen(port, (req, res) => {
    console.log(`App is listening at port ${port}`)
})