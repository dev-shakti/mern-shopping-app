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
      `${import.meta.env.VITE_API_URL}/api/admin/orders/get`
    );

    return response.data;
  }
);

export const getOrderDetailsByAdmin = createAsyncThunk(
  "/order/getOrderDetailsByAdmin",
  async (orderId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/details/${orderId}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
    "/order/updateOrderStatus",
    async ({id,orderStatus}) => {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,
        {orderStatus}
      );
  
      return response.data;
    }
  );

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails:(state) => {
        state.orderDetails=null
    }
  },
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

export const {resetOrderDetails}=adminOrderSlice.actions
export default adminOrderSlice.reducer;
