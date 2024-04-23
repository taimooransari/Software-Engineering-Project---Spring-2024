/* Core */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface ItemSliceState {
    items: Item[];
}

const initialState: ItemSliceState = {
    items: [],
};

const additemdb = async (item: Item) => {
    const response = await fetch("http://localhost:3000/api/inventory/addinventory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error("Failed to add item");
    }

    return response.json();
}

const updateitemdb = async (item: Item) => {

    // console.log(111, item);

    const response = await fetch(`http://localhost:3000/api/inventory/updateinventory/${item._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error("Failed to update item");
    }

    return response.json();
}




const deleteitemdb = async (id: string) => {

    // console.log(111, item);
    // console.log(222, item)
    const response = await fetch(`http://localhost:3000/api/inventory/deleteinventory/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error("Failed to delete item");
    }

    return response.json();
}





export const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Item>) => {
            const promise = additemdb(action.payload);
            console.log(promise)
            // if(promise ){
                state.items.push(action.payload);
            // }
            
        },
        removeItem: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.items.findIndex(item => item._id === action.payload.id);
            if (index !== -1) {
                deleteitemdb(action.payload.id);
                state.items.splice(index, 1);
            }
        },
        updateItem: (state, action: PayloadAction<Item>) => {
            const index = state.items.findIndex(item => item._id === action.payload._id);
            if (index !== -1) {
                const promise = updateitemdb(action.payload);
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
