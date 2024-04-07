/* Core */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
    textAddress: string;
    mapLink: string;
}

interface OrderItem {
    itemId: string;
    quantity: number;
}

interface Order {
    id: number;
    orderTime: string;
    customerContact: string;
    note: string;
    addressToDeliver: Address;
    orderStatus: string;
    items: { [itemId: string]: number };
    deliveryFee: number;
    totalBill: number;
}

interface OrderSliceState {
    orders: Order[];
}

const initialState: OrderSliceState = {
    orders: [],
};

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            const index = state.orders.findIndex(order => order.id === action.payload.id);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
        addOrderBatch: (state, action: PayloadAction<Order[]>) => {
            state.orders.push(...action.payload);
        },
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },
    },
});

export const { addOrder, updateOrder, addOrderBatch, setOrder } = orderSlice.actions;

export default orderSlice.reducer;
