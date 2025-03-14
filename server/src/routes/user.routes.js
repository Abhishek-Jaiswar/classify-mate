import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getEnhancedProfile,
  deleteAccount,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.use(authenticateToken);
router.get("/profile", getProfile);
router.get("/profile/enhanced", getEnhancedProfile);
router.put("/profile", updateProfile);
router.put("/profile/password", changePassword);
router.delete("/account", deleteAccount);

export default router;
