import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successModal: false,
  successModalText: "",
  failModal: false,
  failModalText: "",
  logoutModal: false,
  leadersFilterModal: false,
  inviteFriendsModal: false,
  languageModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setSuccessModal: (state, action) => {
      state.successModal = action.payload.modal;
      state.successModalText = action.payload.text || "";
    },
    setFailModal: (state, action) => {
      state.failModal = action.payload.modal;
      state.failModalText = action.payload.text || "";
    },
    setLogoutModal: (state, action) => {
      state.logoutModal = action.payload;
    },
    setLeadersFilterModal: (state, action) => {
      state.leadersFilterModal = action.payload;
    },
    setInviteFriendsModal: (state, action) => {
      state.inviteFriendsModal = action.payload;
    },
    setLanguageModal: (state, action) => {
      state.languageModal = action.payload;
    },
  },
});

export const {
  setLogoutModal,
  setLeadersFilterModal,
  setInviteFriendsModal,
  setSuccessModal,
  setFailModal,
  setLanguageModal,
} = modalSlice.actions;
export default modalSlice.reducer;
