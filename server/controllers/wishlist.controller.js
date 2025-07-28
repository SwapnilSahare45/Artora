const Wishlist = require("../models/wishlist.model");
const Artwork = require("../models/artwork.model");

exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        // Find the artwork by its ID
        const artwork = await Artwork.findById(id);
        if (!artwork) return res.status(404).json({ message: "Artwork not found" });

        // Prevent users from adding their own artwork to their wishlist
        if (artwork.owner._id.toString() === userId.toString()) {
            return res.status(400).json({ message: "You cannot add your own artwork to your wishlist" });
        }

        // Check if the artwork is already in the user's wishlist
        const existing = await Wishlist.findOne({ user: userId, artwork: id });
        if (existing) return res.status(409).json({ message: "Artwork is already in your wishlist" });

        const wishlistItem = await Wishlist.create({ user: userId, artwork: id });

        res.status(201).json({
            message: "Artwork added to wishlist successfully",
            wishlist: wishlistItem
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all wishlist items for the user
        const wishlistItems = await Wishlist.find({ user: userId });
        if (!wishlistItems) {
            return res.status(404).json({ message: "Wishlist items not found" });
        }

        res.status(200).json({ wishlistItems });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.removeFromWishlist = async (req, res) => {
    try {
        const artwork = req.params.id;

        const item = await Wishlist.find({ artwork });
        if (!item) {
            return res.status(404).json({ message: "Item not found." });
        }

        // Artwork remove from the wishlist
        await Wishlist.deleteOne({ artwork });

        res.status(200).json({ message: "Artwork remove from wishlist" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}