import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";

// import { createJsxSelfClosingElement } from "typescript";

interface brandData {
  brand_id: string;
  brand_name: string;
  thumbnail_brand: string;
}

interface brandState {
  loading: boolean;
  error: string;
  data: brandData[]
}
// Fetch tat ca branch cua danh muc lon
// export const fetchBrandCateGroup = createAsyncThunk(
//   "brandSlice/fetchBrandCateGroup",
//   (id: number) => {
//     return axios
//       .get(tenmien + "/api/danhmuc/" + id + "/thuonghieu")
//       .then((response) => response.data);
//   }
// );

export const fetchBrandCate = createAsyncThunk(
  "brandSlice/fetchBrandCate",
  async (id:number) => {
    try {
      const response = await axios.get(tenmien + "/brand/category/"+id);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);



const initialState: brandState = {
  data: [],
  loading: false,
  error: "",
};
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    // 
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrandCate.pending, (state) => {
      state.loading = true;
      state.error = "";
      state = initialState;
    });
    builder.addCase(fetchBrandCate.fulfilled, (state, action) => {
      state.loading = false;
      let { brandList } = action.payload;
      state.data = brandList.map((category: brandData) => ({
        brand_id: category.brand_id,
        brand_name: category.brand_name,
        thumbnail_brand: category.thumbnail_brand,
      })) 
    });
    builder.addCase(fetchBrandCate.rejected, (state, action) => {
      state.loading = false;
      state.data = [
        {
            brand_id: "16",
            brand_name: "SG Food",
            thumbnail_brand: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_104x59/https://cdn.tgdd.vn/Brand/11/sg-food-05042021222518.jpg"
        },
        {
            brand_id: "24",
            brand_name: "Chinsu",
            thumbnail_brand: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_104x59/https://cdn.tgdd.vn/Brand/11/chinsu-05042021145058.jpeg"
        },
        {
            brand_id: "26",
            brand_name: "Maggi",
            thumbnail_brand: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_104x59/https://cdn.tgdd.vn/Brand/11/maggi-01112020194450.jpg"
        },
      ];
      state.error = action.error.message || "Some thing wrong!";
    });
    // Fetch category brand
    // builder.addCase(fetchBrandCate.pending, (state) => {
    //   state.loading = true;
    //   state.error = "";
    //   state.data = [];
    // });
    // builder.addCase(fetchBrandCate.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    // });
    // builder.addCase(fetchBrandCate.rejected, (state, action) => {
    //   state.loading = false;
    //   state.data = [
    //     {
    //       id: 10,
    //       name: "Merino",
    //       thumbnail:
    //         "data:image/png;base64,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",
    //     },
    //     {
    //       id: 12,
    //       name: "Masan",
    //       thumbnail:
    //         "data:image/png;base64,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",
    //     },
    //   ];
    //   state.error = action.error.message || "Some thing wrong!";
    // });
  },
});

export const brandActions = brandSlice.actions;
export default brandSlice;
