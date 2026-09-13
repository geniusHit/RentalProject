require("dotenv").config();

const connection = require("./connection/database.js");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://rental-project-94ezx9uff-geniushits-projects.vercel.app",
        "https://rental-project-opal.vercel.app",
        "https://rental-project.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser())

const router = require("./routes/router.js");
app.use(router);

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});