import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getHostCenterContent = createAsyncThunk("leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const hostcenterSlice = createSlice({
  name: "Host Center",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewHostCenter: (state, action) => {
      let { newHostCenterObj } = action.payload;
      state.hostcenters = [...state.hostcenters, newHostCenterObj];
    },

    deleteHostCenter: (state, action) => {
      let { index } = action.payload;
      state.hostcenters.splice(index, 1);
    },
  },

  extraReducers: {
    [getHostCenterContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getHostCenterContent.fulfilled]: (state, action) => {
      state.hostcenters = action.payload.data;
      state.isLoading = false;
    },
    [getHostCenterContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewHostCenter, deleteHostCenter } = hostcenterSlice.actions;

export default hostcenterSlice.reducer;
