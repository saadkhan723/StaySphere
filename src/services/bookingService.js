import api from "./api.js";

const bookingService = {
  createBooking: async (bookingData) => {
    return api.post("/bookings", bookingData);
  },

  getMyBookings: async () => {
    return api.get("/bookings/my-bookings");
  },

  getBookingById: async (bookingId) => {
    return api.get(`/bookings/${bookingId}`);
  },

  cancelBooking: async (bookingId) => {
    return api.put(`/bookings/${bookingId}/cancel`);
  },

  updateBooking: async (bookingId, bookingData) => {
    return api.put(`/bookings/${bookingId}`, bookingData);
  },
};

export default bookingService;