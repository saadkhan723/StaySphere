import api from "./api.js";

const hotelService = {
  getHotels: async (params = {}) => {
    const query = new URLSearchParams(params).toString();

    return api.get(
      query ? `/hotels?${query}` : "/hotels"
    );
  },

  getHotelById: async (hotelId) => {
    return api.get(`/hotels/${hotelId}`);
  },

  createHotel: async (hotelData) => {
    return api.post("/hotels", hotelData);
  },

  updateHotel: async (hotelId, hotelData) => {
    return api.put(`/hotels/${hotelId}`, hotelData);
  },

  deleteHotel: async (hotelId) => {
    return api.delete(`/hotels/${hotelId}`);
  },

  searchHotels: async (searchParams = {}) => {
    const query = new URLSearchParams(searchParams).toString();

    return api.get(
      query ? `/hotels/search?${query}` : "/hotels/search"
    );
  },
};

export default hotelService;