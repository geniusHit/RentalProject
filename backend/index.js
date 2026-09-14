require("dotenv").config();

const connection = require("./connection/database.js");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const router = require("./routes/router.js");

const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://rental-project-94ezx9uff-geniushits-projects.vercel.app",
        "https://rental-project-backend.vercel.app",
        "https://rental-project.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors());
// app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Rental backend is working"
    });
});

app.use("/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use("/", router);

module.exports = app;

// const port = process.env.PORT || 8000;

// app.listen(port, () => {
//     console.log(`App is listening at port ${port}`);
// });