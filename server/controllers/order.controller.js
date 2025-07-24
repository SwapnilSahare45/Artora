const Order = require("../models/order.model");
const Artwork = require("../models/artwork.model");

exports.placeOrder = async (req, res) => {
    try {
        const buyerId = req.user._id;
        const { artworkId } = req.body;

        if (!artworkId) return res.status(400).json({ message: "Artwork id is required" });

        // Find the artwork
        const artwork = await Artwork.findById(artworkId);
        if (!artwork) return res.status(404).json({ message: "Artwork not found" });

        // Prevent buyer from purchasing their own artwork
        if (artwork.owner._id.toString() === buyerId.toString()) {
            return res.status(400).json({ message: "You cannot buy your own artwork" });
        }

        if (artwork.sold) {
            return res.status(400).json({ message: "This artwork is already sold" });
        }

        let orderType = 'direct';
        let priceToPay = artwork.price;

        // If the artwork is in auction, check the highest bid and validate the buyer
        if (artwork.inAuction) {
            const highestBid = artwork.bids?.[artwork.bids.length - 1];

            // Only the highest bidder can place the order for auctioned artwork
            if (!highestBid || highestBid.bidder.toString() !== buyerId.toString()) {
                return res.status(403).json({ message: "You are not the highest bidder for this auction" });
            }

            orderType = 'auction';
            priceToPay = highestBid.amount;
        }

        // Create an order
        const order = await Order.create({
            artwork: artwork._id,
            buyer: buyerId,
            seller: artwork.owner._id,
            amount: priceToPay,
            type: orderType,
            status: "pending"
        });

        // Mark the artwork as sold and save the changes
        artwork.sold = true;
        await artwork.save();

        return res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ buyer: userId });
        if (!orders) return res.status(404).json({ message: "No order found" });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the order by id
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}