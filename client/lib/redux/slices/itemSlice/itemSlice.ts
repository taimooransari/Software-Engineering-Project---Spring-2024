/* Core */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface ItemSliceState {
    items: Item[];
}

const initialState: ItemSliceState = {
    items: [],
};

export const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<{ id: number }>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        updateItem: (state, action: PayloadAction<Item>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        setItems: (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
        }
    },
});

export const { addItem, removeItem, updateItem } = itemSlice.actions;

export default itemSlice.reducer;
