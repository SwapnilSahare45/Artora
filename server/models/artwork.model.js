const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    inAuction: {
        type: Boolean,
        default: false,
        required:true,
    },
    auctionName: {
        type: String,
        required: function () {
            return this.inAuction;
        },
        trim: true,
    },
    auctionStartDate: {
        type: Date,
        required: function () {
            return this.inAuction;
        },
    },
    auctionEndDate: {
        type: Date,
        required: function () {
            return this.inAuction;
        },
    },
    openingBid: {
        type: Number,
        required: function () {
            return this.inAuction;
        },
    },
    price: {
        type: Number,
        required: function () {
            return !this.inAuction;
        },
        min:1
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Painting", "Sculpture", "Digital", "Photography", "Other"],
    },
    size: {
        type: String,
        required: true,
        enum: ["Small", "Medium", "Large", "Extra Large", "Custom", "Other"],
    },
    medium: {
        type: String,
        required: true,
        enum: ["Oil", "Acrylic", "Watercolor", "Digital", "Mixed Media", "Other"],
    },
    style: {
        type: String,
        required: true,
        enum: ["Abstract", "Realism", "Impressionism", "Minimalist", "Contemporary", "Other"],
    },
    orientation: {
        type: String,
        required: true,
        enum: ["Portrait", "Landscape", "Square", "Panoramic", "Other"],
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
},
    {
        timestamps: true,
    }
)


// Create a text index on multiple fields for efficient text search
artworkSchema.index({
    title: 'text',
    price: 'text',
    artist: 'text',
    category: 'text',
    size: 'text',
    medium: 'text',
    style: 'text',
    orientation: 'text',
    description: 'text',
});

// Create an index on the owner field for faster queries by owner
artworkSchema.index({owner:1});

const Artwork = mongoose.model("Artwork", artworkSchema);
module.exports = Artwork;