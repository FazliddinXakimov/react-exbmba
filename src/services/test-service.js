import axios from "@/services/axios";

class TestService {
  async startNationalCertificate(data) {
    const response = await axios.post(
      "/tests/test-solving/start_national_certificate_test/",
      data
    );
    return response.data;
  }

  async endNationalCertificate(data) {
    const response = await axios.post(
      "/tests/test-solving/end_national_certificate_test/",
      data
    );
    return response.data;
  }

  async startBlockTest(data) {
    const response = await axios.post("/tests/test-solving/start_block_test/", {
      subjects: data,
    });
    return response.data;
  }

  async startBySubjectTest(payload) {
    const { data } = await axios.post(
      "/tests/test-solving/start_by_subject_test/",
      payload
    );
    return data;
  }

  async endBySubjectTest(payload) {
    const { data } = await axios.post(
      "/tests/test-solving/end_by_subject_test/",
      payload
    );
    return data;
  }

  async endBlockTest(data) {
    const response = await axios.post(
      "/tests/test-solving/end_block_test/",
      data
    );
    return response.data;
  }

  async startSelectionTest(params) {
    const response = await axios.post(
      "/tests/test-solving/start_by_selection_test/",
      params
    );
    return response.data;
  }

  async endSelectionTest(data) {
    const response = await axios.post(
      "/tests/test-solving/end_by_selection_test/",
      data
    );
    return response.data;
  }

  async startYhqTest() {
    const response = await axios.post("/tests/test-solving/start_yhq_test/");
    return response.data;
  }

  async endYhqTest(data) {
    const response = await axios.post(
      "/tests/test-solving/end_yhq_test/",
      data
    );
    return response.data;
  }

  async getTestResultDetail(id) {
    const { data } = await axios.get(`/tests/results/${id}/`);
    return data;
  }

  async getYHQResultDetail(id) {
    const { data } = await axios.get(`/tests/results-yhq/${id}/`);
    return data;
  }

  async getMyResults(params) {
    const { data } = await axios.get(`/tests/results/my_results/`, { params });
    return data;
  }
}

export default new TestService();
