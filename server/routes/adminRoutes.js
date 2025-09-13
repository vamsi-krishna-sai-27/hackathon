import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);

router.get("/orders", protect, adminOnly, getAllOrders);
router.put("/orders/:id/status", protect, adminOnly, updateOrderStatus);

router.get("/dashboard", protect, adminOnly, getDashboardStats);

export default router;
