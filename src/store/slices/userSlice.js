import { createSlice } from "@reduxjs/toolkit";
import { getMe, login } from "../actions/userActions";
import { setAccessToken, setRefreshToken } from "../../utils/localeStorages";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
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
        console.log("action.payload", action.payload);
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      });
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
