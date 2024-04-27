import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";

interface cartData {
  id?: number;
  quantity: number;
  total: number;
  savings: number;
  list: {
    cartItemId: number;
    productId: number,
    thumbnail: string;
    name: string;
    quantity: number;
    reg_price: number;
    discount_price: number;
  }[];
}
interface cartState {
  loading: boolean;
  error: string;
  data: cartData;
}

// Thunk functions
export const fetchCart = createAsyncThunk("cartSlice/fetchCart", async (cartId:string) => {
  try {
    const response = await axios.get(tenmien + "/api/giohang/"+cartId);
    return response.data;
  } catch (err) {
    throw err;
  }
});  

export const addToCart = createAsyncThunk(
  "cartSlice/addToCart",
  async ({cartId, productId, quantity}:{cartId: number, productId: number, quantity:number}) => {
    try {
      const response = await axios.post(tenmien + "/api/giohang/them", {
        cartId, productId, quantity
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
); 

export const updateQuantityCart = createAsyncThunk(
  "cartSlice/updateQuantityCart",
  async ({
    cartItemId,
    quantity
  }: {
    cartItemId: number;
    quantity: number
  }) => {
    try {
      const response = await axios.put(tenmien + "/api/giohang/capnhat/"+cartItemId, {
        quantity
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
); 



export const deleteCart = createAsyncThunk(
  "cartSlice/deleteCart",
  async ({ cartId }: { cartId: number }) => {
    try {
      const response = await axios.delete(
        tenmien + "/api/giohang/"+cartId+"/xoa"
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
); 



const initialState: cartState = {
    loading: false, 
    error: "",
    data:{
        id: 0,
        quantity: 0,
        total: 0,
        savings: 0,
        list: []
    }
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Fetch Cart
        builder.addCase(fetchCart.pending, state => {
            state.loading = true;
            state.error = "";
            state.data = initialState.data;
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Some thing wrong";
        })
        // Add to Cart
        builder
        .addCase(addToCart.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(addToCart.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(addToCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Some thing wrong";
        });
        // Update quantity
        builder
        .addCase(updateQuantityCart.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(updateQuantityCart.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(updateQuantityCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Some thing wrong";
        });
        // Delete cart
        builder
          .addCase(deleteCart.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.data = initialState.data;
          })
          .addCase(deleteCart.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(deleteCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Some thing wrong";
          });


    }
})


export const cartActions = cartSlice.actions;
export default cartSlice;