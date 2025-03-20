import axios from "@/services/axios";

class BillingService {
  async getSubscriptions(params) {
    const response = await axios.get("/billing/subscriptions/", { params });
    return response.data;
  }

  async getVerifyCode(id) {
    const response = await axios.get(`/billing/card/${id}/get_verify_code/`);
    return response.data;
  }

  async getTariffTypes() {
    const response = await axios.get(`/billing/tariff-types/`);
    return response.data;
  }

  async deleteCard(id) {
    await axios.delete(`/billing/card/${id}/`);
  }

  async sendCardVerifyCode(id, payload) {
    const { data } = await axios.post(
      `/billing/card/${id}/verify_code/`,
      payload
    );
    return data;
  }
  async addCard(data) {
    const response = await axios.post("/billing/card/", data);
    return response.data;
  }

  async createSubscription(payload) {
    const { data } = await axios.post("/billing/subscriptions/", payload);
    return data;
  }

  async createLinkSubscription(payload) {
    const { data } = await axios.post("/billing/subcription/create/", payload);
    return data;
  }

  async paySubscription(id) {
    const { data } = await axios.get(
      `/billing/subscriptions/${id}/subscription_pay/`
    );
    return data;
  }
}

export default new BillingService();
