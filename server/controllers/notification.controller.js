const Notification = require("../models/notification.model");

exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({
            $or: [
                { type: "auction" }, // global notifications
                { user: userId, type: { $ne: "auction" } } // user-specific non-auction
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
