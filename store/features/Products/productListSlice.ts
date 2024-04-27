import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productHomeInterface, tenmien } from "../../../utils";


interface productListState {
  loading: boolean;
  error: string;
  data: {
    page: number,
    data: productHomeInterface[]
  }
}
// Thunk functions
// export const fetchProductList = createAsyncThunk(
//   "fetchProductList",
//   () => {
//     return axios
//       .get(tenmien + "/api/danhmuctonng")
//       .then((response) => response.data);
//   }
// );

// Lay danh sach cac san pham theo danh muc (:id danh muc)
export const fetchCategoryGroupProducts = createAsyncThunk(
  "productListSlice/fetchCategoryGroupProducts",
  async ({ id, query }: { id: number; query: string }) => {
    // console.log(`${tenmien}/api/danhmuc/${id}?${query}`);
    // return axios
    //   .get(`${tenmien}/api/danhmuc/${id}?${query}`)
    //   .then((response) => response.data);
    try {
      const response = await axios.get(
        `${tenmien}/api/danhmuc/${id}?${query}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const fetchProductsAll = createAsyncThunk(
  "productListSlice/fetchProductsAll",
  async ({ query }: { query: string }) => {
    // console.log(`${tenmien}/api/danhmuc/${id}?${query}`);
    // return axios
    //   .get(`${tenmien}/api/danhmuc/${id}?${query}`)
    //   .then((response) => response.data);
    try {
      const response = await axios.get(`${tenmien}/api/search?${query}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  "productListSlice/fetchRelatedProducts",
  async (id:string) => {
    try {
      const response = await axios.get(tenmien + "/api/sanpham/"+id+"/lienquan");
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);



const initialState: productListState = {
  loading: false,
  error: "",
  data: {
    page: 0,
    data: [],
  },
};
const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCategoryGroupProducts.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = initialState.data
    })
    .addCase(fetchCategoryGroupProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchCategoryGroupProducts.rejected, (state, action) => {
      state.loading = false;
      state.data.data = [
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
        {
          id: 10,
          thumbnail:
            "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-3.jpg?v=1663128562&width=360",
          name: "Nestle Original Coffee-Mate Coffee Creamer",
          rating: 5,
          discount_price: 32.45,
          reg_price: 37.96,
          category_name: "Bánh kẹo",
        },
        {
          id: 11,
          thumbnail:
            "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-5.jpg?v=1663128373&width=360",
          name: "Seeds of Change Brown & Red Rice",
          rating: 5,
          discount_price: 72,
          reg_price: 80,
          category_name: "Bánh kẹo",
        },
        {
          id: 12,
          thumbnail:
            "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2_3f29934d-43f4-497f-a3c5-56b7159c91af.jpg?v=1663051490&width=360",
          name: "Sahale Crumble Cashew Mix Snacks",
          rating: 5,
          discount_price: 45.3,
          reg_price: 40,
          category_name: "Bánh kẹo",
        },
      ];
      state.error = action.error.message || "Some thing wrong!";
    });
    // Fetch products all
    builder
      .addCase(fetchProductsAll.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.data = initialState.data;
      })
      .addCase(fetchProductsAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductsAll.rejected, (state, action) => {
        state.loading = false;
        state.data.data = [
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
          {
            id: 10,
            thumbnail:
              "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-3.jpg?v=1663128562&width=360",
            name: "Nestle Original Coffee-Mate Coffee Creamer",
            rating: 5,
            discount_price: 32.45,
            reg_price: 37.96,
            category_name: "Bánh kẹo",
          },
          {
            id: 11,
            thumbnail:
              "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-5.jpg?v=1663128373&width=360",
            name: "Seeds of Change Brown & Red Rice",
            rating: 5,
            discount_price: 72,
            reg_price: 80,
            category_name: "Bánh kẹo",
          },
          {
            id: 12,
            thumbnail:
              "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2_3f29934d-43f4-497f-a3c5-56b7159c91af.jpg?v=1663051490&width=360",
            name: "Sahale Crumble Cashew Mix Snacks",
            rating: 5,
            discount_price: 45.3,
            reg_price: 40,
            category_name: "Bánh kẹo",
          },
        ];
        state.error = action.error.message || "Some thing wrong!";
      });
    // Fetch related products
    builder.addCase(fetchRelatedProducts.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = initialState.data;
    });
    builder.addCase(fetchRelatedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchRelatedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Some thing wrong!";
    });
  },
});

export const productListActions = productListSlice.actions;
export default productListSlice;
