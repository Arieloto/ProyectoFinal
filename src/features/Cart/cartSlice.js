
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            user: "userIdLogged",
            updatedAt: new Date().toLocaleString(),
            total: null,
            items: [],
        },
    },
    reducers: {
        addCartItem: (state, { payload }) => {
         
            const productRepeated = state.value.items.find(
                (item) => item.id === payload.id
            );
            if (productRepeated) {
                const itemsUpdated = state.value.items.map((item) => {
                    if (item.id === payload.id) {
                        item.quantity += payload.quantity;
                        return item;
                    }
                    return item;
                });
                const total = itemsUpdated.reduce(
                    (acc, currentItem) =>
                        (acc += currentItem.price * currentItem.quantity),
                    0
                );
                state.value = {
                    ...state.value,
                    items: itemsUpdated,
                    total,
                    updatedAt: new Date().toLocaleString(),
                };
            } else {
                state.value.items.push(payload);
                const total = state.value.items.reduce(
                    (acc, currentItem) =>
                        (acc += currentItem.price * currentItem.quantity),
                    0
                );
                state.value = {
                    ...state.value,
                    total,
                    updatedAt: new Date().toLocaleString(),
                };
            }
        },
        removeCartItem: (state, { payload }) => {
      
            state.value.items = state.value.items.filter(item => item.id !== payload.id);
            const total = state.value.items.reduce(
                (acc, currentItem) =>
                    (acc += currentItem.price * currentItem.quantity),
                0
            );
            state.value = {
                ...state.value,
                total,
                updatedAt: new Date().toLocaleString(),
            };
        },
        decrementCartItem: (state, { payload }) => {
           
            const itemToDecrement = state.value.items.find(item => item.id === payload.id);
            if (itemToDecrement && itemToDecrement.quantity > 1) {
                itemToDecrement.quantity--;
                const total = state.value.items.reduce(
                    (acc, currentItem) =>
                        (acc += currentItem.price * currentItem.quantity),
                    0
                );
                state.value = {
                    ...state.value,
                    total,
                    updatedAt: new Date().toLocaleString(),
                };
            }
        },
        incrementCartItem: (state, { payload }) => {
        
            const itemToIncrement = state.value.items.find(item => item.id === payload.id);
            if (itemToIncrement) {
                itemToIncrement.quantity++;
                const total = state.value.items.reduce(
                    (acc, currentItem) =>
                        (acc += currentItem.price * currentItem.quantity),
                    0
                );
                state.value = {
                    ...state.value,
                    total,
                    updatedAt: new Date().toLocaleString(),
                };
            }
        },
    },
});

export const { addCartItem, removeCartItem, decrementCartItem, incrementCartItem } = cartSlice.actions;
export default cartSlice.reducer;
