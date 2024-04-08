/* Instruments */
import { counterSlice } from "./slices";
import { cartSlice } from "./slices";
import { authSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  cart: cartSlice.reducer,
  auth: authSlice.reducer,
};
