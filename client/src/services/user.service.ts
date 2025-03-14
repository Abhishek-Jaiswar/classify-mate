import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  department: {
    _id: string;
    name: string;
    code: string;
  };
  profilePicture?: string;
  courses: Array<{
    _id: string;
    name: string;
    code: string;
    schedule: {
      day: string;
      startTime: string;
      endTime: string;
      room: string;
    };
    teacher?: {
      _id: string;
      name: string;
    };
    students?: Array<{
      _id: string;
      name: string;
    }>;
  }>;
  departmentData?: {
    _id: string;
    name: string;
    code: string;
    teachers: Array<{
      _id: string;
      name: string;
    }>;
    students: Array<{
      _id: string;
      name: string;
    }>;
  };
  permissions: {
    canManageUsers: boolean;
    canManageCourses: boolean;
    canManageDepartment: boolean;
    canViewAnalytics: boolean;
  };
}

class UserService {
  private static instance: UserService;
  private token: string | null = null;

  private constructor() {
    this.token = localStorage.getItem("token");
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  public clearToken() {
    this.token = null;
    localStorage.removeItem("token");
  }

  // Helper method to always get the latest token
  private getLatestToken(): string | null {
    // Always check localStorage for the latest token
    const latestToken = localStorage.getItem("token");
    if (latestToken && this.token !== latestToken) {
      this.token = latestToken;
    }
    return this.token;
  }

  public async getProfile(): Promise<UserProfile> {
    try {
      const token = this.getLatestToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_URL}/users/profile/enhanced`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  public async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const token = this.getLatestToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.put(`${API_URL}/users/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  public async deleteAccount(): Promise<void> {
    try {
      await axios.delete(`${API_URL}/users/account`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.clearToken();
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  }
}

export const userService = UserService.getInstance();
