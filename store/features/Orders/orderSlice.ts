import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { dummyOrder, orderInterface, tenmien } from "../../../utils";

// interface orderData {
//   id: number, // mã hoá đơn
//   address: string,
//   total: number,
//   note: string,
//   status: string, // Đang giao / Đã giao
//   payment_method: string, // hiện tại mặc định luôn là COD
//   date: string, // ngày hoá đơn, string có dạng "3:42pm 27/12/2023"
//   list: {
//     itemId: number, // mã item của đơn hàng
//     productId: number;
//     name: string,
//     thumbnail: string,
//     quantity: number,
//     total: number,
//   }[] // trả về danh sách sản phẩm thuojc đơn hàng
// }

interface orderState {
  loading: boolean;
  error: string;
  data: orderInterface;
}

export const fetchOrder = createAsyncThunk(
  "orderSlice/fetchOrder",
  async (id: string) => {
    try {
      const response = await axios
        .get(`${tenmien}/order/${id}`)
        .then((res) => res.data);
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
    note,
  }: {
    userId: number;
    address: string;
    payment_method: string;
    note: string;
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
  // data: {
  //   order_id: "",
  //   address: "",
  //   total: 0,
  //   note: null,
  //   status: "Pending",
  //   payment_method: "",
  //   created_at: "",
  //   orderitems: []
  // },
  data: dummyOrder,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Order
    builder.addCase(fetchOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
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
      });
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
