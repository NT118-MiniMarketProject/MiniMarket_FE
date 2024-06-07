import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { categoryBEInterface, categoryInterface, tenmien } from "../../../utils";

// import { createJsxSelfClosingElement } from "typescript";

interface categoryData {
  id: number;
  name: string;
  thumbnail: string;
}
interface categoryGroupDetailState {
  loading: boolean;
  error: string;
  data: {
    id: number;
    categoryGroupName: string;
    thumbnail: string;
    list: categoryInterface[];
  }[];
}
// Thunk functions
export const fetchCategoryGroupDetail = createAsyncThunk(
  "categoryGroupDetailSlice/fetchCategoryGroupDetail",
  async () => {
    try {
      const response = await axios.get(
        tenmien + "/category/group/all"
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: categoryGroupDetailState = {
  data: [],
  loading: false,
  error: "",
};
const categoryGroupDetailSlice = createSlice({
  name: "categoryGroupDetail",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryGroupDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchCategoryGroupDetail.fulfilled, (state, action) => {
      state.loading = false;
      let {categoryByGroup} = action.payload;
      state.data = categoryByGroup.map(
        (group: {
          category_id: number;
          categroup_name: string;
          thumbnail: string;
          lists: categoryBEInterface[];
        }) => ({
          id: group.category_id,
          categoryGroupName: group.categroup_name,
          thumbnail: group.thumbnail,
          list: group.lists.map((cate: categoryBEInterface) => ({
            id: cate.category_id,
            name: cate.category_name,
            thumbnail: cate.thumbnail_category,
            categroup: cate.categroup,
          })),
        })
      );
    });
    builder.addCase(fetchCategoryGroupDetail.rejected, (state, action) => {
      state.loading = false;
      state.data = [
        {
          categoryGroupName: "Thịt, Cá, Trứng Sữa",
          id: 1,
          thumbnail:
            "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_108x108/https://cdn.tgdd.vn/Products/Images/8782/bhx/ca-hai-san-202209301439213205.png",
          list: [
            {
              id: 1,
              name: "Thịt heo",
              categroup: 4,
              thumbnail:
                "https://zinfood.com/upload/images/mon-an-tu-thit-heo.jpg",
            },
            {
              id: 2,
              name: "Thịt bò",
              categroup: 4,
              thumbnail:
                "https://bactom.com/wp-content/uploads/2023/06/thitbo_TNJU.jpg",
            },
            {
              id: 3,
              name: "Trứng gà",
              categroup: 4,
              thumbnail:
                "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
            },
            {
              id: 4,
              name: "Trứng gà",
              categroup: 4,
              thumbnail:
                "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
            },
          ],
        },
        {
          categoryGroupName: "Rau củ, trái cây",
          id: 2,
          thumbnail:
            "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_108x108/https://cdn.tgdd.vn/Products/Images/10298/bhx/rau-cu-trai-cay-202205261519146845.png",
          list: [
            {
              id: 1,
              name: "Rau củ làm sẵn",
              categroup: 3,
              thumbnail:
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_103x103/https://cdn.tgdd.vn/Products/Images/12439/bhx/rau-cu-lam-san-202308231530220239.png",
            },
            {
              id: 2,
              name: "Rau củ đông lạnh",
              categroup: 3,
              thumbnail:
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_103x103/https://cdn.tgdd.vn/Products/Images/7172/bhx/rau-cu-dong-lanh-202212051420219285.png",
            },
            {
              id: 3,
              name: "Trứng gà",
              categroup: 3,
              thumbnail:
                "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
            },
            {
              id: 4,
              name: "Trứng gà",
              categroup: 3,
              thumbnail:
                "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
            },
          ],
        },
        {
          categoryGroupName: "Bánh kẹo các loại",
          id: 3,
          thumbnail:
            "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_108x108/https://cdn.tgdd.vn/Products/Images/7143/bhx/banh-keo-cac-loai-202205261518436969.png",
          list: [
            {
              id: 1,
              name: "Bánh Chocopie",
              categroup: 5,
              thumbnail:
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_103x103/https://cdn.tgdd.vn/Products/Images/7622/bhx/banh-chocopie-202212051500226263.png",
            },
            {
              id: 2,
              name: "Thịt bò",
              categroup: 5,
              thumbnail:
                "https://bactom.com/wp-content/uploads/2023/06/thitbo_TNJU.jpg",
            },
            {
              id: 3,
              name: "Trứng gà",
              categroup: 5,
              thumbnail:
                "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
            },
            {
              id: 4,
              name: "Trứng gà",
              categroup: 5,
              thumbnail:
                "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
            },
          ],
        },
        {
          categoryGroupName: "Bia, nước có cồn",
          id: 4,
          thumbnail:
            "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_108x108/https://cdn.tgdd.vn/Products/Images/2282/bhx/bia-nuoc-co-con-202403130931205434.png",
          list: [
            {
              id: 1,
              name: "Bia Tiger",
              categroup: 1,
              thumbnail:
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_346x346/https://cdn.tgdd.vn/Products/Images/2282/171020/bhx/6-lon-bia-tiger-bac-330ml-202308250851063935_300x300.jpg",
            },
            {
              id: 2,
              name: "Thịt bò",
              categroup: 1,
              thumbnail:
                "https://bactom.com/wp-content/uploads/2023/06/thitbo_TNJU.jpg",
            },
            {
              id: 3,
              name: "Trứng gà",
              categroup: 1,
              thumbnail:
                "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
            },
            {
              id: 4,
              name: "Trứng gà",
              categroup: 1,
              thumbnail:
                "https://bizweb.dktcdn.net/100/457/224/products/eggs.jpg?v=1683190870110",
            },
          ],
        },
      ];
      // state.error = "Error happened!";
      state.error = action.error.message || "Some thing wrong!";
      // state.error = "Some thing wrong!";
    });
  },
});

export const categoryActions = categoryGroupDetailSlice.actions;
export default categoryGroupDetailSlice;
