const express = require("express");
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controllers/wishlist.controller");
const { protect } = require("../middleware/protect.middleware");

const router = express.Router();

router.post("/:id", protect, addToWishlist);
router.get("/", protect, getWishlist);
router.delete("/:id", protect, removeFromWishlist);

module.exports = router;