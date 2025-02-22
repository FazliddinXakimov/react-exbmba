import { configureStore } from "@reduxjs/toolkit";
import referencesReducer from "./slices/referencesSlice";

export const store = configureStore({
  reducer: {
    references: referencesReducer,
  },
});
