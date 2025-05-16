import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
});

export const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};
