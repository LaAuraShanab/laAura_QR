//require("dotenv").config(); for production, for development use nodemon with --exec "node -r dotenv/config" to load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
const menuRoutes = require("./routes/MenuRoute");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(err => {
        console.error(err);
        console.log("Failed to connect to MongoDB");
    });

app.get("/", (req, res) => {
    res.send("Coffee Menu API Running");
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});