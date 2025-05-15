import { createSlice } from "@reduxjs/toolkit";
import { registerUserAction } from "./authAction";

const initialState = {
  error: null,
  message: null,
  isAuthenticated: false,
  userData: null,
  loginUser: {},
  registerUser: { loading: false },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.pending, (state, action) => {
        state.registerUser.loading = true;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.registerUser.loading = false;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.registerUser.loading = false;
      });
  },
});

export default authSlice.reducer;
