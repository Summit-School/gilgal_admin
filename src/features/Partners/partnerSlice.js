import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPartnerContent = createAsyncThunk("leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const partnerSlice = createSlice({
  name: "partner",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewPartner: (state, action) => {
      let { newPartnerObj } = action.payload;
      state.partner = [...state.partner, newPartnerObj];
    },

    deletePartner: (state, action) => {
      let { index } = action.payload;
      state.partner.splice(index, 1);
    },
  },

  extraReducers: {
    [getPartnerContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getPartnerContent.fulfilled]: (state, action) => {
      state.partner = action.payload.data;
      state.isLoading = false;
    },
    [getPartnerContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewPartner, deletePartner } = partnerSlice.actions;

export default partnerSlice.reducer;
