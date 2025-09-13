const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// User
router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);
router.delete("/:id", protect, cancelOrder);

module.exports = router;
