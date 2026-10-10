import api from "./api.js";

const tourService = {
  getTours: async (params = {}) => {
    const query = new URLSearchParams(params).toString();

    return api.get(
      query ? `/tours?${query}` : "/tours"
    );
  },

  getTourById: async (tourId) => {
    return api.get(`/tours/${tourId}`);
  },

  createTour: async (tourData) => {
    return api.post("/tours", tourData);
  },

  updateTour: async (tourId, tourData) => {
    return api.put(`/tours/${tourId}`, tourData);
  },

  deleteTour: async (tourId) => {
    return api.delete(`/tours/${tourId}`);
  },

  searchTours: async (searchParams = {}) => {
    const query = new URLSearchParams(searchParams).toString();

    return api.get(
      query ? `/tours/search?${query}` : "/tours/search"
    );
  },
};

export default tourService;