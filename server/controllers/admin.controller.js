const User = require("../models/user.model");
const Artwork = require("../models/artwork.model");
const Order = require("../models/order.model");

exports.getAllUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const adminId = req.user?._id;

        let mongoQuery = {};
        if (adminId) {
            mongoQuery._id = { $ne: adminId };
        }

        if (query) {
            const searchConditions = {
                $or: [
                    // Search by name (case-insensitive regex)
                    { name: { $regex: query, $options: 'i' } },
                    // Search by email (case-insensitive regex)
                    { email: { $regex: query, $options: 'i' } },
                ]
            };

            if (adminId) {
                mongoQuery = {
                    $and: [
                        { _id: { $ne: adminId } },
                        searchConditions
                    ]
                };
            } else {
                mongoQuery = searchConditions;
            }
        }

        const users = await User.find(mongoQuery).select({
            password: 0,
            isVerified: 0,
            createdAt: 0,
            updatedAt: 0,
            bio: 0,
            __v: 0,
        });

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({ message: 'User role is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.role = role || user.role;
        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllArtworks = async (req, res) => {
    try {
        const { query } = req.query;

        // Base filter
        let mongoQuery = { inAuction: false };

        if (query) {
            const searchConditions = {
                $or: [
                    // Search by title (case-insensitive regex)
                    { title: { $regex: query, $options: 'i' } },
                    // Search by artist (case-insensitive regex)
                    { artist: { $regex: query, $options: 'i' } },
                ]
            };

            // Combine base filter (inAuction: false) with search query
            mongoQuery = {
                $and: [
                    { inAuction: false },
                    searchConditions
                ]
            };
        }

        const artworks = await Artwork.find(mongoQuery).select({
            inAuction: 0,
            currnetBid: 0,
            size: 0,
            medium: 0,
            style: 0,
            orientation: 0,
            description: 0,
            images: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        });

        res.status(200).json({ artworks });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllArtworksInAuction = async (req, res) => {
    try {
        const { query } = req.query;

        // Base filter
        let mongoQuery = { inAuction: true };

        if (query) {
            const searchConditions = {
                $or: [
                    // Search by title (case-insensitive regex)
                    { title: { $regex: query, $options: 'i' } },
                    // Search by artist (case-insensitive regex)
                    { artist: { $regex: query, $options: 'i' } },
                ]
            };

            // Combine base filter (inAuction: true) with search query
            mongoQuery = {
                $and: [
                    { inAuction: true },
                    searchConditions
                ]
            };
        }

        const artworks = await Artwork.find(mongoQuery).select({
            size: 0,
            medium: 0,
            style: 0,
            orientation: 0,
            description: 0,
            images: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        }).populate('auctionId', 'title endDate');

        res.status(200).json({ artworks });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteArtwork = async (req, res) => {
    try {
        const { id } = req.params;

        const artwork = await Artwork.findByIdAndDelete(id);
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }

        res.status(200).json({ message: 'Artwork deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const { query } = req.query;

        let matchStage = {};

        // Define the $lookup stages
        const lookupUser = {
            $lookup: {
                from: User.collection.name,
                localField: 'user',
                foreignField: '_id',
                as: 'customerDetails'
            }
        };

        const lookupArtwork = {
            $lookup: {
                from: Artwork.collection.name,
                localField: 'artwork',
                foreignField: '_id',
                as: 'artworkDetails'
            }
        };

        // Define the search conditions (using fields from the LOOKED UP documents)
        if (query) {
            matchStage = {
                $match: {
                    $or: [
                        // Search by customer name (from the looked up 'customerDetails' array)
                        { 'customerDetails.name': { $regex: query, $options: 'i' } },
                        // Search by artwork title (from the looked up 'artworkDetails' array)
                        { 'artworkDetails.title': { $regex: query, $options: 'i' } },
                    ]
                }
            };
        }

        // Define the Projection stage (to shape the final output and omit large fields)
        const projectStage = {
            $project: {
                // Keep necessary order fields
                user: 1,
                artwork: 1,
                quantity: 1,
                shippingAddress: 1,
                shippingFee: 1,
                totalAmount: 1,
                paymentMethod: 1,
                isPaid: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1,

                // Project the first element of the looked up arrays
                customerDetails: { $arrayElemAt: ['$customerDetails', 0] },
                artworkDetails: { $arrayElemAt: ['$artworkDetails', 0] },
            }
        };

        // Build the aggregation pipeline
        const pipeline = [
            lookupUser,
            lookupArtwork,
            // Include the search stage only if a query is present
            ...(query ? [matchStage] : []),
            projectStage,
            { $sort: { createdAt: -1 } }
        ];

        const orders = await Order.aggregate(pipeline);

        res.status(200).json({ orders });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Order status is required' });
        }

        const acceptedStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
        if (!acceptedStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ message: 'Invalid order status provided' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            message: `Order ${orderId} status updated to ${status} successfully`,
            order
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};