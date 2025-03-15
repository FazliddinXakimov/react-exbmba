import { combineReducers } from "@reduxjs/toolkit";
import referencesReducer from "./referencesSlice";
import userReducer from "./userSlice";
import modalReducer from './modalSlice'
import testReducer from './testSlice'

const rootReducer = combineReducers({
  references: referencesReducer,
  user: userReducer,
  modal: modalReducer, 
  test: testReducer
});

export default rootReducer;
