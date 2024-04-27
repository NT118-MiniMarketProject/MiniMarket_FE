import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { tenmien } from "../../../utils";
import { productInfoInterface } from "../../../utils";

interface productDetailState {
  loading: boolean;
  error: string;
  data: productInfoInterface
}
// Thunk functions
export const fetchProductDetail = createAsyncThunk(
  "productDetailSlice/fetchProductDetail",
  async (id: string) => {
    try {
      const response = await axios.get(tenmien + "/api/sanpham/"+id);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: productDetailState = {
  loading: false,
  error: "",
  data: {
    id: 0,
    thumbnail: "",
    name: "",
    reg_price: 0,
    discount_percent: 0,
    discount_price: 0,
    canonical: "",
    quantity: 0,
    rating: 0,
    description: "",
    article: "",
    galleries: [],
    brand: {
      id: 0,
      name: "",
      // thumbnail: "",
    },
    category: {
      id: 0,
      name: ""
    }
  },
};
const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProductDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Some thing wrong!";
    });
  },
});

export const categoryGroupActions = productDetailSlice.actions;
export default productDetailSlice;
