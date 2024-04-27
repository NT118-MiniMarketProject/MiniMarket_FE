import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";

// import { createJsxSelfClosingElement } from "typescript";



interface categoryGroupData {
  id: number,
  name: string,
  thumbnail: string
}
interface categoryGroupState {
    loading: boolean,
    error: string,
    data: categoryGroupData[]
}
// Thunk functions
export const fetchCategoryGroup = createAsyncThunk(
  "categoryGroupSlice/fetchCategoryGroup",
  async () => {
    try {
      const response = await axios.get(
        tenmien+"/api/danhmuc"
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);   

const initialState: categoryGroupState = {
    data: [],
    loading: false,
    error: ''
}
const categoryGroupSlice = createSlice({
    name: 'categoryGroup',
    initialState,
    reducers:{
        // update(state, action: PayloadAction<{data: {id: number, name:string, thumbnail: string}[]}>){
        //     state.data  = action.payload.data;
        // },
        // add(state, action: PayloadAction<{name: string, thumbnail:string}>){
        //     state.data.push({
        //         ...state.data,
        //         id: state.data.length+1,
        //         name: action.payload.name,
        //         thumbnail: action.payload.thumbnail
        //     })
        // },
        // delete(state, action: PayloadAction<{id: number}>){
        //     state.data.filter(item => item.id!==action.payload.id);
        // }

    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchCategoryGroup.pending, state =>{
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchCategoryGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchCategoryGroup.rejected, (state ,action) => {
            state.loading = false;
            
            state.error = action.error.message || "Some thing wrong!";
        })

    }
})


export const categoryGroupActions = categoryGroupSlice.actions;
export default categoryGroupSlice;