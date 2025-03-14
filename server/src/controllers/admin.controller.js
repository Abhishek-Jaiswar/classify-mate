import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Department from "../models/department.model.js";
import jwt from "jsonwebtoken";

// Dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      totalStudents: await User.countDocuments({ role: "student" }),
      totalTeachers: await User.countDocuments({ role: "teacher" }),
      totalCourses: await Course.countDocuments(),
      totalDepartments: await Department.countDocuments(),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard stats",
      error: error.message,
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, role, department } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (department) user.department = department;

    await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// Get all departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("head", "name email")
      .populate("teachers", "name email")
      .populate("students", "name email");
    res.json(departments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching departments", error: error.message });
  }
};

// Create department
export const createDepartment = async (req, res) => {
  try {
    const { name, code, description, head } = req.body;
    const department = new Department({
      name,
      code,
      description,
      head,
    });

    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating department", error: error.message });
  }
};

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const { name, code, description, head } = req.body;
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Update fields
    if (name) department.name = name;
    if (code) department.code = code;
    if (description) department.description = description;
    if (head) department.head = head;

    await department.save();
    res.json(department);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating department", error: error.message });
  }
};

// Delete department
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    await department.deleteOne();
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting department", error: error.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("department", "name code")
      .populate("teacher", "name email")
      .populate("students", "name email");
    res.json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

// Create course
export const createCourse = async (req, res) => {
  try {
    const { name, code, description, department, teacher, schedule } = req.body;
    const course = new Course({
      name,
      code,
      description,
      department,
      teacher,
      schedule,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const { name, code, description, department, teacher, schedule } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update fields
    if (name) course.name = name;
    if (code) course.code = code;
    if (description) course.description = description;
    if (department) course.department = department;
    if (teacher) course.teacher = teacher;
    if (schedule) course.schedule = schedule;

    await course.save();
    res.json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating course", error: error.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting course", error: error.message });
  }
};
