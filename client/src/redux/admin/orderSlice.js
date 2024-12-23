import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
};


export const getAllOrdersByAdmin = createAsyncThunk(
  "/order/getAllOrdersByAdmin",
  async () => {
    const response = await axios.get(
      'http://localhost:4415/api/admin/orders/get'
    );

    return response.data;
  }
);

export const getOrderDetailsByAdmin = createAsyncThunk(
  "/order/getOrderDetailsByAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:4415/api/admin/orders/details/${id}`
    );

    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
     //get all orders addcase
     .addCase(getAllOrdersByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList=action.payload.data
      })
      .addCase(getAllOrdersByAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList=[]
      })
       //get orderDetails addcase
       .addCase(getOrderDetailsByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails=action.payload.data
      })
      .addCase(getOrderDetailsByAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails=null
      })
  },
});

export default adminOrderSlice.reducer;
