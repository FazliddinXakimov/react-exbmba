import { createSlice } from "@reduxjs/toolkit";
import { getBanners, getTestTypes } from "../actions/referencesActions";

const initialState = {
  banners: [],
  testTypes: [],
  loading: false,
  error: null,
};

const referencesSlice = createSlice({
  name: "references",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET BANNERS
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET TEST TYPES
      .addCase(getTestTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.testTypes = action.payload;
      })
      .addCase(getTestTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = referencesSlice.actions;
export default referencesSlice.reducer;
