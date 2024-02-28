import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProgramsContent = createAsyncThunk("leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const programSlice = createSlice({
  name: "Programs",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewProgram: (state, action) => {
      let { newProgramObj } = action.payload;
      state.programs = [...state.programs, newProgramObj];
    },

    deleteProgram: (state, action) => {
      let { index } = action.payload;
      state.programs.splice(index, 1);
    },
  },

  extraReducers: {
    [getProgramsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getProgramsContent.fulfilled]: (state, action) => {
      state.programs = action.payload.data;
      state.isLoading = false;
    },
    [getProgramsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewProgram, deleteProgram } = programSlice.actions;

export default programSlice.reducer;
