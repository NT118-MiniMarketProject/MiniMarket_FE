import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";


interface categoryGroupRandData {
  id: number;
  name: string;
  thumbnail: string;
}
interface categoryGroupRandState {
  loading: boolean;
  error: string;
  data: categoryGroupRandData[];
}
// Thunk functions
export const fetchCategoryGroupRand = createAsyncThunk(
  "categoryGroupRandSlice/fetchCategoryGroupRand",
  async (id:number) => {
    try {
      const response = await axios.get(tenmien + "/api/danhmuc/"+id+"/random");
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: categoryGroupRandState = {
  data: [],
  loading: false,
  error: "",
};
const categoryGroupRandSlice = createSlice({
  name: "categoryGroupRand",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryGroupRand.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchCategoryGroupRand.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCategoryGroupRand.rejected, (state, action) => {
      state.loading = false;
      state.data = [
        {
          id: 1,
          name: "Bánh kẹo, bánh quy",
          thumbnail:
            "https://nhamita.com/vnt_upload/service/04_2021/thu_tuc_nhap_khau_banh_keo.jpg",
        },
        {
          id: 2,
          name: "Rau củ, trái cây",
          thumbnail:
            "https://www.vinmec.com/s3-images/20220112_145829_794851_cac-loai-rau-cu-98.max-1800x1800.jpg",
        },
        {
          id: 3,
          name: "Nước ngọt, nước giải khát",
          thumbnail: "https://cdn.tgdd.vn/2021/05/content/1-800x450-54.jpg",
        },
        {
          id: 4,
          name: "Nước ngọt, nước giải khát",
          thumbnail: "https://cdn.tgdd.vn/2021/05/content/1-800x450-54.jpg",
        },
      ];
      // state.error = "Error happened!";
      state.error = action.error.message || "Some thing wrong!";
      // state.error = "Some thing wrong!";
    });
  },
});

export const categoryGroupRandActions = categoryGroupRandSlice.actions;
export default categoryGroupRandSlice;
