const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    artwork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      pinCode: String,
    },
    shippingFee: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "card", "upi", "wallet"],
      default: "cod"
    },
    paymentInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment"
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);
