import axios from "axios";
import { ENV } from "../config/env";
import { error as showError } from "../components/toaster/toaster";
import { triggerLogout } from "../context/AuthContext";

const http = axios.create({
  baseURL: `${ENV.BASE_URL}`,
  headers: {
    "Content-Type": "application/json"
  }
});

http.interceptors.request.use(
  (config) => {
    debugger
    const token = sessionStorage.getItem("token");

    // Attach token only if present
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      showError('Session Expired');
      triggerLogout();
    }

    return Promise.reject(error);
  }
);

export default http;
