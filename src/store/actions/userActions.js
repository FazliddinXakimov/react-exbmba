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
