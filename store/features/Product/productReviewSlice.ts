import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  dummyProductReview,
  productReviewInterface,
  tenmien,
} from "../../../utils";

interface productReviewState {
  loading: boolean;
  error: string;
  data: productReviewInterface[];
}
// Thunk functions
export const fetchProductReview = createAsyncThunk(
  "productReview/fetchProductReview",
  async (id: string) => {
    try {
      const response = await axios
        .get(`${tenmien}/reviews/${id}`)
        .then((res) => res.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const addProductReview = createAsyncThunk(
  "productReview/addProductReview",
  async ({
    userId,
    productId,
    rating,
    title,
    comment,
  }: {
    userId: number;
    productId: string;
    title: string;
    rating: number;
    comment: string;
  }) => {
    try {
      const response = await axios.post(tenmien + "/api/sanpham/themdanhgia", {
        userId,
        productId,
        rating,
        title,
        comment,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: productReviewState = {
  loading: true,
  error: "",
  data: [],
  // data: dummyProductReview,
};
const productReviewSlice = createSlice({
  name: "productReview",
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.data = initialState.data;
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchProductReview.pending, (state) => {
      //   state.loading = true;
      //   state.error = "";
      //   state.data = [];
      // })
      .addCase(fetchProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Some thing wrong!";
      });

    builder
      .addCase(addProductReview.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Some thing wrong!";
      });
  },
});

export const productReviewActions = productReviewSlice.actions;
export default productReviewSlice;
