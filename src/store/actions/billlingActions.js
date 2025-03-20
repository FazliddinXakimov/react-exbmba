import { createAsyncThunk } from "@reduxjs/toolkit";
import BillingService from "../../services/billing-service";

export const getSubscriptions = createAsyncThunk(
  "billing/GET_SUBSCRIPTIONS",
  async (params, { rejectWithValue }) => {
    try {
      const response = await BillingService.getSubscriptions(params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch selections"
      );
    }
  }
);
