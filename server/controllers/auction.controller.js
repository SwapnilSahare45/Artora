const Auction = require("../models/auction.model");
const Notification = require("../models/notification.model");

const validateDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start.getTime() >= end.getTime()) {
        return "End date and time must be strictly after the start date and time.";
    }

    if (start.getTime() <= now.getTime()) {
        return "Start date and time must be in the future.";
    }
    
    // Check if the dates are valid Date objects
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "Invalid date format provided.";
    }

    return null;
};

exports.createAuction = async (req, res) => {
    try {
        const { title, startDate, endDate } = req.body;

        if (!title || !startDate || !endDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const dateError = validateDates(startDate, endDate);
        if (dateError) {
            return res.status(400).json({ message: dateError });
        }
        
        const auction = await Auction.create({ title, startDate, endDate });

        await Notification.create({
            type: "auction",
            title: `New '${auction.title}' is available. Starts: ${new Date(startDate).toLocaleString()}`,
            message: `New auction created: ${auction.title}`,
        });

        res.status(201).json({ auction });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find();
        if (!auctions || auctions.length === 0) {
            return res.status(404).json({ message: "No auctions found." });
        }

        res.status(200).json({ auctions });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAuction = async (req, res) => {
    try {
        const { id } = req.params;

        const auction = await Auction.findById(id);
        if (!auction) {
            return res.status(404).json({ message: "Auction not found." });
        }

        res.status(200).json({ auction });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateAuction = async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate } = req.body;

        if (startDate && endDate) {
            const dateError = validateDates(startDate, endDate);
            if (dateError) {
                return res.status(400).json({ message: dateError });
            }
        }

        const updatedAuction = await Auction.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedAuction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        res.status(200).json({ message: "Auction updated successfully", updatedAuction });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteAuction = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAuction = await Auction.findByIdAndDelete(id);

        if (!deletedAuction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        res.status(200).json({ message: "Auction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};