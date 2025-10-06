const express = require("express");
const { giveFeedback, getFeedback, getThreeFeedback } = require("../controllers/feedback.controller");
const { protect } = require("../middleware/protect.middleware");

const router = express.Router();

router.get("/random", getThreeFeedback);
router.post("/", protect, giveFeedback);
router.get("/", protect, getFeedback);

module.exports = router;