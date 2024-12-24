import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"

import adminProductReducer from "./admin/productSlice"
import adminOrderReducer from "./admin/orderSlice"

import shoppingProductReducer from "./shop/productSlice"
import shoppingCartReducer from "./shop/cartSlice"
import addressReducer from "./shop/addressSlice"
import shoppingOrderReducer from "./shop/orderSlice"
import searchReducer from "./shop/searchSlice"
import productReviewReducer from "./shop/productReviewSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts:adminProductReducer,
    adminOrderSlice:adminOrderReducer,
    
    shoppingProducts:shoppingProductReducer,
    shoppingCart:shoppingCartReducer,
    address:addressReducer,
    shoppingOrderSlice:shoppingOrderReducer,
    productSearch:searchReducer,
    productReview:productReviewReducer
  },
});
