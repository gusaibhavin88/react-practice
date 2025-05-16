import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import eventReducer from "./event/eventSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
});

export const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};
