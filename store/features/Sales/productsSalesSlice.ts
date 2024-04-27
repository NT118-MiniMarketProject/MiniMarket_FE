import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { error } from "console";
import { tenmien, productHomeInterface } from "../../../utils";

export interface productsSalesData extends productHomeInterface {
  quantity: number, // so luong con ton / da ban
  remaining?: number
}
interface productsSalesState {
  loading: boolean;
  error: string;
  data: productsSalesData[];
}
// Thunk functions
export const fetchProductSales = createAsyncThunk(
  "productsSalesSlice/fetchProductSales",
  async () => {
    try {
      const response = await axios.get(tenmien + "/api/sales/sanpham");
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
      state.data = action.payload;
    });
    builder.addCase(fetchProductSales.rejected, (state, action) => {
      state.loading = false;
      state.data = [
        {
          id: 520, //id san pham
          name: "Dầu hướng dương hữu cơ Sloboda 1.8 lít",
          thumbnail:
            "https://cdn.tgdd.vn/Products/Images/2286/311051/bhx/dau-huong-duong-huu-co-sloboda-nhan-xanh-can-2-lit-202307201600375678.jpg",
          reg_price: 142000,
          discount_price: 126380,
          discount_percent: 11,
          rating: 5,
          category_name: "Dầu ăn",
          quantity: 320,
          remaining: 223,
        },
        {
          id: 275, //id san pham
          name: "Dưa hấu đỏ trái từ 1.8kg",
          thumbnail:
            "https://cdn.tgdd.vn/Products/Images/8788/270325/bhx/dua-hau-do-trai-18kg-tro-len-202308190821225026.png",
          reg_price: 36000,
          discount_price: 30960,
          discount_percent: 14,
          rating: 5,
          category_name: "Trái cây",
          quantity: 100,
          remaining: 55,
        },
        {
          id: 286, //id san pham
          name: "Cam sành 0.9-1.1kg",
          thumbnail:
            "https://cdn.tgdd.vn/Products/Images/8788/310275/bhx/cam-sanh-09-11kg-6-9-trai-202310020858304147.jpg",
          reg_price: 22000,
          discount_price: 16940,
          discount_percent: 0.23,
          rating: 3.9,
          category_name: "Trái cây",
          quantity: 89,
          remaining: 23,
        },
        {
          id: 851, //id san pham
          name: "2 cây kem ổi xá lị nhân sữa Merino Kool 62g",
          thumbnail:
            "https://cdn.tgdd.vn/Products/Images/7462/309105/bhx/2-cay-kem-oi-xa-li-nhan-sua-merino-kool-62g-202306071453319316.jpg",
          reg_price: 22000,
          discount_price: 11000,
          discount_percent: 0.5,
          rating: 4.3,
          category_name: "Kem cây, kem hộp",
          quantity: 500,
          remaining: 343,
        },
        {
          id: 25, //id san pham
          name: "Combo nướng dã ngoại 650g",
          thumbnail:
            "https://cdn.tgdd.vn/Products/Images/12718/310992/bhx/combo-nuong-da-ngoai-khay-650g-202307281019290466.jpg",
          reg_price: 214500,
          discount_price: 193050,
          discount_percent: 0.1,
          rating: 5,
          category_name: "Thịt heo",
          quantity: 120,
          remaining: 112
        },
      ];
      state.error = action.error.message || "Some thing wrong!";
    });
  },
});

export const productsSalesActions = productsSalesSlice.actions;
export default productsSalesSlice;
