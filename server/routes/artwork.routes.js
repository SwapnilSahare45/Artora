const express = require("express");
const upload = require("../util/multer.config");
const { addArtworkDirect, getArtworks, getArtworkById, updateArtwork } = require("../controllers/artwork.controller");

const router = express.Router();

// Route to add a new artwork with file uploads (thumbnail and images)
router.post("/", upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), addArtworkDirect);

router.get("/", getArtworks); // Route to get all artworks

router.get("/:id", getArtworkById); // Route to get a specific artwork by ID

// Route to update an artwork with file uploads (thumbnail and images)
router.put("/:id", upload.fields([{name:'thumbnail', maxCount:1}, {name:'images', maxCount:8}]), updateArtwork);

module.exports = router;