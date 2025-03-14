import express from "express";
import {
  register,
  login,
  getCurrentUser,
} from "../controllers/userController.js";
import { auth, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/user", auth, getCurrentUser);
router.get("/admin", [auth, authorize("admin")], (req, res) => {
  res.json({ message: "Admin access granted" });
});
router.get("/teacher", [auth, authorize("teacher", "admin")], (req, res) => {
  res.json({ message: "Teacher access granted" });
});

export default router;
