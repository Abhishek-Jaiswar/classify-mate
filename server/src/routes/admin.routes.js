import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/admin.controller.js";
import { authenticateToken } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticateToken);
router.use(authorize("admin"));

// Dashboard statistics
router.get("/dashboard/stats", getDashboardStats);

// User management
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Department management
router.get("/departments", getAllDepartments);
router.post("/departments", createDepartment);
router.put("/departments/:id", updateDepartment);
router.delete("/departments/:id", deleteDepartment);

// Course management
router.get("/courses", getAllCourses);
router.post("/courses", createCourse);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);

export default router;
