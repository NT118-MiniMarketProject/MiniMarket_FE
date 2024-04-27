import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { error} from "console";
import { productHomeInterface, tenmien } from "../../../utils";



interface productsBestSellState {
  loading: boolean;
  error: string;
  data: [
    {
      id?: number;
      type: "Nổi bật";
      query: "noibat";
      products: productHomeInterface[];
    },
    {
      id?: number;
      type: "Phổ biến";
      query: "phobien";
      products: productHomeInterface[];
    },
    {
      id?: number;
      type: "Hàng mới";
      query: "hangmoi";
      products: productHomeInterface[];
    }
  ];
}
// Thunk functions
export const fetchProductsBestSell = createAsyncThunk(
  "productsBestSellSlice/fetchProductsBestSell",
  async () => {
    try {
      const response = await axios.get(
        tenmien+"/api/sanpham/banchay"
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: productsBestSellState = {
  data: [
    {
      type: "Nổi bật",
      query: "noibat",
      products: [
        
      ],
    },
    {
      type: "Phổ biến",
      query: "phobien",
      products: [
        
      ],
    },
    {
      type: "Hàng mới",
      query: "hangmoi",
      products: [
        
      ],
    },
  ],
  loading: false,
  error: "",
};
const productsBestSellSlice = createSlice({
  name: "productsBestSell",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsBestSell.pending, (state) => {
      state.loading = true;
      state.data = [
        {
          type: "Nổi bật",
          query: "noibat",
          products: [],
        },
        {
          type: "Phổ biến",
          query: "phobien",
          products: [],
        },
        {
          type: "Hàng mới",
          query: "hangmoi",
          products: [],
        },
      ];
      state.error = "";
    });
    builder.addCase(fetchProductsBestSell.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProductsBestSell.rejected, (state, action) => {
      state.loading = false;
      state.data = [
        {
          type: "Nổi bật",
          query: "noibat",
          products: [
            {
              id: 1,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-2.jpg?v=1656924060&width=360",
              name: "Gorton’s Beer Battered Fish Fillets",
              rating: 4.5,
              discount_price: 23.85,
              reg_price: 28,
              category_name: "Bánh kẹo",
            },
            {
              id: 2,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-3.jpg?v=1663128562&width=360",
              name: "Nestle Original Coffee-Mate Coffee Creamer",
              rating: 4,
              discount_price: 32.45,
              reg_price: 37.96,
              category_name: "Bánh kẹo",
            },
            {
              id: 3,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-5.jpg?v=1663128373&width=360",
              name: "Seeds of Change Brown & Red Rice",
              rating: 3.7,
              discount_price: 72,
              reg_price: 80,
              category_name: "Bánh kẹo",
            },
            {
              id: 4,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-3.jpg?v=1663128562&width=360",
              name: "Nestle Original Coffee-Mate Coffee Creamer",
              rating: 4,
              discount_price: 32.45,
              reg_price: 37.96,
              category_name: "Bánh kẹo",
            },
            {
              id: 5,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-5.jpg?v=1663128373&width=360",
              name: "Seeds of Change Brown & Red Rice",
              rating: 3.7,
              discount_price: 72,
              reg_price: 80,
              category_name: "Bánh kẹo",
            },
          ],
        },
        {
          type: "Phổ biến",
          query: "phobien",
          products: [
            {
              id: 4,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2_3f29934d-43f4-497f-a3c5-56b7159c91af.jpg?v=1663051490&width=360",
              name: "Sahale Crumble Cashew Mix Snacks",
              rating: 2,
              discount_price: 45.3,
              reg_price: 40,
              category_name: "Bánh kẹo",
            },
            {
              id: 5,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-2.jpg?v=1656924060&width=360",
              name: "Gorton’s Beer Battered Fish Fillets",
              rating: 4.8,
              discount_price: 23.85,
              reg_price: 28,
              category_name: "Bánh kẹo",
            },
            {
              id: 6,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-3.jpg?v=1663128562&width=360",
              name: "Nestle Original Coffee-Mate Coffee Creamer",
              rating: 5,
              discount_price: 32.45,
              reg_price: 37.96,
              category_name: "Bánh kẹo",
            },
          ],
        },
        {
          type: "Hàng mới",
          query: "hangmoi",
          products: [
            {
              id: 7,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-5.jpg?v=1663128373&width=360",
              name: "Seeds of Change Brown & Red Rice",
              rating: 4.1,
              discount_price: 72,
              reg_price: 80,
              category_name: "Bánh kẹo",
            },
            {
              id: 8,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2_3f29934d-43f4-497f-a3c5-56b7159c91af.jpg?v=1663051490&width=360",
              name: "Sahale Crumble Cashew Mix Snacks",
              rating: 3.9,
              discount_price: 45.3,
              reg_price: 40,
              category_name: "Bánh kẹo",
            },
            {
              id: 9,
              thumbnail:
                "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-2.jpg?v=1656924060&width=360",
              name: "Gorton’s Beer Battered Fish Fillets",
              rating: 4.5,
              discount_price: 23.85,
              reg_price: 28,
              category_name: "Bánh kẹo",
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

export const productsBestSellActions = productsBestSellSlice.actions;
export default productsBestSellSlice;
