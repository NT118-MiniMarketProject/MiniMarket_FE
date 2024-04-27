import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";

interface orderListData {
  id: number,
  status: string,
  total: number,
  date: string,
  thumbnail: string,
}
interface orderListState {
  loading: boolean;
  error: string;
  data: orderListData[];
}

export const fetchOrderList = createAsyncThunk(
  "orderListSlice/fetchOrderList",
  async (userId: string) => {
    try {
      const response = await axios.get(tenmien + "/api/taikhoan/" + userId+"/donhang");
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
};

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Cart
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
