import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTeamContent = createAsyncThunk("leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const teamSlice = createSlice({
  name: "Team",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewTeam: (state, action) => {
      let { newTeamObj } = action.payload;
      state.team = [...state.team, newTeamObj];
    },

    deleteTeam: (state, action) => {
      let { index } = action.payload;
      state.team.splice(index, 1);
    },
  },

  extraReducers: {
    [getTeamContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getTeamContent.fulfilled]: (state, action) => {
      state.team = action.payload.data;
      state.isLoading = false;
    },
    [getTeamContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewTeam, deleteTeam } = teamSlice.actions;

export default teamSlice.reducer;
