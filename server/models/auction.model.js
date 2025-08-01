const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return value >= today;
            },
            message: "Auction start date cannot be in the past",
        },
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "Auction end date must be after the start date",
        }
    },
    ended: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
    }
);

// Create an index on the startDate field for faster queries by startDate
auctionSchema.index({ startDate: 1 });

// Create an index on the endDate field for faster queries by endDate
auctionSchema.index({ endDate: 1 });

const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;