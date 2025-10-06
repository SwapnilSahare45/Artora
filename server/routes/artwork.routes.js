const express = require("express");
const upload = require("../util/multer.config");
const { addArtwork, getArtworks, getArtworkById, updateArtwork, deleteArtwork, placeBid, getArtworkByAuction, getMyArtworks, getBids, getThreeArtwork } = require("../controllers/artwork.controller");
const { protect } = require("../middleware/protect.middleware");

const router = express.Router();

router.get("/random", getThreeArtwork);

router.post("/",
    protect,
    upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), addArtwork
);
router.get("/my", protect, getMyArtworks);
router.get("/", protect, getArtworks);
router.get("/auction/:id", protect, getArtworkByAuction);
router.get("/:id", protect, getArtworkById);
router.put("/:id",
    protect,
    upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), updateArtwork
);
router.delete("/:id", protect, deleteArtwork);
router.post("/:id/bid", protect, placeBid);
router.get("/:id/bids", protect, getBids);

module.exports = router;