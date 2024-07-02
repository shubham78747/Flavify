import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItemsList: [],
    totalQuantity: 0,
    totalPrice: 0,
    pastOrdersList: []
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
            console.log({state, payload: action.payload})
            state.pastOrdersList = action.payload
        }
    },
});

export const {addItemToCart, removeItemFromCart, clearCart, setAllPastOrders} = cartSlice.actions;

export default cartSlice.reducer;
