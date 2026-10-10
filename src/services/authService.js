import api from "./api.js";

const authService = {
  register: async (userData) => {
    return api.post("/auth/register", userData);
  },

  login: async (credentials) => {
    return api.post("/auth/login", credentials);
  },

  logout: async () => {
    return api.post("/auth/logout");
  },

  getProfile: async () => {
    return api.get("/auth/profile");
  },

  updateProfile: async (userData) => {
    return api.put("/auth/profile", userData);
  },

  forgotPassword: async (email) => {
    return api.post("/auth/forgot-password", { email });
  },

  resetPassword: async (token, password) => {
    return api.post(`/auth/reset-password/${token}`, {
      password,
    });
  },
};

export default authService;