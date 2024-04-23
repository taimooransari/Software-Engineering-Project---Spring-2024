/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// store/cartSlice.ts
interface CartItem {
    id: string; // Unique product or item ID
    name: string;
    price: number;
    quantity: number;
}


const initialState: CartSliceState = {
    items: [],
};


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find(item => item.name === action.payload.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.items.push(action.payload);
        }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
        const itemIndex = state.items.findIndex(item => item.name === action.payload.name);
        if (itemIndex !== -1) {
            if (state.items[itemIndex].quantity > 1) {
                state.items[itemIndex].quantity--;
            } else {
                state.items.splice(itemIndex, 1);
            }
        }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
        const item = state.items.find(item => item.id === action.payload.id);
        if (item) {
            item.quantity = action.payload.quantity;
        }
    },
    clearCart: (state) => {
        state.items = [];
    },
},
});

/* Types */
export interface CartSliceState {
    items: CartItem[];
}
