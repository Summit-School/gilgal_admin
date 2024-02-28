import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEventContent = createAsyncThunk("leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const eventSlice = createSlice({
  name: "events",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewEvents: (state, action) => {
      let { newEventsObj } = action.payload;
      state.events = [...state.events, newEventsObj];
    },

    deleteEvents: (state, action) => {
      let { index } = action.payload;
      state.events.splice(index, 1);
    },
  },

  extraReducers: {
    [getEventContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getEventContent.fulfilled]: (state, action) => {
      state.events = action.payload.data;
      state.isLoading = false;
    },
    [getEventContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewEvents, deleteEvents } = eventSlice.actions;

export default eventSlice.reducer;
