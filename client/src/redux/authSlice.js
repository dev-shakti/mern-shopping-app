import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null, // Optional: Add an error field to manage errors
};

// Async Thunk for registering a user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4415/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Async Thunk for logging in a user
export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:4415/api/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);


// Async Thunk for verify user
export const checkAuth = createAsyncThunk(
  "/auth/verify",

  async () => {
    const response = await axios.get(
      "http://localhost:4415/api/auth/verify",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);



// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Handle registerUser
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user =null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload; 
      });

    // Handle loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload; 
      });

       // Handle autheticate user
    builder
    .addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null; 
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success;
      state.error = null;
    })
    .addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload; 
    });
  },
});

// Export actions and reducer
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
