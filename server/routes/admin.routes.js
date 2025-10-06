const express = require('express');
const { protect, adminProtect } = require('../middleware/protect.middleware');
const { getAllUsers, getAllArtworks, getAllArtworksInAuction, deleteUser, updateUser, deleteArtwork, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/admin.controller');

const router = express.Router();

router.get("/users", protect, adminProtect, getAllUsers);
router.put("/users/:userId", protect, adminProtect, updateUser);
router.delete("/users/:userId", protect, adminProtect, deleteUser);
router.get("/artworks", protect, adminProtect, getAllArtworks);
router.get("/artworks/auction", protect, adminProtect, getAllArtworksInAuction);
router.delete("/artwork/:id", protect, adminProtect, deleteArtwork);
router.get("/orders", protect, adminProtect, getAllOrders);
router.put("/orders/:orderId", protect, adminProtect, updateOrderStatus);
router.delete("/order/:orderId", protect, adminProtect, deleteOrder);

module.exports = router;