import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./slices";

const userTransform = createTransform(
  (inboundState) => {
    return {
      user: inboundState.user,
      isLoggedIn: inboundState.isLoggedIn, // Ensure isLoggedIn is persisted
    };
  },
  (outboundState) => outboundState,
  { whitelist: ["user", "isLoggedIn"] }
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "isLoggedIn"], // Ensure isLoggedIn is included
  transforms: [userTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
