import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  activeCourses: number;
  departments: number;
}

export interface EnrollmentStat {
  name: string;
  students: number;
  percentage: number;
}

export interface Activity {
  type:
    | "faculty_added"
    | "course_created"
    | "calendar_updated"
    | "student_imported";
  description: string;
  details: string;
  performedBy: {
    name: string;
  };
  createdAt: string;
}

export interface SystemStatus {
  serverLoad: number;
  databaseUsage: number;
  storage: number;
  activeUsers: {
    students: number;
    teachers: number;
    admins: number;
  };
}

class AdminService {
  private getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await axios.get(`${API_URL}/admin/dashboard/stats`, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  }

  async getEnrollmentStats(): Promise<EnrollmentStat[]> {
    const response = await axios.get(`${API_URL}/admin/dashboard/enrollment`, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  }

  async getRecentActivities(): Promise<Activity[]> {
    const response = await axios.get(`${API_URL}/admin/dashboard/activities`, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  }

  async getSystemStatus(): Promise<SystemStatus> {
    const response = await axios.get(
      `${API_URL}/admin/dashboard/system-status`,
      {
        headers: this.getAuthHeader(),
      }
    );
    return response.data;
  }

  async recordActivity(
    data: Omit<Activity, "performedBy" | "createdAt">
  ): Promise<Activity> {
    const response = await axios.post(`${API_URL}/admin/activities`, data, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  }
}

export default new AdminService();
