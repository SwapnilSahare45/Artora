const express = require("express");
const { createAuction, getAuctions, updateAuction, deleteAuction, getAuction } = require("../controllers/auction.controller");
const protect = require("../middleware/protect.middleware");

const router = express.Router();

router.post("/", protect, createAuction); // Route to create auction

router.get("/", protect, getAuctions); // Route to get all the auctions

router.get("/:id", protect, getAuction); // Route to get single auction by id

router.put("/:id", protect, updateAuction); // Route to update auction

router.delete("/:id", protect, deleteAuction); //Route to delete auction

module.exports = router;