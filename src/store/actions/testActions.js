import TestService from "../../services/test-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMyResults = createAsyncThunk(
  "test/GET_MY_RESULTS",
  async (params, { rejectWithValue }) => {
    try {
      const response = await TestService.getMyResults(params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch selections"
      );
    }
  }
);
