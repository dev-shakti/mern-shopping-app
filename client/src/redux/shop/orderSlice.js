import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:4415/api/shop/order/create",
      orderData
    );

    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ payerId, paymentId, orderId }) => {
    const response = await axios.post(
      "http://localhost:4415/api/shop/order/capture",
      { payerId, paymentId, orderId }
    );

    return response.data;
  }
);

export const getAllOrders = createAsyncThunk(
  "/order/getAllOrders",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:4415/api/shop/order/get/${userId}`
    );

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:4415/api/shop/order/details/${id}`
    );

    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails:(state) => {
      state.orderDetails=null
    }
  },
  extraReducers: (builders) => {
    builders
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })

      //get all orders by user addcase
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList=action.payload.data
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList=[]
      })

       //get orderDetails addcase
       .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails=action.payload.data
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails=null
      })
  },
});

export const {resetOrderDetails}=shoppingOrderSlice.actions
export default shoppingOrderSlice.reducer;
