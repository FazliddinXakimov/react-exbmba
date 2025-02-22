import axios from "@/services/axios";

class ReferenceService {
  async getBanners(params) {
    const response = await axios.get("/references/banners", { params });
    return response.data;
  }

  async getSelections(params) {
    const response = await axios.get("/references/selections", { params });
    return response.data;
  }

  async getTestTypes(params) {
    const response = await axios.get("/references/test-types", { params });
    return response.data;
  }

  async getSubjects(params) {
    const response = await axios.get("/references/subjects", { params });
    return response.data;
  }

  async getRegions(params) {
    const response = await axios.get("/references/regions/", { params });
    return response.data;
  }

  async getReviews(params) {
    const response = await axios.get("/references/reviews/", { params });
    return response.data;
  }
}

export default new ReferenceService();
