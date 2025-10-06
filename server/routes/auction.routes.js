const express = require("express");
const { createAuction, getAuctions, updateAuction, deleteAuction, getAuction } = require("../controllers/auction.controller");
const {protect} = require("../middleware/protect.middleware");

const router = express.Router();

router.post("/", protect, createAuction);
router.get("/", protect, getAuctions);
router.get("/:id", protect, getAuction);
router.put("/:id", protect, updateAuction);
router.delete("/:id", protect, deleteAuction);

module.exports = router;