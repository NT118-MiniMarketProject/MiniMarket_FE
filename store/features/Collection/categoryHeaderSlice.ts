import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";

// import { createJsxSelfClosingElement } from "typescript";

interface categoryHeaderData {
  id: number;
  name: string;
  thumbnail: string;
}
interface categoryHeaderState {
  loading: boolean;
  error: string;
  data: categoryHeaderData[];
}
// Thunk functions
export const fetchcategoryHeader = createAsyncThunk(
  "categoryHeaderSlice/fetchcategoryHeader",
  async () => {
    try {
      const response = await axios.get(tenmien + "/api/danhmuctrangchu");
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: categoryHeaderState = {
  data: [],
  loading: false,
  error: "",
};
const categoryHeaderSlice = createSlice({
  name: "categoryHeader",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchcategoryHeader.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchcategoryHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchcategoryHeader.rejected, (state, action) => {
        state.loading = false;
        state.data = [
          {
            id: 1,
            name: "Thịt, Cá, Trứng Sữa",
            thumbnail:
              "https://e7.pngegg.com/pngimages/12/41/png-clipart-mettwurst-raw-meat-graphy-goat-meat-meat-food-beef-thumbnail.png",
          },
          {
            id: 2,
            name: "Rau, Củ, Quả",
            thumbnail:
              "https://w7.pngwing.com/pngs/94/966/png-transparent-two-sprite-soda-cans-soft-drink-sprite-coca-cola-fanta-pepsi-sprite-can-food-can-product-thumbnail.png",
          },
          {
            id: 3,
            name: "Thực Phẩm Tươi",
            thumbnail:
              "https://www.farmersrestaurantgroup.com/wp-content/uploads/2016/01/cookie.png",
          },
          {
            id: 4,
            name: "Thực Phẩm Khô",
            thumbnail:
              "https://w7.pngwing.com/pngs/697/219/png-transparent-vegetable-fruit-food-group-go-to-the-kitchen-natural-foods-dried-fruit-food-thumbnail.png",
          },
          {
            id: 5,
            name: "Thực Phẩm Đóng Gói",
            thumbnail:
              "https://w7.pngwing.com/pngs/697/219/png-transparent-vegetable-fruit-food-group-go-to-the-kitchen-natural-foods-dried-fruit-food-thumbnail.png",
          },
          {
            id: 6,
            name: "Thực Phẩm Đóng Gói",
            thumbnail:
              "https://www.farmersrestaurantgroup.com/wp-content/uploads/2016/01/cookie.png",
          },
          {
            id: 7,
            name: "Thực Phẩm Đóng Gói",
            thumbnail:
              "https://www.farmersrestaurantgroup.com/wp-content/uploads/2016/01/cookie.png",
          },
          {
            id: 8,
            name: "Bia, Nước có cồn",
            thumbnail:
              "https://www.farmersrestaurantgroup.com/wp-content/uploads/2016/01/cookie.png",
          },
        ];
        state.error = action.error.message || "Some thing wrong!";
      });
  },
});

export const categoryHeaderActions = categoryHeaderSlice.actions;
export default categoryHeaderSlice;
