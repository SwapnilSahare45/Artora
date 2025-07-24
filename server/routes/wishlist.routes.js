const express = require("express");
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controllers/wishlist.controller");
const protect = require("../middleware/protect.middleware");

const router = express.Router();

//Route for add artwork to wishlist
router.post("/:id", protect, addToWishlist);

// Route to get Wishlist items for logged-in user
router.get("/", protect, getWishlist);

// Route to remove Artwork from user's wishlist
router.delete("/:id", protect, removeFromWishlist);

module.exports = router;