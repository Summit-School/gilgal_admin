import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNewsContent = createAsyncThunk("leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNews: (state, action) => {
      let { newsObj } = action.payload;
      state.news = [...state.news, newsObj];
    },

    deleteNewss: (state, action) => {
      let { index } = action.payload;
      state.news.splice(index, 1);
    },
  },

  extraReducers: {
    [getNewsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getNewsContent.fulfilled]: (state, action) => {
      state.news = action.payload.data;
      state.isLoading = false;
    },
    [getNewsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNews, deleteNews } = newsSlice.actions;

export default newsSlice.reducer;
