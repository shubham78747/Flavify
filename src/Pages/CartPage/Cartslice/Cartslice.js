import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItemsList: [],
    totalQuantity: 0,
    totalPrice: 0,
    pastOrdersList: [],
    isRegistered: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            state.cartItemsList = action.payload
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
                state.totalPrice -= existingItem.price;
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
                state.totalPrice -= existingItem.price;
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        setAllPastOrders(state, action) {
            state.pastOrdersList = action.payload
        },
        setUserRegistered(state, action) {
            state.isRegistered = action.payload
        }
    },
});

export const {addItemToCart, removeItemFromCart, clearCart, setAllPastOrders, setUserRegistered} = cartSlice.actions;

export default cartSlice.reducer;
