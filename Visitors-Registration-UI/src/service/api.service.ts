// import { ENV } from "../config/env";
import http from "./axios";

// type Method = "GET" | "POST" | "PUT" | "DELETE";

// async function request<T>(
//   endpoint: string,
//   method: Method,
//   body?: any
// ): Promise<T> {
//   const response = await fetch(`${ENV.BASE_URL}${endpoint}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   if (!response.ok) {
//     const text = await response.text();
//     throw new Error(text || "API request failed");
//   }

//   return response.json();
// }

/* =========================
   ALL APIs WRAPPED IN ONE OBJECT
========================= */

const api = {
  /* ---------- VISITOR ---------- */

  addVisitor(data: any) {
    return http.post("api/visitors/add", data);
  },
  
  validateUser(data: any) {
    return http.post("api/auth/login", data);
  },

  logoutUser() {
    return http.post("api/auth/logout");
  },

  getVisitors(data: any) {
    return http.post("api/visitors/getVisitorList", data);
  },

  updateTimeById(id: string, data: any) {
    return http.put(`api/visitors/outTime/${id}`, data);
  },

  /* ---------- FUTURE EXPANSION ---------- */

  // login(data: any) {
  //   return request("api/auth/login", "POST", data);
  // },

  // getDashboard() {
  //   return request("api/admin/dashboard", "GET");
  // }
};

export default api;