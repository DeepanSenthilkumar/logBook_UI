import { ENV } from "../config/env";

type Method = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(
  endpoint: string,
  method: Method,
  body?: any
): Promise<T> {
  const response = await fetch(`${ENV.BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "API request failed");
  }

  return response.json();
}

/* =========================
   ALL APIs WRAPPED IN ONE OBJECT
========================= */

const api = {
  /* ---------- VISITOR ---------- */

  addVisitor(data: any) {
    return request("api/visitors/add", "POST", data);
  },

  getVisitors() {
    return request("api/visitors", "GET");
  },

  deleteVisitor(id: string) {
    return request(`api/visitors/${id}`, "DELETE");
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