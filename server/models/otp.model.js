const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    },
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;