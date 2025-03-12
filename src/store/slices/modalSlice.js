import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutModal: false,
  leadersFilterModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setLogoutModal: (state, action) => {
      state.logoutModal = action.payload; // Correctly accessing payload
    },
    setLeadersFilterModal: (state, action) => {
      state.leadersFilterModal = action.payload;
    },
  },
});

export const { setLogoutModal, setLeadersFilterModal } = modalSlice.actions;
export default modalSlice.reducer;
