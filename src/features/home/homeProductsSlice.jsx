import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BaseUrl = import.meta.env.VITE_BACKEND_API_URL
// Async thunk to fetch all products
export const fetchHomeProducts = createAsyncThunk(
    "homeProducts/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BaseUrl}/api/products/home/`
            );
            return response.data; // Assuming this API returns a unified object with all categories
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);


const homeProductsSlice = createSlice({
    name: "homeProducts",
    initialState: {
        topOffers: [],
        topFoodOffers: [],
        meatOffers: [],
        sweetsOffers: [],
        limitedOffers: [],
        limitedFoodOffers: [],
        convenienceStoreDeals: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeProducts.fulfilled, (state, action) => {
                state.loading = false;

                // Assuming the API response structure has these keys
                state.topOffers = action.payload["top-Offers"] || [];
                state.topFoodOffers = action.payload["top-Food-Offers"] || [];
                state.meatOffers = action.payload["meat-Offers"] || [];
                state.sweetsOffers = action.payload["sweets-Offers"] || [];
                state.limitedOffers = action.payload["limited-Offers"] || [];
                state.limitedFoodOffers = action.payload["limited-Food-Offers"] || [];
                state.convenienceStoreDeals = action.payload["convenience-Store-Deals"] || [];
            })
            .addCase(fetchHomeProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong!";
            });
    },
});

export default homeProductsSlice.reducer;
