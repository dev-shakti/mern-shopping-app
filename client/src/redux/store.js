import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductReducer from "./admin/productSlice"
import shoppingProductReducer from "./shop/productSlice"
import shoppingCartReducer from "./shop/cartSlice"
import addressReducer from "./shop/addressSlice"
import shoppingOrderReducer from "./shop/orderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts:adminProductReducer,
    shoppingProducts:shoppingProductReducer,
    shoppingCart:shoppingCartReducer,
    address:addressReducer,
    shoppingOrderSlice:shoppingOrderReducer
  },
});
