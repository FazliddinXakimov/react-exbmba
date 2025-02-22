import { createSlice } from "@reduxjs/toolkit";
import { getBanners } from "../actions/referencesActions";

const initialState = { banners: [] };

const referencesSlice = createSlice({
  name: "references",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.count += 1;
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.banners = action.payload;
    });
    // .addCase();
  },
});

// export const {} = referencesSlice.actions;
export default referencesSlice.reducer;
