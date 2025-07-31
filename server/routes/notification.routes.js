const express = require("express");
const { getNotifications } = require("../controllers/notification.controller");
const router = express.Router();

// Get all notifications
router.get("/", getNotifications);


module.exports = router;
