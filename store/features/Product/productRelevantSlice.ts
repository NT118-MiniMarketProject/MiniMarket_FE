import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tenmien } from "../../../utils";
import { productHomeBEInterface } from "./../../../utils/index";

const fetchProductRelevant = async (product_id: string) => {
  try {
    const response = await axios
      .get(`${tenmien}/product/relevent/${product_id}`)
      .then((res) => res.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Thunk functions
export const addProductRelevantItem = createAsyncThunk(
  "productRelevantSlice/addProductRelevantItem",
  async ({ uid, product_id }: { uid: string; product_id: string }) => {
    try {
      const data = await fetchProductRelevant(product_id);
      return data;
    } catch (err) {
      throw err;
    }
  }
);

interface productRelevantState {
  // loading: boolean;
  // error: string;
  data: {
    id: string; //uuidv4
    loading: boolean;
    error: string;
    data: productHomeBEInterface[];
  }[];
}

const initialState: productRelevantState = {
  // loading: true,
  // error: "",
  //   data: dummyProductRelevant,
  data: [],
};

const initialItemState = {
  id: "",
  loading: true,
  error: "",
  data: [],
};

const productRelevantSlice = createSlice({
  name: "productRelevant",
  initialState,
  reducers: {
    removeItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
  // Fetch new
  extraReducers: (builder) => {
    builder.addCase(addProductRelevantItem.pending, (state, action) => {
      state.data = [
        ...state.data,
        { ...initialItemState, id: action.meta.arg.uid },
      ];
    });
    builder.addCase(addProductRelevantItem.fulfilled, (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.meta.arg.uid) {
          item.data = action.payload;
          item.loading = false;
        }
        return item;
      });
    });
    builder.addCase(addProductRelevantItem.rejected, (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.meta.arg.uid) {
          item.error = action.error.message || "Some thing wrong!";
          item.loading = false;
        }
        return item;
      });
    });
  },
});

export const productRelevantSelector = (uid: string) => {
  return (state: any) => {
    const relevantState = state.productRelevant.data.filter(
      (item: any) => item.id === uid
    )[0];
    return relevantState ?? initialItemState;
  };
};
export const productRelevantActions = productRelevantSlice.actions;
export default productRelevantSlice;
