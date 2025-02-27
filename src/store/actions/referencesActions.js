import { createAsyncThunk } from "@reduxjs/toolkit";
import ReferencesService from "../../services/references-service";

export const getBanners = createAsyncThunk(
  "references/GET_BANNERS",
  async (params, { rejectWithValue }) => {
    try {
      const response = await ReferencesService.getBanners(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch banners");
    }
  }
);

export const getTestTypes = createAsyncThunk(
  "references/GET_TEST_TYPES",
  async (params, { rejectWithValue }) => {
    try {
      const response = await ReferencesService.getTestTypes(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch banners");
    }
  }
);
