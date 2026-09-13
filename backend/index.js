require("dotenv").config();

const connection = require("./connection/database.js");
const express = require("express");
const cors = require("cors");
const router = require("./routes/router.js");
const path = require("path");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://rental-project-opal.vercel.app",
    "https://rental-project-db6r1dhxd-geniushits-projects.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }

    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.use(router);

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});