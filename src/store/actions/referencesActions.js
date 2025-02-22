import { createAsyncThunk } from "@reduxjs/toolkit";
import ReferencesService from "../../services/references-service";

export const getBanners = createAsyncThunk(
  "references/GET_BANNERS",
  async (params) => {
    const response = await ReferencesService.getBanners(params);
    return response;
  }
);

export const getTestTypes = createAsyncThunk(
  "references/GET_TEST_TYPES",
  async (params) => {
    const response = await ReferencesService.getTestTypes(params);
    return response;
  }
);
