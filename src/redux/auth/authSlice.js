import { createSlice } from "@reduxjs/toolkit";
import { logInUserAction, registerUserAction } from "./authAction";

const initialState = {
  error: null,
  message: null,
  isAuthenticated: false,
  userData: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(logInUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logInUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userData = action?.payload?.data?.data;
        localStorage.setItem("token", action?.payload?.data?.data?.token);
      })
      .addCase(logInUserAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
