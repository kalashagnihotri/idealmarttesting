import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BaseUrl = import.meta.env.VITE_BACKEND_API_URL
// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await axios.get(
            `${BaseUrl}/api/products/all/`
        );
        return response.data.results;
    }
);

// Thunk for fetching a single product
export const fetchSingleProduct = createAsyncThunk(
    "products/fetchSingleProduct",
    async (id) => {
        const response = await axios.get(
            `${BaseUrl}/api/products/${id}/`
        );
        return response.data;
    }
);

const initialState = {
    products: [],
    filteredProducts: [],
    filters: {
        category: "",
        priceRange: [0, 50],
        rating: 0,
    },
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
            state.filteredProducts = state.products.filter((product) => {
                const { category, priceRange, rating } = state.filters;
                const [minPrice, maxPrice] = priceRange;
                const productPrice = parseFloat(product.price);
                const discountPrice = parseFloat(product.discountPrice);

                return (
                    (!category || product.category === category) &&
                    (!rating || product.rating >= rating) &&
                    productPrice >= minPrice &&
                    discountPrice <= maxPrice
                );
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
                state.filteredProducts = action.payload; // Show all products initially
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchSingleProduct.pending, (state) => {
                state.status = "loading";
                state.singleProduct = null;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.singleProduct = action.payload;
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setFilters } = productSlice.actions;

export default productSlice.reducer;
