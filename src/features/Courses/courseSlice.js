import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCourseContent = createAsyncThunk("leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const courseSlice = createSlice({
  name: "Courses",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewCourse: (state, action) => {
      let { newCourseObj } = action.payload;
      state.courses = [...state.courses, newCourseObj];
    },

    deleteCourse: (state, action) => {
      let { index } = action.payload;
      state.courses.splice(index, 1);
    },
  },

  extraReducers: {
    [getCourseContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getCourseContent.fulfilled]: (state, action) => {
      state.courses = action.payload.data;
      state.isLoading = false;
    },
    [getCourseContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewCourse, deleteCourse } = courseSlice.actions;

export default courseSlice.reducer;
