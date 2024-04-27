import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { tenmien } from "../../../utils";

interface productReviewState {
  loading: boolean;
  error: string;
  data: {
    id: number, 
    fullname: string,
    created_at: string,
    rating: number,
    title: string,
    comment: string
  }[];
}
// Thunk functions
export const fetchProductReview = createAsyncThunk(
  "productReview/fetchProductReview",
  async (id:string) => {
    try {
      const response = await axios.get(tenmien + "/api/sanpham/"+id+"/danhgia");
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
        comment
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);


const initialState: productReviewState = {
  loading: false,
  error: "",
  data: []
};
const productReviewSlice = createSlice({
  name: "productReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProductReview.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = [];
    })
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

export const categoryGroupActions = productReviewSlice.actions;
export default productReviewSlice;
