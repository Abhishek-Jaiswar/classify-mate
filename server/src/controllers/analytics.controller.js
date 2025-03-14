import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Department from "../models/department.model.js";

export const getAnalytics = async (req, res) => {
  try {
    // Get total counts
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalCourses = await Course.countDocuments();
    const totalDepartments = await Department.countDocuments();

    // Get department statistics
    const departments = await Department.find()
      .populate("head", "name email")
      .populate("teachers", "name email")
      .populate("students", "name email");

    const departmentStats = departments.map((dept) => ({
      name: dept.name,
      totalTeachers: dept.teachers.length,
      totalStudents: dept.students.length,
      head: dept.head.name,
    }));

    // Get course enrollment statistics
    const courses = await Course.find()
      .populate("department", "name")
      .populate("teacher", "name email")
      .populate("students", "name email");

    const courseStats = courses.map((course) => ({
      name: course.name,
      department: course.department.name,
      totalStudents: course.students.length,
      teacher: course.teacher.name,
    }));

    res.json({
      totalStudents,
      totalTeachers,
      totalCourses,
      totalDepartments,
      departmentStats,
      courseStats,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching analytics", error: error.message });
  }
};
