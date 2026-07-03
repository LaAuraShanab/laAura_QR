const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const {
    register,
    login
} = require("../controllers/authController");

// Limit auth attempts to mitigate brute-force attacks
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: { message: 'Too many auth attempts, please try again later.' }
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

module.exports = router;