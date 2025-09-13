const express = require("express");
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private
router.get("/me", protect, getProfile);

module.exports = router;
