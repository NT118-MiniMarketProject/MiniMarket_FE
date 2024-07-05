import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { productReviewInterface, tenmien } from "../../../utils";

const fetchProductReview = async (id: string) => {
  try {
    const response = await axios
      .get(`${tenmien}/reviews/${id}`)
      .then((res) => res.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Thunk functions
export const addProductReviewItem = createAsyncThunk(
  "productReview/addProductReviewItem",
  async ({ uid, product_id }: { uid: string; product_id: string }) => {
    try {
      const data = await fetchProductReview(product_id);
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const refreshProductReviewItem = createAsyncThunk(
  "productReview/refreshProductReviewItem",
  async ({ uid, product_id }: { uid: string; product_id: string }) => {
    try {
      const data = await fetchProductReview(product_id);
      return data;
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

interface productReviewState {
  data: {
    id: string; //uuidv4
    loading: boolean;
    error: string;
    data: productReviewInterface[];
  }[];
}

const initialState: productReviewState = {
  // loading: true,
  // error: "",
  // data: dummyProductReview,
  data: [],
};

const initialItemState = {
  id: "",
  loading: true,
  error: "",
  data: [],
};

const productReviewSlice = createSlice({
  name: "productReview",
  initialState,
  reducers: {
    removeItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Fetch new
    builder
      .addCase(addProductReviewItem.pending, (state, action) => {
        state.data = [
          ...state.data,
          { ...initialItemState, id: action.meta.arg.uid },
        ];
      })
      .addCase(addProductReviewItem.fulfilled, (state, action) => {
        state.data = state.data.map((item) => {
          if (item.id === action.meta.arg.uid) {
            item.data = action.payload;
            item.loading = false;
          }
          return item;
        });
      })
      .addCase(addProductReviewItem.rejected, (state, action) => {
        state.data = state.data.map((item) => {
          if (item.id === action.meta.arg.uid) {
            item.error = action.error.message || "Some thing wrong!";
            item.loading = false;
          }
          return item;
        });
      });

    // Refresh Data
    builder
      .addCase(refreshProductReviewItem.pending, (state, action) => {
        state.data = state.data.map((item) => {
          if (item.id === action.meta.arg.uid) {
            item.data = initialItemState.data;
            item.error = initialItemState.error;
            item.loading = true;
          }
          return item;
        });
      })
      .addCase(refreshProductReviewItem.fulfilled, (state, action) => {
        state.data = state.data.map((item) => {
          if (item.id === action.meta.arg.uid) {
            item.data = action.payload;
            item.loading = false;
          }
          return item;
        });
      })
      .addCase(refreshProductReviewItem.rejected, (state, action) => {
        state.data = state.data.map((item) => {
          if (item.id === action.meta.arg.uid) {
            item.error = action.error.message || "Some thing wrong!";
            item.loading = false;
          }
          return item;
        });
      });

    // builder
    //   .addCase(addProductReview.pending, (state) => {
    //     state.loading = true;
    //     state.error = "";
    //   })
    //   .addCase(addProductReview.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(addProductReview.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || "Some thing wrong!";
    //   });
  },
});

export const productReviewSelector = (uid: string) => {
  return (state: any) => {
    const reviewState = state.productReview.data.filter(
      (item: any) => item.id === uid
    )[0];
    return reviewState ?? initialItemState;
  };
};
export const productReviewActions = productReviewSlice.actions;
export default productReviewSlice;
