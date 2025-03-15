import { createSlice } from "@reduxjs/toolkit";
import { getMyResults } from "../actions/testActions";

const initialState = {
  myResults: {
    count: 0,
    results: [],
  },
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.count += 1;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyResults.fulfilled, (state, action) => {
        state.loading = false;
        console.log("actions", action.payload);
        state.myResults = { ...action.payload };
      })
      .addCase(getMyResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = testSlice.actions;
export default testSlice.reducer;
