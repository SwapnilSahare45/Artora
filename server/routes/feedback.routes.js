const express = require("express");
const { giveFeedback, getFeedback } = require("../controllers/feedback.controller");
const protect = require("../middleware/protect.middleware");

const router = express.Router();

router.post("/", protect, giveFeedback); // Route to send feedback from logged-in user

router.get("/", protect, getFeedback); // Route to get all feedback for Admin

module.exports = router;