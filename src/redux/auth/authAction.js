import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserRequest } from "../../api/authRequest";

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
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
