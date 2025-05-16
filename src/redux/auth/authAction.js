import { createAsyncThunk } from "@reduxjs/toolkit";
import { logInUserRequest, registerUserRequest } from "../../api/authRequest";

export const registerUserAction = createAsyncThunk(
  "registerUser",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await registerUserRequest(formData, config);
      onComplete(response.data);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

export const logInUserAction = createAsyncThunk(
  "logInUser",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await logInUserRequest(formData, config);
      onComplete(response.data);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
