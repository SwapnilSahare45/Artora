const express = require("express");
const { createAuction, getAuctions, updateAuction, deleteAuction } = require("../controllers/auction.controller");

const router = express.Router();

router.post("/", createAuction); // Route to create auction

router.get("/", getAuctions); // Route to get all the auctions

router.put("/:id", updateAuction); // Route to update auction

router.delete("/:id", deleteAuction); //Route to delete auction

module.exports = router;