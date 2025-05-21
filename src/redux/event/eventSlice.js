import { createSlice } from "@reduxjs/toolkit";
import { addEventAction, getEventAction, listEventAction } from "./eventAction";

const initialState = {
  error: null,
  message: null,
  events: [],
  details: null,
  loading: false,
  addEvent: {
    loading: false,
  },
  eventDetails: {
    loading: false,
  },
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.details = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listEventAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listEventAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.events = action?.payload?.data?.data?.events;
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
      })
      // Get event details
      .addCase(getEventAction.pending, (state) => {
        state.eventDetails.loading = true;
        state.error = null;
      })
      .addCase(getEventAction.fulfilled, (state, action) => {
        state.eventDetails.loading = false;
        state.details = action.payload?.data?.data || null;
        console.log(state.details, "fwfwfwfw");
      })
      .addCase(getEventAction.rejected, (state, action) => {
        state.eventDetails.loading = false;
        state.error = action.error?.message || "Failed to fetch event details";
      });
  },
});

export default eventSlice.reducer;
export const { clearDetail } = eventSlice.actions; // Export the clearError action
