import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/userActions";
import { setAccessToken, setRefreshToken } from "../../utils/localeStorages";

const initialState = {
  user: null,
  banners: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        if (!action.payload.success) {
          console.log("action.payloat", action.payload);
        } else {
          const { access, refresh } = action.payload;

          setAccessToken(access);
          setRefreshToken(refresh);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
