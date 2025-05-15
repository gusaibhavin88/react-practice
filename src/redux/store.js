import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth/authSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export { store };
