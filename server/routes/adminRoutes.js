const express = require("express");
const {
  getAllUsers,
  deleteUser,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin only
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);

router.get("/orders", protect, adminOnly, getAllOrders);
router.put("/orders/:id/status", protect, adminOnly, updateOrderStatus);

router.get("/dashboard", protect, adminOnly, getDashboardStats);

module.exports = router;
