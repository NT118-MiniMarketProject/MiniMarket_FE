import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";

interface orderData {
  id: number, // mã hoá đơn
  address: string,
  total: number,
  note: string,
  status: string, // Đang giao / Đã giao
  payment_method: string, // hiện tại mặc định luôn là COD
  date: string, // ngày hoá đơn, string có dạng "3:42pm 27/12/2023"
  list: {
    itemId: number, // mã item của đơn hàng
    productId: number; 
    name: string,
    thumbnail: string,
    quantity: number, 
    total: number,
  }[] // trả về danh sách sản phẩm thuojc đơn hàng
}
interface orderState {
  loading: boolean;
  error: string;
  data: orderData;
}

export const fetchOrder = createAsyncThunk(
  "orderSlice/fetchOrder",
  async (id: string) => {
    try {
      const response = await axios.get(tenmien + "/api/donhang/" + id);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const addNewOrder = createAsyncThunk(
  "orderSlice/addNewOrder",
  async ({
    userId,
    address,
    payment_method,
    note
  }: {
    userId: number,
    address: string,
    payment_method: string,
    note: string
  }) => {
    try {
      const response = await axios.post(tenmien + "/api/donhang/them", {
        userId,
        address,
        payment_method,
        note,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);


const initialState: orderState = {
  loading: false,
  error: "",
  data: {
    id: -1,
    address: "",
    total: 0,
    date: "",
    note: "",
    status: "", 
    payment_method: "",
    list: []
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Cart
    builder.addCase(fetchOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = initialState.data;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Some thing wrong";
    });
    // Add to Cart
    builder
      .addCase(addNewOrder.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Some thing wrong";
      })
    }})

export const orderActions = orderSlice.actions;
export default orderSlice;