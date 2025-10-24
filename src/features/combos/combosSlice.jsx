import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BaseUrl = import.meta.env.VITE_BACKEND_API_URL
export const fetchComboProduct = createAsyncThunk(
  "combos/fetchComboProduct",
  async (params, thunkAPI) => {
    const { id, token } = params;
    console.log("API Call Triggered with:", { id, token });
    try {
      const response = await axios.get(
        `${BaseUrl}/api/products/addon/?product_id=${id}`,
        //`http://127.0.0.1:8000/api/products/addon/?product_id=${id}`,  
        {
        
          headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log("Data",response.data)
      return response.data;
    } catch (error) {


      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch combo product");
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
