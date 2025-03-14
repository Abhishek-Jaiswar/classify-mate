export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Log the API URL during development
if (process.env.NODE_ENV === "development") {
  console.log("API URL:", API_URL);
}
