import { createSlice } from "@reduxjs/toolkit";
import { logInUserAction, registerUserAction } from "./authAction";

const initialState = {
  error: null,
  message: null,
  isAuthenticated: false,
  userData: null,
  loginUser: {},
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
        console.log(action.payload, "kjkjjl");
        state.loading = false;
        state.isAuthenticated = true;
        state.userData = action?.user?.payload?.data?.user;
      })
      .addCase(logInUserAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
