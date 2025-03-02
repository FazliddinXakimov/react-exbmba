import { createAsyncThunk } from "@reduxjs/toolkit";
import ReferencesService from "../../services/references-service";

export const getBanners = createAsyncThunk(
  "references/GET_BANNERS",
  async ({ apiType, params }, { rejectWithValue }) => {
    try {
      const response = await ReferencesService.getBanners(params);
      return { apiType, response };
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

export const getSelections = createAsyncThunk(
  "references/GET_SELECTIONS",
  async ({ apiType, params }, { rejectWithValue }) => {
    try {
      const response = await ReferencesService.getSelections(params);
      return { response, apiType };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch selections"
      );
    }
  }
);

export const getSubjects = createAsyncThunk(
  "references/GET_SUBJECTS",
  async ({ apiType, params }, { rejectWithValue }) => {
    try {
      const response = await ReferencesService.getSubjects(params);
      return { apiType, response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch subjects"
      );
    }
  }
);
