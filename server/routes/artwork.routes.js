const express = require("express");
const upload = require("../util/multer.config");
const { addArtwork, getArtworks, getArtworkById, updateArtwork, deleteAuction, getMyArtworks } = require("../controllers/artwork.controller");
const protect = require("../middleware/protect.middleware");

const router = express.Router();

// Route to add a new artwork with file uploads (thumbnail and images)
router.post("/", protect, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), addArtwork);

// Route to get all the artwork for logged-in user
router.get("/my", protect, getMyArtworks);

router.get("/", protect, getArtworks); // Route to get all artworks

router.get("/:id", protect, getArtworkById); // Route to get a specific artwork by ID

// Route to update an artwork with file uploads (thumbnail and images)
router.put("/:id", protect, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), updateArtwork);

router.delete("/:id", protect, deleteAuction); // Route to delete artwork

module.exports = router;