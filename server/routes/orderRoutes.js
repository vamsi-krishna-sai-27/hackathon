import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User
router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);
router.delete("/:id", protect, cancelOrder);

export default router;
