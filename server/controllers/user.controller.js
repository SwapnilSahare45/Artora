const validator = require("validator");
const User = require("../models/user.model");
const generateToken = require("../util/generateToken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'invalid email format' });
        }

        // Validate password strength
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password
        });

        // Generate token and set cookie
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const user = await User.findOne({ email }); // Find user by email

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate token and set cookie
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}