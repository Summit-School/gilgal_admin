import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const getTestimonyContent = createAsyncThunk("/leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const testimonySlice = createSlice({
  name: "testimony",
  initialState: {
    isLoading: false,
    testimonies: [],
  },
  reducers: {
    addNewTestimony: (state, action) => {
      let { newTestimonyObj } = action.payload;
      state.testimonies = [...state.testimonies, newTestimonyObj];
    },

    deleteTestimony: (state, action) => {
      let { index } = action.payload;
      state.testimonies.splice(index, 1);
    },
  },

  extraReducers: {
    [getTestimonyContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getTestimonyContent.fulfilled]: (state, action) => {
      state.testimonies = action.payload.data;
      state.isLoading = false;
    },
    [getTestimonyContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewTestimony, deleteTestimony } = testimonySlice.actions

export default testimonySlice.reducer