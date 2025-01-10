import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading:false,
   reviews:[]
};

export const addProductReview= createAsyncThunk(
  "/review/addProductReview",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
      formData

    );

    return response.data;
  }
);

export const getProductReviews= createAsyncThunk(
    "/review/getProductReviews",
    async (productId) => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`,  
      );
  
      return response.data;
    }
  );

const productReviewSlice= createSlice({
  name: "productReviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews=action.payload.data
      })
      .addCase(getProductReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews=[]
      })
  },
});

export default productReviewSlice.reducer;
