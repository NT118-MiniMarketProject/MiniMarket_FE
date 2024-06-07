import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { categoryBEInterface, categoryInterface, tenmien, tenmien1 } from "../../../utils";

// import { createJsxSelfClosingElement } from "typescript";


interface categoryState {
  loading: boolean;
  error: string;
  data: {
    categoryGroupName: string,
    list: categoryInterface[]
  };
}
// Thunk functions
export const fetchCategory = createAsyncThunk(
  "categorySlice/fetchCategory",
  async (id: string) => {
    try {
      const response = await axios.get(tenmien + "/category/group/"+id);
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
      let { categoryByGroup } = action.payload;
      state.data = {
        categoryGroupName: categoryByGroup[0].categoryGroupName,
        list: categoryByGroup[0].lists.map((category: categoryBEInterface) => ({
          id: parseInt(category.category_id),
          name: category.category_name,
          thumbnail: category.thumbnail_category,
          categroup: category.categroup,
        }))
      };
      
      
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.data = {
        categoryGroupName: "Thịt, Cá, Trứng Sữa",
        list: [
          {
            id: 1,
            name: "Thịt heo",
            categroup: 2,
            thumbnail:
              "https://zinfood.com/upload/images/mon-an-tu-thit-heo.jpg",
          },
          {
            id: 2,
            name: "Thịt bò",
            categroup: 2,
            thumbnail:
              "https://bactom.com/wp-content/uploads/2023/06/thitbo_TNJU.jpg",
          },
          {
            id: 3,
            name: "Trứng gà",
            categroup: 2,
            thumbnail:
              "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
          },
          {
            id: 4,
            name: "Thịt heo",
            categroup: 2,
            thumbnail:
              "https://zinfood.com/upload/images/mon-an-tu-thit-heo.jpg",
          },
          {
            id: 5,
            name: "Thịt bò",
            categroup: 2,
            thumbnail:
              "https://bactom.com/wp-content/uploads/2023/06/thitbo_TNJU.jpg",
          },
          {
            id: 6,
            name: "Trứng gà",
            categroup: 2,
            thumbnail:
              "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
          },
          {
            id: 7,
            name: "Thịt heo",
            categroup: 2,
            thumbnail:
              "https://zinfood.com/upload/images/mon-an-tu-thit-heo.jpg",
          },
          {
            id: 8,
            name: "Thịt bò",
            categroup: 2,
            thumbnail:
              "https://bactom.com/wp-content/uploads/2023/06/thitbo_TNJU.jpg",
          },
          {
            id: 9,
            name: "Trứng gà",
            categroup: 2,
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
