import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";

interface wishListData {
    id: number;
    thumbnail: string;
    name: string;
    discount_price: number;
}
interface wishListState {
  loading: boolean;
  error: string;
  data: wishListData[];
}

// Thunk functions
export const fetchWishList = createAsyncThunk(
  "wishlistSlice/fetchWishList",
  async (userId: string) => {
    try {
      const response = await axios.get(tenmien + "/api/taikhoan/" + userId + "/yeuthich");
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const addToWishList = createAsyncThunk(
  "wishlistSlice/addToWishList",
  async ({
    userId,
    productId,
  }: {
    userId: number;
    productId: number;
  }) => {
    try {
      const response = await axios.post(tenmien + "/api/sanpham/yeuthich", {
        userId,
        productId,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);


export const deleteItemWishList = createAsyncThunk(
  "wishlistSlice/deleteItemWishList",
  async ({ productId, userId }: { productId: number, userId: number }) => {
    try {
      const response = await axios.post(
        tenmien + "/api/sanpham/yeuthich/xoa",
        {
            productId, 
            userId
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: wishListState = {
  loading: false,
  error: "",
  data:[],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Cart
    builder.addCase(fetchWishList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = initialState.data;
    });
    builder.addCase(fetchWishList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchWishList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Some thing wrong";
    });
    // Add to Cart
    builder
      .addCase(addToWishList.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Some thing wrong";
      });
    // Delete item
    builder
      .addCase(deleteItemWishList.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteItemWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteItemWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Some thing wrong";
      });
    
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;
