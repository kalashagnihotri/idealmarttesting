import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BaseUrl = import.meta.env.VITE_BACKEND_API_URL
const dummyData = {
     "product_details": {
        "id": "a8f706fe-fc7d-49ce-8f67-b3813895ef08",
        "product_id": "PRD0CDAA3F8",
        "name": "Pizza",
        "brand": null,
        "price": "8.99",
        "discount_price": "0.99",
        "product_description": "6 inch Tomato sauce base, mushrooms, green peppers and onions on top",
        "quantity": "1",
        "valid_from": "2025-03-14T06:00:00-04:00",
        "valid_to": "2025-04-30T18:00:00-04:00",
        "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/Pizza+Sub.webp",
        "created_at": "2025-03-14T08:32:56.859993-04:00",
        "updated_at": "2025-05-13T11:10:56.948536-04:00",
        "discount_percentage": 88,
        "product_type": "service",
        "flyer_product": "yes",
        "notify_users": "no",
        "wa_alert": "no",
        "items": 1,
        "stock": 100,
        "is_priority": true,
        "is_addon_available": true,
        "category": "bc2e010b-8442-413d-bed3-b05028422268",
        "subcategory": "2c5404a1-c7e0-4422-a1f5-aab7d0de56cb",
        "measurement_type": "dff12212-6fa4-4fec-a72e-7dca09e3a942",
        "store": "9be46669-5564-45ae-9946-3b8bbca59530"
    },
    "addon": [
        {
            "id": 1,
            "title": "Cheese",
            
            "options": [
                {
                    "id": 1,
                    "name": "Extra Marignated Cheeze",
                    "details": "Extra 2mm of marignated cheese on top of it!",
                    "price": "1.00",
                    "available": true
                },
                {
                    "id": 2,
                    "name": "Extra Cheese with fried onion",
                    "details": "There will be more 2mm of cheese and",
                    "price": "1.50",
                    "available": true
                }
            ],
            "multiSelect": true,
            "freeLimit": 1,
            "isRequired": false
        },
        {
            "id": 2,
            "title": "Size",
            "options": [
                {
                    "id": 3,
                    "name": "Small Pizza",
                    "details": "8 inches!",
                    "price": "1.00",
                    "available": true
                },
                {
                    "id": 4,
                    "name": "Medium Pizza",
                    "details": "10 inches!",
                    "price": "1.50",
                    "available": true
                },
                {
                    "id": 5,
                    "name": "Large Pizza",
                    "details": "12 inches!",
                    "price": "2.00",
                    "available": true
                }
            ],
            "multiSelect": false,
            "freeLimit": 0,
            "isRequired": true
        }
    ]
}

export const fetchComboProduct = createAsyncThunk(
  "combos/fetchComboProduct",
  async (params, thunkAPI) => {
    const { id, token } = params;
    console.log("API Call Triggered with:", { id, token });

    try {
      const response = await axios.get(
        `    ${BaseUrl}/api/products/addon/?product_id=${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log(`Token received in thunk: ${token}`);
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API failed, falling back to dummy data:", error?.response?.data || error.message);
      return dummyData; // fallback here
    }
  }
);



const combosSlice = createSlice({
  name: "combos",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComboProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(fetchComboProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchComboProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load combo product";
      });
  },
});

export default combosSlice.reducer;
