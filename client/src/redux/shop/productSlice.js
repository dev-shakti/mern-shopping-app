import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productList: [],
  isLoading: false,
};

export const getFilterProducts = createAsyncThunk(
  "/products/getFilterProducts",
  async () => {
    const results = await axios.get(
      "http://localhost:4415/api/shop/products/get"
    );

    return results?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: () => {},
  extraReducers: (builders) => {
    builders
    .addCase(getFilterProducts.pending,(state) => {
        state.isLoading=true;
    })
    .addCase(getFilterProducts.fulfilled,(state,action) => {
        state.isLoading=false;
        state.productList=action.payload.data;
    })
    .addCase(getFilterProducts.rejected,(state) => {
        state.isLoading=false;
        state.productList=[];
    })
  },
});

export default shoppingProductSlice.reducer;
