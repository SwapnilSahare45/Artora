const Feedback = require("../models/feedback.model");

exports.getThreeFeedback = async (req, res) => {
    try {
        const allFeedbacks = await Feedback.find({ rating: 5 }).populate("user");
        
        // Peek the random three feedback
        const shuffled = allFeedbacks.sort(() => 0.5 - Math.random());
        const randomThree = shuffled.slice(0, 3);

        res.status(200).json(randomThree);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.giveFeedback = async (req, res) => {
    try {
        const user = req.user.id;
        const { rating, feedback } = req.body;

        if (!rating || !feedback) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newFeedback = await Feedback.create({
            user,
            rating,
            feedback,
        });

        res.status(201).json({
            message: "Feedback send successfully",
            newFeedback,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        if (!feedbacks) return res.status(404).json({ message: "Feedback not found" });

        res.status(200).json({ feedbacks });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}