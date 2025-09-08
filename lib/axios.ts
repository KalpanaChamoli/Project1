import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const role = localStorage.getItem("role");
    let token = null;

    if (role === "Admin") {
      token = localStorage.getItem("admin_token");
    } else if (role === "Employee") {
      token = localStorage.getItem("employee_token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
