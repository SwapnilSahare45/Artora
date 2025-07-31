const Notification = require("../models/notification.model");

exports.getNotifications = async (req, res) => {
    try {
        const notification = await Notification.find().sort({ createdAt: -1 });
        res.status(200).json({ notification });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};