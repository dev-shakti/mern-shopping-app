import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productList: [],
  productDetails: null,
  isLoading: false,
};

export const getFilterProducts = createAsyncThunk(
  "/products/getFilterProducts",
  async ({ filterParams, sortParams }) => {
 
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const results = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );

    return results?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const results = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );

    return results?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    resetProductDetails:(state) => {
      state.productDetails=null
    }
  },
  extraReducers: (builders) => {
    builders
      .addCase(getFilterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilterProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getFilterProducts.rejected, (state) => {
        state.isLoading = false;
        state.productDetails =null;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const {resetProductDetails}=shoppingProductSlice.actions
export default shoppingProductSlice.reducer;
