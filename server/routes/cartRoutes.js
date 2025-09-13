const express = require("express");
const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCartItems);
router.post("/", protect, addToCart);
router.put("/:itemId", protect, updateCartItem);
router.delete("/:itemId", protect, removeCartItem);
router.delete("/", protect, clearCart);

module.exports = router;
