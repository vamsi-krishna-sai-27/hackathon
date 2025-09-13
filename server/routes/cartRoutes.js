import express from "express";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User must be logged in
router.get("/", protect, getCartItems);
router.post("/", protect, addToCart);
router.put("/:itemId", protect, updateCartItem);
router.delete("/:itemId", protect, removeCartItem);
router.delete("/", protect, clearCart);

export default router;
