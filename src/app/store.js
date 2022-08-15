import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/Auth/userSlice";
import cartReducer from "features/Cart/cartSlice";
import categoryReducer from "features/Product/components/Filter/categorySlice";
import countReducer from "../features/Count/countSlice";

const rootReducer = {
  count: countReducer,
  user: userReducer,
  category: categoryReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
