const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["card", "upi", "wallet"],
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
    paymentDetails: {
      cardNumber: String,
      cardHolderName: String,
      expiry: String,
      cvv: String,
      upiId: String,
      walletType: String,
      transactionId: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
