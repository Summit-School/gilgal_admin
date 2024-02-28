import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGalleryContent = createAsyncThunk("leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const gallarySlice = createSlice({
  name: "gallery",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewGallery: (state, action) => {
      let { newGalleryObj } = action.payload;
      state.gallery = [...state.gallery, newGalleryObj];
    },

    deleteGallery: (state, action) => {
      let { index } = action.payload;
      state.gallery.splice(index, 1);
    },
  },

  extraReducers: {
    [getGalleryContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getGalleryContent.fulfilled]: (state, action) => {
      state.gallery = action.payload.data;
      state.isLoading = false;
    },
    [getGalleryContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewGallery, deleteGallery } = gallarySlice.actions;

export default gallarySlice.reducer;
