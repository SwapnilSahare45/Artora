const Feedback = require("../models/feedback.model");

exports.giveFeedback = async (req, res) => {
    try {
        const user = req.user.id;
        const { rating, msg } = req.body;

        if (!rating || !msg) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const feedback = await Feedback.create({
            user,
            rating,
            msg,
        });

        res.status(201).json({
            message: "Feedback send successfully",
            feedback,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        if (!feedbacks) return res.status(404).json({ message: "Feedback not found" });

        res.status(200).json({feedbacks});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}