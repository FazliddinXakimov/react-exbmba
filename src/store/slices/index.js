import { combineReducers } from "@reduxjs/toolkit";
import referencesReducer from "./referencesSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  references: referencesReducer,
  user: userReducer,
});

export default rootReducer;
