const express = require("express");
const { getNotifications } = require("../controllers/notification.controller");
const protect = require("../middleware/protect.middleware");

const router = express.Router();

// Get all notifications
router.get("/", protect, getNotifications);

module.exports = router;
