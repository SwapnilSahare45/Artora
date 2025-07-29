const Order = require("../models/order.model");
const Artwork = require("../models/artwork.model");
const Payment = require("../models/payment.model");

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const {
      artwork,
      quantity = 1,
      shippingAddress,
      paymentMethod = "cod",
      paymentDetails,
    } = req.body;

    // Validate required fields
    const requiredFields = ["fullName", "phone", "address", "city", "pinCode"];
    const missing = requiredFields.find(field => !shippingAddress?.[field]);
    if (!artwork || missing) {
      return res.status(400).json({ message: "Artwork and complete shipping address are required." });
    }

    // Fetch artwork and validate ownership/sale
    const art = await Artwork.findById(artwork).populate("owner");
    if (!art) return res.status(404).json({ message: "Artwork not found." });

    if (art.sold) return res.status(400).json({ message: `Artwork '${art.title}' is already sold.` });

    if (art.owner._id.toString() === buyerId.toString()) {
      return res.status(400).json({ message: "You cannot buy your own artwork." });
    }

    // Determine price
    let price = art.price;
    if (art.inAuction) {
      const highestBid = art.bids?.[art.bids.length - 1];
      if (!highestBid || highestBid.bidder.toString() !== buyerId.toString()) {
        return res.status(403).json({ message: `You are not the highest bidder for '${art.title}'.` });
      }
      price = highestBid.amount;
    }

    const totalArtworkPrice = price * quantity;
    const shippingFee = totalArtworkPrice >= 499 ? 0 : 40;
    const totalAmount = totalArtworkPrice + shippingFee;

    // Mark artwork as sold
    art.sold = true;
    await art.save();

    // Handle payment
    let paymentInfo = null;
    if (paymentMethod !== "cod") {
      const payment = await Payment.create({
        method: paymentMethod,
        status: "pending",
        paymentDetails: paymentDetails || {},
      });
      paymentInfo = payment._id;
    }

    // Create order
    const order = await Order.create({
      user: buyerId,
      artwork: art._id,
      quantity,
      shippingAddress,
      shippingFee,
      totalAmount,
      paymentMethod,
      paymentInfo,
      isPaid: false,
    });

    return res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Place Order Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all orders for the logged-in user
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate("artwork")
      .populate("paymentInfo");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single order by ID
exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("artwork")
      .populate("paymentInfo");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
