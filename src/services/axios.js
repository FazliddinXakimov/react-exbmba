import axios from "axios";
import { store } from "../store/index"; // Import Redux store
import { resetAuth } from "../store/slices/userSlice"; // Redux action to reset auth
import {
  getAccessToken,
  getRefreshToken,
  deleteAccessToken,
  deleteRefreshToken,
} from "../utils/localeStorages";
import { refreshToken } from "../store/actions/userActions";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Replace with your API base URL
  timeout: 30000,
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken(); // Fetch access token

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error.config;

    if (status === 401 && error.config.url === "/users/refresh-token") {
      store.dispatch(resetAuth()); // Reset Redux store
      deleteAccessToken();
      deleteRefreshToken();
      window.location.href = "/auth/login"; // Redirect to login page
      return Promise.reject(error);
    }

    if (
      status === 401 &&
      !originalRequest._retry &&
      error.config.url !== "/users/login"
    ) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = getRefreshToken();
        if (!refreshTokenValue) {
          throw new Error("No refresh token available");
        }

        const response = await store.dispatch(refreshToken()).unwrap(); // Dispatch refreshToken
        const newAccessToken = response?.access;

        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest); // Retry the original request
        }
      } catch (refreshError) {
        store.dispatch(resetAuth());
        deleteAccessToken();
        deleteRefreshToken();
        window.location.href = "/auth/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
