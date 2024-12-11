import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productList: [],
  isLoading: false,
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {

    const results = await axios.post(
      "http://localhost:4415/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return results?.data?.products;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const results = await axios.get(
      "http://localhost:4415/api/admin/products/get"
    );

    return results?.data?.products;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ formData, id }) => {
    const results = await axios.put(
      `http://localhost:4415/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return results?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async () => {
    const results = await axios.delete(
      `http://localhost:4415/api/admin/products/delete/${id}`
    );

    return results?.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;
