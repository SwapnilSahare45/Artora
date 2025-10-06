const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

const adminProtect = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};

module.exports = { protect, adminProtect };