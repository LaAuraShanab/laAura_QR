require("dotenv").config();// for production, for development use nodemon with --exec "node -r dotenv/config" to load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const path = require("path")
const menuRoutes = require("./routes/MenuRoute");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");

const app = express();

// Basic configuration checks
if (!process.env.JWT_SECRET) {
    console.error("FATAL: JWT_SECRET is not set in environment variables. Exiting.");
    process.exit(1);
}

// Security middlewares
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);
app.use(cookieParser());

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

// Configure CORS: allow origin from env or default to '*'
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use("/api/subcategories", subCategoryRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});