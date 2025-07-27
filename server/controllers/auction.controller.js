const Auction = require("../models/auction.model");

exports.createAuction = async (req, res) => {
    try {
        const { title, startDate, endDate } = req.body;

        if (!title || !startDate || !endDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create an auction
        const auction = await Auction.create({ title, startDate, endDate });

        res.status(201).json({ auction });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getAuctions = async (req, res) => {
    try {
        // fetch all the auctions from database
        const auctions = await Auction.find();
        if (!auctions) {
            return res.status(404).json({ message: "No auction found." });
        }

        res.status(200).json({ auctions });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

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
}

exports.updateAuction = async (req, res) => {
    try {
        const { id } = req.params;

        // Update the auction document in the database
        const updatedAuction = await Auction.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validators on update
        });

        if (!updatedAuction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        res.status(200).json({ message: "Auction updated successfully", updatedAuction });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.deleteAuction = async (req, res) => {
    try {
        const { id } = req.params;

        // Find auction by id and delete
        const deletedAuction = await Auction.findByIdAndDelete(id);

        if (!deletedAuction) {
            res.status(404).json({ message: "Auction not found" });
        }

        res.status(200).json({ message: "Auction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}