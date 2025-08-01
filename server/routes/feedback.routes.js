const express = require("express");
const { giveFeedback, getFeedback, getThreeFeedback } = require("../controllers/feedback.controller");
const protect = require("../middleware/protect.middleware");

const router = express.Router();

router.get("/random", getThreeFeedback); // Route to get three random feedback

router.post("/", protect, giveFeedback); // Route to send feedback from logged-in user

router.get("/", protect, getFeedback); // Route to get all feedback for Admin

module.exports = router;