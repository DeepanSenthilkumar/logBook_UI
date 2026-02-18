import axios from "axios";
import { ENV } from "../config/env";
// import { error } from "../../components/toaster/toaster";
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

/*
  RESPONSE INTERCEPTOR
  Runs after EVERY response
  Handles expiry + auto logout
*/
http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;

    // Token expired / invalid
    if (status === 401) {
      showError('Session Expired');
    //   sessionStorage.removeItem("token");

    //   // force logout + redirect
    //   window.location.href = "/login";
    triggerLogout();
    }

    return Promise.reject(error);
  }
);

export default http;
