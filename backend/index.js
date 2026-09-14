require("dotenv").config();

const connection = require("./connection/database.js");
const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./routes/router.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use("/", router);

module.exports = app;

// const port = process.env.PORT || 8000;

// app.listen(port, () => {
//     console.log(`App is listening at port ${port}`);
// });