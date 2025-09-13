import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only the logged-in user can access their data
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);

export default router;
