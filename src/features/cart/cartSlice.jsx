import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice += product.discountPrice || product.price;
            } else {
                state.items.push({
                    ...product,
                    quantity: 1,
                    totalPrice: product.discountPrice || product.price,
                });
            }

            state.totalQuantity += 1;
            state.totalPrice += product.discountPrice || product.price;
        },

        removeFromCart(state, action) {
            const productId = action.payload;
            const existingItem = state.items.find((item) => item.id === productId);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.totalPrice;
                state.items = state.items.filter((item) => item.id !== productId);
            }
        },

        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem && quantity > 0) {
                const pricePerItem =
                    existingItem.totalPrice / existingItem.quantity;

                state.totalQuantity += quantity - existingItem.quantity;
                state.totalPrice +=
                    pricePerItem * (quantity - existingItem.quantity);

                existingItem.quantity = quantity;
                existingItem.totalPrice = pricePerItem * quantity;
            }
        },


        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
