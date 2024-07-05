import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { productDetailInterface, tenmien } from "../../../utils";

const fetchProductDetail = async (product_id: string) => {
  try {
    const response = await axios
      .get(`${tenmien}/product/${product_id}`)
      .then((res) => res.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Thunk functions
export const addProductDetailItem = createAsyncThunk(
  "productDetailSlice/addProductDetailItem",
  async ({ uid, product_id }: { uid: string; product_id: string }) => {
    try {
      const data = await fetchProductDetail(product_id);
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const refreshProductDetailItem = createAsyncThunk(
  "productDetailSlice/refreshProductDetailItem",
  async ({ uid, product_id }: { uid: string; product_id: string }) => {
    try {
      const data = await fetchProductDetail(product_id);
      return data;
    } catch (err) {
      throw err;
    }
  }
);

interface productDetailState {
  // loading: boolean;
  // error: string;
  data: {
    id: string; //uuidv4
    loading: boolean;
    error: string;
    data: productDetailInterface;
  }[];
}

const initialState: productDetailState = {
  // loading: true,
  // error: "",
  // data: {
  //   product_id: "",
  //   thumbnail: "",
  //   name: "",
  //   reg_price: 0,
  //   discount_percent: 0,
  //   discount_price: 0,
  //   quantity: 0,
  //   unit: "",
  //   canonical: null,
  //   description: "",
  //   created_at: "", // ISO date string
  //   updated_at: null, // ISO date string or null
  //   deleted: false,
  //   rating: "",
  //   c_id: "",
  //   br_id: "",
  //   event_percent: null,
  //   event_price: null,
  //   is_visible: "",
  //   is_feature: "",
  //   galleries: [],
  // },
  // data: dummyPoductDetail,
  data: [],
};

const initialItemState = {
  id: "",
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
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    removeItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Fetch new
    builder.addCase(addProductDetailItem.pending, (state, action) => {
      state.data = [
        ...state.data,
        { ...initialItemState, id: action.meta.arg.uid },
      ];
    });
    builder.addCase(addProductDetailItem.fulfilled, (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.meta.arg.uid) {
          item.data = action.payload;
          item.loading = false;
        }
        return item;
      });
    });
    builder.addCase(addProductDetailItem.rejected, (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.meta.arg.uid) {
          item.error = action.error.message || "Some thing wrong!";
          item.loading = false;
        }
        return item;
      });
    });

    // Refresh Data
    builder.addCase(refreshProductDetailItem.pending, (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.meta.arg.uid) {
          item.data = initialItemState.data;
          item.error = initialItemState.error;
          item.loading = true;
        }
        return item;
      });
    });
    builder.addCase(refreshProductDetailItem.fulfilled, (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.meta.arg.uid) {
          item.data = action.payload;
          item.loading = false;
        }
        return item;
      });
    });
    builder.addCase(refreshProductDetailItem.rejected, (state, action) => {
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

export const productDetailSelector = (uid: string) => {
  return (state: any) => {
    const productState = state.productDetail.data.filter(
      (item: any) => item.id === uid
    )[0];
    return productState ?? initialItemState;
  };
};
export const productDetailActions = productDetailSlice.actions;
export default productDetailSlice;
