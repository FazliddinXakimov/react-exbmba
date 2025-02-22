import { createSlice } from "@reduxjs/toolkit";
import { getBanners, getTestTypes } from "../actions/referencesActions";

const initialState = { banners: [], testTypes: [] };

const referencesSlice = createSlice({
  name: "references",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.count += 1;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
      })
      .addCase(getTestTypes.fulfilled, (state, action) => {
        state.testTypes = action.payload;
      });
  },
});

// export const {} = referencesSlice.actions;
export default referencesSlice.reducer;
