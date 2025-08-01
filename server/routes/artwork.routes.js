const express = require("express");
const upload = require("../util/multer.config");
const { addArtwork, getArtworks, getArtworkById, updateArtwork, deleteArtwork, placeBid, getArtworkByAuction, getMyArtworks, getBids, getThreeArtwork } = require("../controllers/artwork.controller");
const protect = require("../middleware/protect.middleware");

const router = express.Router();

router.get("/random", getThreeArtwork);

// Route to add a new artwork with file uploads (thumbnail and images)
router.post("/", protect, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), addArtwork);

// Route to get all the artwork for logged-in user
router.get("/my", protect, getMyArtworks);

// Route to get all artworks exclude logged-in user
router.get("/", protect, getArtworks);

// Route to get an artworks for auction excluding logged-in user
router.get("/auction/:id", protect, getArtworkByAuction);

// Route to get a specific artwork by ID
router.get("/:id", protect, getArtworkById);

// Route to update an artwork with file uploads (thumbnail and images)
router.put("/:id", protect, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), updateArtwork);

router.delete("/:id", protect, deleteArtwork); // Route to delete artwork

router.post("/:id/bid", protect, placeBid); // Route to place a bid

router.get("/:id/bids", protect, getBids); // Route to get bids for specific artwork

module.exports = router;