import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const searchOrders = createAsyncThunk(
  "orders/searchOrders",
  async (params: any) => {
    const response = await axios.get(`${API_URL}/search`, { params });
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order: any) => {
    const response = await axios.post(API_URL, order);
    return response.data;
  }
);

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  Product?: any;
}

export interface Order {
  id: number;
  customerId: number;
  totalAmount: number;
  status: string;
  purchaseTime: Date;
  OrderItems?: OrderItem[];
  Customer?: any;
}

interface OrderState {
  items: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  items: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(searchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default orderSlice.reducer;
