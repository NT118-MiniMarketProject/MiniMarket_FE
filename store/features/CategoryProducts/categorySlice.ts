import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";

// import { createJsxSelfClosingElement } from "typescript";

interface categoryData {
  id: number;
  name: string;
  thumbnail: string;
}
interface categoryState {
  loading: boolean;
  error: string;
  data: {
    categoryGroupName: string,
    list: categoryData[]
  };
}
// Thunk functions
export const fetchCategory = createAsyncThunk(
  "categorySlice/fetchCategory",
  async (id: string) => {
    try {
      const response = await axios.get(tenmien + "/api/danhmuc/"+id+"/danhmucnho");
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: categoryState = {
  data: {
    categoryGroupName: "",
    list: []
  },
  loading: false,
  error: "",
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // 
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.data = {
        categoryGroupName: "Thịt, Cá, Trứng Sữa",
        list: [
          {
            id: 1,
            name: "Thịt heo",
            thumbnail:
              "https://zinfood.com/upload/images/mon-an-tu-thit-heo.jpg",
          },
          {
            id: 2,
            name: "Thịt bò",
            thumbnail:
              "https://bactom.com/wp-content/uploads/2023/06/thitbo_TNJU.jpg",
          },
          {
            id: 3,
            name: "Trứng gà",
            thumbnail:
              "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
          },
        ],
      };
      // state.error = "Error happened!";
      state.error = action.error.message || "Some thing wrong!";
      // state.error = "Some thing wrong!";
    });
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice;
