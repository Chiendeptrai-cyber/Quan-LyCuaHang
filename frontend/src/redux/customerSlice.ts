import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/customers";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const searchCustomers = createAsyncThunk(
  "customers/searchCustomers",
  async (params: any) => {
    const response = await axios.get(`${API_URL}/search`, { params });
    return response.data;
  }
);

export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (customer: any) => {
    const response = await axios.post(API_URL, customer);
    return response.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, ...customer }: any) => {
    const response = await axios.put(`${API_URL}/${id}`, customer);
    return response.data;
  }
);

export interface Customer {
  id: number;
  code: string;
  name: string;
  birthYear?: number;
  address?: string;
  createdAt?: Date;
}

interface CustomerState {
  items: Customer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CustomerState = {
  items: [],
  status: "idle",
  error: null,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(searchCustomers.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default customerSlice.reducer;
