import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { error } from "console";
import { tenmien, productHomeInterface, productHomeBEInterface } from "../../../utils";


interface productsSalesState {
  loading: boolean;
  error: string;
  data: productHomeBEInterface[];
}
// Thunk functions
export const fetchProductSales = createAsyncThunk(
  "productsSalesSlice/fetchProductSales",
  async () => {
    try {
      const response = await axios.get(`${tenmien}/product?page=2&keyword=sales`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: productsSalesState = {
  data: [],
  loading: false,
  error: "",
};
const productsSalesSlice = createSlice({
  name: "productsSales",
  initialState,
  reducers: {
  //  
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductSales.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = "";
    });
    builder.addCase(fetchProductSales.fulfilled, (state, action) => {
      state.loading = false;
      let {products} = action.payload;
      state.data = products;
    });
    builder.addCase(fetchProductSales.rejected, (state, action) => {
      state.loading = false;
      state.data = [
        {
          product_id: "520",
          thumbnail:
            "https://cdn.tgdd.vn/Products/Images/2286/311051/bhx/dau-huong-duong-huu-co-sloboda-nhan-xanh-can-2-lit-202307201600375678.jpg",
          name: "Dầu hướng dương hữu cơ Sloboda 1.8 lít",
          reg_price: 142000,
          discount_percent: 11,
          discount_price: 126380,
          quantity: 320,
          unit: "lít",
          canonical: null,
          description: "Dầu hướng dương hữu cơ Sloboda 1.8 lít",
          created_at: "2024-06-27T00:00:00Z",
          updated_at: null,
          deleted: false,
          rating: "5",
          c_id: "Dầu ăn",
          br_id: "Sloboda",
          event_percent: null,
          event_price: null,
          is_visible: "true",
          is_feature: "false",
        },
        {
          product_id: "275",
          thumbnail:
            "https://cdn.tgdd.vn/Products/Images/8788/270325/bhx/dua-hau-do-trai-18kg-tro-len-202308190821225026.png",
          name: "Dưa hấu đỏ trái từ 1.8kg",
          reg_price: 36000,
          discount_percent: 14,
          discount_price: 30960,
          quantity: 100,
          unit: "kg",
          canonical: null,
          description: "Dưa hấu đỏ trái từ 1.8kg",
          created_at: "2024-06-27T00:00:00Z",
          updated_at: null,
          deleted: false,
          rating: "5",
          c_id: "Trái cây",
          br_id: "N/A",
          event_percent: null,
          event_price: null,
          is_visible: "true",
          is_feature: "false",
        },
        {
          product_id: "286",
          thumbnail:
            "https://cdn.tgdd.vn/Products/Images/8788/310275/bhx/cam-sanh-09-11kg-6-9-trai-202310020858304147.jpg",
          name: "Cam sành 0.9-1.1kg",
          reg_price: 22000,
          discount_percent: 0.23,
          discount_price: 16940,
          quantity: 89,
          unit: "kg",
          canonical: null,
          description: "Cam sành 0.9-1.1kg",
          created_at: "2024-06-27T00:00:00Z",
          updated_at: null,
          deleted: false,
          rating: "3.9",
          c_id: "Trái cây",
          br_id: "N/A",
          event_percent: null,
          event_price: null,
          is_visible: "true",
          is_feature: "false",
        },
        {
          product_id: "851",
          thumbnail:
            "https://cdn.tgdd.vn/Products/Images/7462/309105/bhx/2-cay-kem-oi-xa-li-nhan-sua-merino-kool-62g-202306071453319316.jpg",
          name: "2 cây kem ổi xá lị nhân sữa Merino Kool 62g",
          reg_price: 22000,
          discount_percent: 0.5,
          discount_price: 11000,
          quantity: 500,
          unit: "g",
          canonical: null,
          description: "2 cây kem ổi xá lị nhân sữa Merino Kool 62g",
          created_at: "2024-06-27T00:00:00Z",
          updated_at: null,
          deleted: false,
          rating: "4.3",
          c_id: "Kem cây, kem hộp",
          br_id: "Merino",
          event_percent: null,
          event_price: null,
          is_visible: "true",
          is_feature: "false",
        },
      ];

      state.error = action.error.message || "Some thing wrong!";
    });
  },
});

export const productsSalesActions = productsSalesSlice.actions;
export default productsSalesSlice;
