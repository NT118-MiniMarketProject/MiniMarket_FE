import { dummyPoductDetail } from "./../../../utils/index";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { tenmien } from "../../../utils";
import { productDetailInterface } from "../../../utils";

interface productDetailState {
  loading: boolean;
  error: string;
  data: productDetailInterface;
}
// Thunk functions
export const fetchProductDetail = createAsyncThunk(
  "productDetailSlice/fetchProductDetail",
  async (id: string) => {
    try {
      const response = await axios
        .get(`${tenmien}/product/${id}`)
        .then((res) => res.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: productDetailState = {
  loading: true,
  error: "",
  data: {
    product_id: "",
    thumbnail: "",
    name: "",
    reg_price: 0,
    discount_percent: 0,
    discount_price: 0,
    quantity: 0,
    unit: "",
    canonical: null,
    description: "",
    created_at: "", // ISO date string
    updated_at: null, // ISO date string or null
    deleted: false,
    rating: "",
    c_id: "",
    br_id: "",
    event_percent: null,
    event_price: null,
    is_visible: "",
    is_feature: "",
    galleries: [],
  },
  // data: dummyPoductDetail,
};
const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.data = initialState.data;
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchProductDetail.pending, (state) => {
    //   state.loading = true;
    //   state.error = "";
    // });
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

export const productDetailActions = productDetailSlice.actions;
export default productDetailSlice;
