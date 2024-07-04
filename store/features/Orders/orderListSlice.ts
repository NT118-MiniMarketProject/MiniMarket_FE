import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { orderInterface, tenmien } from "../../../utils";

// interface orderListData {
//   id: number,
//   status: string,
//   total: number,
//   date: string,
//   thumbnail: string,
// }

interface orderListState {
  loading: boolean;
  error: string;
  data: orderInterface[];
}

// GetOrders
export const fetchOrderList = createAsyncThunk(
  "orderListSlice/fetchOrderList",
  async () => {
    try {
      const response = await axios
        .get(`${tenmien}/order`)
        .then((res) => res.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: orderListState = {
  loading: false,
  error: "",
  data: [],
  // data: [dummyOrder as orderInterface,dummyOrder as orderInterface,dummyOrder as orderInterface,dummyOrder as orderInterface,dummyOrder as orderInterface,dummyOrder as orderInterface],
};

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      state.data = state.data.map((order) => {
        if (order.order_id === action.payload.order_id) order = action.payload;
        return order;
      });
    },
  },
  extraReducers: (builder) => {
    // getOrders
    builder.addCase(fetchOrderList.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchOrderList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchOrderList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Some thing wrong";
    });
  },
});

export const orderListActions = orderListSlice.actions;
export default orderListSlice;
