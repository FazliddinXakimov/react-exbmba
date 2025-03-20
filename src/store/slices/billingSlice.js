import { createSlice } from "@reduxjs/toolkit";
import { getSubscriptions } from "../actions/billlingActions";

const initialState = {
  mySubscriptions: {
    count: 0,
    results: [],
  },
};

const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.count += 1;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.mySubscriptions = { ...action.payload };
      })
      .addCase(getSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = billingSlice.actions;
export default billingSlice.reducer;
