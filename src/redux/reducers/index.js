import { combineReducers } from "@reduxjs/toolkit";
import currencyReducer from "./currencyReducer";
import authReducer from "./authReducer";
const rootReducer = combineReducers({
  currencyReducer: currencyReducer,
  authReducer: authReducer,
});
export default rootReducer;
