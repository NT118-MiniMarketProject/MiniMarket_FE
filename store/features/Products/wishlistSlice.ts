import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";

interface WishListItem {
  product_id: string;
  thumbnail: string;
  name: string;
  discount_price: number;
}
interface wishListState {
  loading: boolean;
  error: string;
  data: WishListItem[];
}

// Thunk functions
export const fetchWishList = createAsyncThunk(
  "wishlistSlice/fetchWishList",
  async () => {
    try {
      const response = await axios.get(tenmien + "/product/wishlist");
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const addToWishList = createAsyncThunk(
  "wishlistSlice/addToWishList",
  async ({
    product_id,
  }: {
    product_id: String;
  }) => {
    try {
      const response = await axios.post(tenmien + "/product/wishlist/add", {
        product_id
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);


export const deleteItemWishList = createAsyncThunk(
  "wishlistSlice/deleteItemWishList",
  async ({ product_id }: { product_id: String }) => {
    try {
      const response = await axios.post(tenmien + "/product/wishlist/remove", {
        product_id,
      });
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
      let {Wishlist} = action.payload;
      state.data = Wishlist;
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
        let { Wishlist } = action.payload;
        state.data = Wishlist;
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
        let { Wishlist } = action.payload;
        state.data = Wishlist;
      })
      .addCase(deleteItemWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Some thing wrong";
      });
    
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;
