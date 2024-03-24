/* Instruments */
import { counterSlice } from "./slices";
import { cartSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  cart: cartSlice.reducer,
};
