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

// 
export const getEvents = createAsyncThunk(
    "app/getEvents",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/events/`);
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

export const addEvent = createAsyncThunk(
    "app/addEvent",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/events/create`, data, {
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

export const updateEvent = createAsyncThunk(
    "app/updateEvent",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/events/update/${data.id}`, data.formData, {
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

export const deleteEvent = createAsyncThunk(
    "app/deleteEvent",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/events/delete/${id}`);
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

// 
export const getCategories = createAsyncThunk(
    "app/getCategories",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/categories/`);
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

export const addCategory = createAsyncThunk(
    "app/addCategory",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/categories/create`, data, {
                headers: {
                    "Content-Type": "application/json",
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

export const updateCategory = createAsyncThunk(
    "app/updateCategory",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/categories/update/${data.id}`, data, {
                headers: {
                    "Content-Type": "application/json",
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

export const deleteCategory = createAsyncThunk(
    "app/deleteCategory",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${base_url}/categories/delete/${id}`);
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

// 
export const getGalleryImages = createAsyncThunk(
    "app/getGalleryImages",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/gallery/`);
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

export const addImages = createAsyncThunk(
    "app/addImages",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${base_url}/gallery/create`, data, {
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

export const updateGallery = createAsyncThunk(
    "app/updateGallery",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/gallery/update/`, data, {
                headers: {
                    "Content-Type": "application/json",
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

// 
export const getBookings = createAsyncThunk(
    "app/getBookings",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${base_url}/booking/`);
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

export const updateBooking = createAsyncThunk(
    "app/updateBooking",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${base_url}/booking/update/${data.id}`, data, {
                headers: {
                    "Content-Type": "application/json",
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


export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {},

});

// export const {  } = appSlice.actions;

export default appSlice.reducer;
