/* Instruments */
import { counterSlice, orderSlice, cartSlice,itemSlice, authSlice } from "./slices";
// import { cartSlice } from "./slices";
// import { itemSlice } from "./slices";
// import { orderSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  cart: cartSlice.reducer,
  items: itemSlice.reducer,
orders: orderSlice.reducer,
auth: authSlice.reducer,
};
