import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,
});

// Request interceptor: attach JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("kidsmath_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: unwrap ApiResponse and handle 401
apiClient.interceptors.response.use(
  (response) => {
    const payload = response.data;
    if (payload && typeof payload === "object" && "success" in payload) {
      if (payload.success) {
        return payload.data;
      }
      return Promise.reject(payload.error || new Error("API error"));
    }
    return payload;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("kidsmath_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
