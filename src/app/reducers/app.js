import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = `${process.env.REACT_APP_BASE_URL}/api/${process.env.REACT_APP_API_VERSON}`;

const initialState = {};

export const getRooms = createAsyncThunk(
    "app/getRooms",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/rooms/`);
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const addRoom = createAsyncThunk(
    "app/addRoom",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/rooms/create`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateRoom = createAsyncThunk(
    "app/updateRoom",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/rooms/update-room/${data.id}`, data.formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteRoom = createAsyncThunk(
    "app/deleteRoom",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/rooms/delete-room/${id}`);
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {},

});

// export const {  } = appSlice.actions;

export default appSlice.reducer;
