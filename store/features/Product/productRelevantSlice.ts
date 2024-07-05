import {
  dummyPoductDetail,
  dummyProductRelevant,
  productHomeBEInterface,
} from "./../../../utils/index";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { tenmien } from "../../../utils";
import { productDetailInterface } from "../../../utils";

interface productRelevantState {
  loading: boolean;
  error: string;
  data: productHomeBEInterface[];
}
// Thunk functions
export const fetchProductRelevant = createAsyncThunk(
  "productRelevantSlice/fetchProductRelevant",
  async (id: string) => {
    try {
      const response = await axios
        .get(`${tenmien}/product/relevent/${id}`)
        .then((res) => res.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: productRelevantState = {
  loading: true,
  error: "",
  data: [],
  //   data: dummyProductRelevant,
};

const productRelevantSlice = createSlice({
  name: "productRelevant",
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.data = initialState.data;
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchProductRelevant.pending, (state) => {
    //   state.loading = true;
    //   state.error = "";
    // });
    builder.addCase(fetchProductRelevant.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProductRelevant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Some thing wrong!";
    });
  },
});

export const productRelevantActions = productRelevantSlice.actions;
export default productRelevantSlice;
