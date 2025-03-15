import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/user-service";
import {
  deleteAccessToken,
  deleteRefreshToken,
  getRefreshToken,
} from "../../utils/localeStorages";
import { resetAuth } from "../slices/userSlice";

export const login = createAsyncThunk(
  "user/LOGIN",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.login(data);
      console.log("response.data", response.data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const getMe = createAsyncThunk(
  "user/GET_ME",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getMe(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const getLeaders = createAsyncThunk(
  "user/GET_LEADERS",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getLeaders(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "get leaders failed");
    }
  }
);

export const logout = createAsyncThunk(
  "user/LOGOUT",
  async (isHandle = false, { dispatch, rejectWithValue }) => {
    try {
      if (isHandle) {
        await userService.logout({ refresh: getRefreshToken() });
      }
      deleteRefreshToken();
      deleteAccessToken();
      dispatch(resetAuth()); // Make sure it's imported properly
    } catch (error) {
      console.error("Logout failed:", error);
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "user/REFRESH_TOKEN",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.refreshToken({
        refresh: getRefreshToken(),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Refresh token failed");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/UPDATE_USER",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.updateUser(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update user failed");
    }
  }
);

export const getReferrals = createAsyncThunk(
  "user/GET_REFERRALS",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getReferrals(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update user failed");
    }
  }
);

export const getReferralStatistics = createAsyncThunk(
  "user/GET_REFERRAL_STATISTICS",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getReferralsStatistics(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update user failed");
    }
  }
);
