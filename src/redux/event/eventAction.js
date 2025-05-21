import { createAsyncThunk } from "@reduxjs/toolkit";
import { logInUserRequest, registerUserRequest } from "../../api/authRequest";
import {
  addEventRequest,
  getEventRequest,
  listEventRequest,
} from "../../api/eventRequest";

export const listEventAction = createAsyncThunk(
  "listEvent",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await listEventRequest(formData, config);

      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

export const addEventAction = createAsyncThunk(
  "addEvent",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await addEventRequest(formData, config);
      onComplete(response.data);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

export const getEventAction = createAsyncThunk(
  "getEvent",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await getEventRequest(formData, config);

      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
