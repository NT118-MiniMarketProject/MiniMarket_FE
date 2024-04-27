import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { error } from "console";
import { tenmien } from "../../../utils";


interface salesState {
  loading: Boolean;
  error: string;
  data: {
    id: number,
    name: string,
    description: string,
    start_time: string,
    end_time: string
  };
}
// Thunk functions
export const fetchSales = createAsyncThunk("salesSlice/fetchSales", async () => {
  try {
    const response = await axios.get(tenmien + "/api/sales");
    return response.data;
  } catch (err) {
    throw err;
  }
});

const initialState: salesState = {
  data: {
    id: 0,
    name: '',
    description: '',
    start_time: '',
    end_time: ''
  },
  loading: false,
  error: "",
};
const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSales.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchSales.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSales.rejected, (state, action) => {
      state.loading = false;
      state.data = {
        id: 1,
        name: "Săn sales đón lễ",
        description: 'Rất nhiều sản phẩm đang được giảm giá từ 30/11 đến 30/6',
        start_time: "Nov 11, 2023 00:00:00",
        end_time: "Jan 07, 2024 00:00:00",
      };
      // state.error = "Error happened!";
      state.error = action.error.message || "Some thing wrong!";
      // state.error = "Some thing wrong!";
    });
  },
});

export const salesActions = salesSlice.actions;
export default salesSlice;
