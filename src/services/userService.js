import api from "./api.js";

const userService = {
  getProfile: async () => {
    return api.get("/users/profile");
  },

  updateProfile: async (userData) => {
    return api.put("/users/profile", userData);
  },

  getWishlist: async () => {
    return api.get("/users/wishlist");
  },

  addToWishlist: async (hotelId) => {
    return api.post("/users/wishlist", { hotelId });
  },

  removeFromWishlist: async (hotelId) => {
    return api.delete(`/users/wishlist/${hotelId}`);
  },

  getMyReviews: async () => {
    return api.get("/users/reviews");
  },

  updatePassword: async (passwordData) => {
    return api.put("/users/password", passwordData);
  },
};

export default userService;