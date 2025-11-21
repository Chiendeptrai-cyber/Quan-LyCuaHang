import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (params: any) => {
    const response = await axios.get(`${API_URL}/search`, { params });
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: any) => {
    const response = await axios.post(API_URL, product);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, ...product }: any) => {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data;
  }
);

export const hideProduct = createAsyncThunk(
  "products/hideProduct",
  async (id: number) => {
    const response = await axios.patch(`${API_URL}/${id}/hide`);
    return response.data.product;
  }
);

export const showProduct = createAsyncThunk(
  "products/showProduct",
  async (id: number) => {
    const response = await axios.patch(`${API_URL}/${id}/show`);
    return response.data.product;
  }
);

export interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  hidden?: boolean;
}

interface ProductState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(hideProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(showProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default productSlice.reducer;
