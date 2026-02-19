import http from "./axios";

const api = {
  /* ---------- VISITOR ---------- */

  addVisitor(data: any) {
    return http.post("api/visitors/add", data);
  },
   
  getVisitors(data: any) {
    return http.post("api/visitors/getVisitorList", data);
  },
  
  updateTimeById(id: string, data: any) {
    return http.put(`api/visitors/outTime/${id}`, data);
  },
  
  /* ---------- Login ---------- */
  validateUser(data: any) {
    return http.post("api/auth/login", data);
  },

  logoutUser() {
    return http.post("api/auth/logout");
  },
};

export default api;