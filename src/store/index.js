import { configureStore } from "@reduxjs/toolkit";
import referencesReducer from "./slices/referencesSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    references: referencesReducer,
    user: userReducer,
  },
});
