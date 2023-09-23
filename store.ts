import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./app/redux/cart.reducer";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
