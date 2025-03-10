import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setLogoutModal: (state, action) => {
      state.logoutModal = action.payload; // Correctly accessing payload
    },
  },
});

export const { setLogoutModal } = modalSlice.actions;
export default modalSlice.reducer;
