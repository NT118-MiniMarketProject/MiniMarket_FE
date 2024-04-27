import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { error } from "console";
import { tenmien, productHomeInterface } from "../../../utils";


interface productsPopularState {
  loading: Boolean;
  error: string;
  data: {
    categoryID: number;
    name: string;
    products: productHomeInterface[];
  }[]; // lay mang khoang 5 cai
}

// Thunk functions
export const fetchProductsPopular = createAsyncThunk(
  "productsPopularSlice/fetchProductsPopular",
  async () => {
    try {
      const response = await axios.get(
        tenmien+"/api/sanpham/phobien"
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: productsPopularState = {
  data: [],
  loading: false,
  error: "",
};
const productsPopularSlice = createSlice({
  name: "productsPopular",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsPopular.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = "";
    });
    builder.addCase(fetchProductsPopular.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProductsPopular.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Some thing wrong!";
    });
  },
});

export const productsPopularActions = productsPopularSlice.actions;
export default productsPopularSlice;
