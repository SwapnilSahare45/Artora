const validator = require("validator");
const User = require("../models/user.model");
const generateToken = require("../util/generateToken");
const bcrypt = require("bcryptjs");
const Otp = require("../models/otp.model");
const { sendOTP } = require("../util/mailer");
const cloudinary = require("../util/cloudinary.config");

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

        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUser) {
            // User exists but not verified
            existingUser.password = password,
                await existingUser.save();
            await Otp.create({ email, code: otpCode }); // Save OTP in database
        } else {
            // If user not exists then create new user
            await User.create({
                name,
                email,
                password,
            });
            await Otp.create({ email, code: otpCode }); // Save OTP in database
        }

        // Send OTP to user's email
        await sendOTP(email, otpCode);

        res.status(201).json({ message: "OTP sent to email. Please verify.", email });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.verifyOtp = async (req, res) => {
    const { email, code } = req.body;

    // Find OTP document matching the provided email and code
    const validOtp = await Otp.findOne({ email, code });
    if (!validOtp) return res.status(400).json({ message: "Invalid or expired OTP" });

    await User.findOneAndUpdate({ email }, { isVerified: true });
    await Otp.deleteMany({ email }); // Clear old OTPs

    res.json({ message: "Email verified successfully" });
};

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

        // Check user email is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email via otp before logging in." });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
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

exports.getMe = async (req, res) => {
    try {
        // get user data from middleware directly
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.updateMe = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, bio } = req.body || {};
        let avatarUrl = req.user.avatar;

        // Check if there is anything to update
        if (!name && !bio && !req.file) {
            return res.status(400).json({ message: 'No update fields provided' });
        }

        // If new avatar is upload
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'artora-avatar' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });
            avatarUrl = result.secure_url;
        }

        const updatedMe = await User.findByIdAndUpdate(
            userId,
            {
                name: name || req.user.name,
                bio: bio || req.user.bio,
                avatar: avatarUrl
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Profile updated successfully",
            updatedMe,
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.logout = (req, res) => {
    // clear cookie when user logout
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ message: "Logged out successfully" });
};