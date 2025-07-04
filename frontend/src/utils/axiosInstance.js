import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create the axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  withCredentials: true, // IMPORTANT: This ensures cookies/sessions are sent
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔐 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ⚠️ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Only redirect to login if it's not a Splitwise-related error
        if (!error.config.url.includes('/splitwise/')) {
          // Clear token and redirect to login
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } else if (error.response.status === 500) {
        console.error("🔥 Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      // Request timeout
      console.error("⌛ Request timeout. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;