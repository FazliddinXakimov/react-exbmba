import axios from "@/services/axios";

class UserService {
  async refreshToken(data) {
    const response = await axios.post("/users/refresh-token", data);
    return response.data;
  }

  async login(data) {
    const response = await axios.post("/users/login", data);
    return response.data;
  }

  async logout(data) {
    const response = await axios.post("/users/logout", data);
    return response.data;
  }

  async register(data) {
    const response = await axios.post("/users/register", data);
    return response.data;
  }

  async resetPassword(data) {
    const response = await axios.post("/users/reset-password", data);
    return response.data;
  }

  async getMe() {
    const response = await axios.get("/users/me");
    return response.data;
  }

  async updateUser({ id, data }) {
    const response = await axios.patch(`/users/${id}/`, data);
    return response.data;
  }

  async getLeaders(params) {
    const response = await axios.get("/users/leaders/", { params });
    return response.data;
  }

  async sendFileToUserTelegram(params) {
    const { data } = await axios.get("/users/send_file_to_user_telegram/", {
      params,
    });
    return data;
  }

  async sendSmsOtp(data) {
    const res = await axios.post("/users/sms-otp", data);
    return res.data;
  }

  async sendVerifyOtp(data) {
    const res = await axios.post("/users/verify-otp", data);
    return res.data;
  }

  async deleteUser(id) {
    await axios.delete(`/users/${id}/`);
  }

  async getReferrals() {
    const response = await axios.get("/referrals/referrals");
    return response.data;
  }

  async getReferralsStatistics() {
    const response = await axios.get("/referrals/referrals/statistics");
    return response.data;
  }
}

export default new UserService();
