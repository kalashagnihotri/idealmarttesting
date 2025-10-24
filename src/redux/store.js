import { configureStore } from "@reduxjs/toolkit";
import homeProductReducer from "@/features/home/homeProductsSlice";
import productReducer from "@/features/products/productsSlice";
import cartReducer from "@/features/cart/cartSlice";
import comboReducer from "@/features/combos/combosSlice";
const store = configureStore({
    reducer: {
        homeProducts: homeProductReducer,
        products: productReducer,
        cart: cartReducer,
        combos: comboReducer,
    },
});

export default store;