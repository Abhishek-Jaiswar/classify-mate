import axios, { AxiosError } from "axios";
import { API_URL } from "../config";
import { userService } from "./user.service";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "admin";
  department?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    department?: string;
  };
}

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log("Attempting login with:", credentials.email);
      const response = await axios.post(`${API_URL}/users/login`, credentials);

      // Store the token in localStorage and update userService
      const token = response.data.token;
      localStorage.setItem("token", token);
      userService.setToken(token);

      console.log("Login successful, token stored");
      return response.data;
    } catch (error: unknown) {
      console.error("Login error:", error);

      // Provide more specific error messages
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          switch (axiosError.response.status) {
            case 401:
              throw new Error("Invalid email or password");
            case 403:
              throw new Error(
                "Your account is locked. Please contact support."
              );
            case 404:
              throw new Error("User not found");
            default:
              throw new Error(
                axiosError.response.data &&
                typeof axiosError.response.data === "object" &&
                "message" in axiosError.response.data
                  ? (axiosError.response.data as { message: string }).message
                  : "Login failed. Please try again."
              );
          }
        }
      }

      throw error;
    }
  }

  public async register(data: RegisterData): Promise<AuthResponse> {
    try {
      console.log("Attempting registration for:", data.email);
      const response = await axios.post(`${API_URL}/users/register`, data);

      // Don't automatically log in after registration
      console.log("Registration successful");
      return response.data;
    } catch (error: unknown) {
      console.error("Registration error:", error);

      // Provide more specific error messages
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          switch (axiosError.response.status) {
            case 400:
              throw new Error(
                axiosError.response.data &&
                typeof axiosError.response.data === "object" &&
                "message" in axiosError.response.data
                  ? (axiosError.response.data as { message: string }).message
                  : "Invalid registration data"
              );
            case 409:
              throw new Error("Email already in use");
            default:
              throw new Error(
                axiosError.response.data &&
                typeof axiosError.response.data === "object" &&
                "message" in axiosError.response.data
                  ? (axiosError.response.data as { message: string }).message
                  : "Registration failed. Please try again."
              );
          }
        }
      }

      throw error;
    }
  }

  public logout(): void {
    console.log("Logging out, clearing token");
    localStorage.removeItem("token");
    userService.clearToken();
  }
}

export const authService = AuthService.getInstance();
