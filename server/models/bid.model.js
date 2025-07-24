const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    artwork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artwork",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
    },
},
    {
        timestamps: true,
    }
);

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;