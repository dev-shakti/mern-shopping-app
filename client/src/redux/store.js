import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductReducer from "./admin/productSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts:adminProductReducer
  },
});
