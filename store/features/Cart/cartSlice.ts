import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";

interface Product {
  product_id: string;
  thumbnail: string;
  name: string;
  reg_price: number;
  discount_price: number;
}

interface CartItem {
  cartItem: number;
  quantity: number;
  total: number;
  saving: number;
  products: Product;
}

interface Cart {
  cart_id: string;
  quantity: number;
  total: number;
  saved: number;
  cartItems: CartItem[];
}

interface cartState {
  loading: boolean;
  error: string;
  data: Cart;
}

// Thunk functions
export const fetchCart = createAsyncThunk("cartSlice/fetchCart", async () => {
  try {
    const response = await axios.get(tenmien + "/cart/");
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const addToCart = createAsyncThunk(
  "cartSlice/addToCart",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    try {
      const response = await axios.post(tenmien + "/cart", {
        products: [
          {
            productId,
            quantity,
          },
        ],
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
    quantity,
  }: {
    cartItemId: string;
    quantity: number;
  }) => {
    try {
      const response = await axios.patch(tenmien + "/cart/" + cartItemId, {
        quantity,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

// export const deleteCart = createAsyncThunk(
//   "cartSlice/deleteCart",
//   async ({ cartId }: { cartId: number }) => {
//     try {
//       const response = await axios.delete(
//         tenmien + "/api/giohang/"+cartId+"/xoa"
//       );
//       return response.data;
//     } catch (err) {
//       throw err;
//     }
//   }
// );

const initialState: cartState = {
  loading: false,
  error: "",
  data: {
    cart_id: "",
    quantity: 0,
    total: 0,
    saved: 0,
    cartItems: [],
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Cart
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = initialState.data;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      const { data } = action.payload;
      state.data = data;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      // state.data = {
      //   cart_id: "951e7b19-f7be-4ffd-badc-dab41af74ae4",
      //   quantity: 9, // Updated quantity to reflect the total number of items in the cart
      //   total: 459000, // Updated total to reflect the combined total price of all items in the cart
      //   saved: 0,
      //   cartItems: [
      //     {
      //       quantity: 3,
      //       total: 153000,
      //       saving: 0,
      //       products: {
      //         product_id: "999",
      //         thumbnail:
      //           "data:image/jpeg;base64,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",
      //         name: "Lạp xưởng heo Vissan gói 200g",
      //         reg_price: 51000,
      //         discount_price: 51000,
      //       },
      //     },
      //     {
      //       quantity: 3,
      //       total: 153000,
      //       saving: 0,
      //       products: {
      //         product_id: "888",
      //         thumbnail:
      //           "https://cdn.tgdd.vn/Products/Images/8782/274403/bhx/ca-thu-cat-khuc-300g-giao-khuc-giua-202403071607219259.jpg",
      //         name: "Cá thu tươi nguyên con 300-400g",
      //         reg_price: 51000,
      //         discount_price: 51000,
      //       },
      //     },
      //     {
      //       quantity: 3,
      //       total: 153000,
      //       saving: 0,
      //       products: {
      //         product_id: "777",
      //         thumbnail:
      //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoz6UoUu2EueU9ecrh3lLNnSpMa9WGkfSzzA&s",
      //         name: "Cá bông lau fillet túi 400g",
      //         reg_price: 51000,
      //         discount_price: 51000,
      //       },
      //     },

      //   ],
      // };
      state.loading = false;
      state.error = action.error.message || "Some thing wrong";
    });
    // Add to Cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const { data } = action.payload;
        state.data = data;
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
        const { data } = action.payload;
        state.data = data;
      })
      .addCase(updateQuantityCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Some thing wrong";
      });
    // Delete cart
    // builder
    //   .addCase(deleteCart.pending, (state) => {
    //     state.loading = true;
    //     state.error = "";
    //     state.data = initialState.data;
    //   })
    //   .addCase(deleteCart.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(deleteCart.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || "Some thing wrong";
    //   });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
