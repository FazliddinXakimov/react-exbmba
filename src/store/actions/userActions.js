import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/user-service";

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
