import { combineReducers } from "@reduxjs/toolkit";
import referencesReducer from "./referencesSlice";
import userReducer from "./userSlice";
import modalReducer from './modalSlice'

const rootReducer = combineReducers({
  references: referencesReducer,
  user: userReducer,
  modal: modalReducer
});

export default rootReducer;
