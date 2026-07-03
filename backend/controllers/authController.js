const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isStrongPassword = (pw) => {
    // Minimum eight characters, at least one letter and one number
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(pw);
};

const getSaltRounds = () => {
    const v = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    return Number.isInteger(v) && v > 0 ? v : 12;
};

const register = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        if (typeof username !== 'string' || username.trim().length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters" });
        }

        if (!isStrongPassword(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters and include letters and numbers" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, getSaltRounds());

        const user = await User.create({
            username: username.trim(),
            password: hashedPassword
        });

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
};

const login = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET not configured');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const expiresIn = process.env.JWT_EXPIRES || '1h';

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn });

        // Optionally send token as httpOnly cookie if enabled (safer for browsers)
        if (process.env.SEND_TOKEN_AS_COOKIE === 'true') {
            const cookieMaxAge = parseInt(process.env.JWT_COOKIE_MAX_AGE_MS, 10) || 60 * 60 * 1000; // default 1 hour
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: cookieMaxAge
            });
        }

        res.json({ token });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Login failed"
        });
    }
};

module.exports = {
    register,
    login
};