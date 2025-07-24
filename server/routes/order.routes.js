const express = require("express");
const { placeOrder, getOrders, getOrder } = require("../controllers/order.controller");
const protect = require("../middleware/protect.middleware");

const router = express.Router();

router.post("/", protect, placeOrder); // Route to place order

router.get("/my", protect, getOrders); // Route to get all  orders for logged-in user

router.get("/:id", protect, getOrder); // Route to get specific order

module.exports = router;