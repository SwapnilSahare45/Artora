const express = require("express");
const { placeOrder, getOrders, getOrder } = require("../controllers/order.controller");
const { protect } = require("../middleware/protect.middleware");

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my", protect, getOrders);
router.get("/:id", protect, getOrder);

module.exports = router;