import { createSlice } from "@reduxjs/toolkit";
import { getLeaders, getMe, login } from "../actions/userActions";
import { setAccessToken, setRefreshToken } from "../../utils/localeStorages";

const initialState = {
  user: {},
  leaders: {
    results: [],
    count: 0,
  },
  isLoggedIn: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        if (!action.payload.error_key) {
          const { access, refresh } = action.payload;
          setAccessToken(access);
          setRefreshToken(refresh);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getMe
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = Object.keys(action.payload).length > 0;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      })
      // getLeaders
      .addCase(getLeaders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaders.fulfilled, (state, action) => {
        state.loading = false;
        state.leaders = { ...action.payload };
      })
      .addCase(getLeaders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuth } = userSlice.actions;
export default userSlice.reducer;
