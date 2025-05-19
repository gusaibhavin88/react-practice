import { createSlice } from "@reduxjs/toolkit";
import { addEventAction, listEventAction } from "./eventAction";

const initialState = {
  error: null,
  message: null,
  events: [],
  loading: false,
  addEvent: {
    loading: false,
  },
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listEventAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listEventAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.events = action?.payload?.data?.data?.users;
      })
      .addCase(listEventAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addEventAction.pending, (state, action) => {
        state.addEvent.loading = false;
      })
      .addCase(addEventAction.fulfilled, (state, action) => {
        state.addEvent.loading = true;
      })
      .addCase(addEventAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default eventSlice.reducer;
