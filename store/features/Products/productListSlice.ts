import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  productHomeBEInterface ,tenmien } from "../../../utils";



interface productListState {
  loading: boolean;
  error: string;
  data: {
    numOfPages: number,
    totalProducts: number,
    currentPage: number,
    products: productHomeBEInterface[]
  }
}


// Lay danh sach cac san pham theo danh muc (:id danh muc)
export const fetchCategoryProducts = createAsyncThunk(
  "productListSlice/fetchCategoryProducts",
  async (query : string ) => {
    try {
      const response = await axios.get(
        `${tenmien}/product/?${query}`
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
      numOfPages: 0,
      totalProducts: 0,
      currentPage: 0,
      products: []
    }
  };
  const productListSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
      clearData(state){
        state.data = initialState.data;
      }
    },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCategoryProducts.pending, (state) => {
      state.loading = true;
      state.error = "";
      // state.data = initialState.data
    })
    .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
      state.loading = false;
      let {currentPage, products, numOfPages, totalProducts} = action.payload;
      const newData: productHomeBEInterface[] = [...state.data.products, ...products];
      state.data = {
        numOfPages,
        totalProducts,
        currentPage,
        products: newData
      }
    })
    .addCase(fetchCategoryProducts.rejected, (state, action) => {
      state.loading = false;
      state.data = {
        numOfPages: 0,
        totalProducts: 0,
        currentPage: 0,
        products: [
        {
          product_id: "1",
          thumbnail: "https://example.com/product1.jpg",
          name: "Nạc dăm heo nhập khẩu 500g & hạt nêm nấm hương Maggi 450g",
          reg_price: 105500,
          discount_percent: 10,
          discount_price: 94950,
          quantity: 69,
          unit: "gói",
          canonical: null,
          description:
            "Nạc dăm là phần nạc dăm mềm, có lớp mỡ mỏng, chứa nhiều axit amin cần thiết cho cơ thể, dùng làm nguyên liệu chế biến các món ăn hấp dẫn.",
          created_at: "2024-05-06T07:08:34.276Z",
          updated_at: null,
          deleted: false,
          rating: "5",
          c_id: "1",
          br_id: "1",
          event_percent: 60,
          event_price: 42200,
          is_visible: "1",
          is_feature: "1",
        },
        {
          product_id: "2",
          thumbnail: "https://example.com/product2.jpg",
          name: "Gorton’s Beer Battered Fish Fillets",
          reg_price: 28000,
          discount_percent: 15,
          discount_price: 23800,
          quantity: 150,
          unit: "pack",
          canonical: "gortons-beer-battered-fish-fillets",
          description:
            "Delicious beer battered fish fillets, perfect for a quick and tasty meal.",
          created_at: "2024-03-10T10:20:30.000Z",
          updated_at: "2024-03-20T12:45:00.000Z",
          deleted: false,
          rating: "4.5",
          c_id: "2",
          br_id: "2",
          event_percent: 20,
          event_price: 22400,
          is_visible: "1",
          is_feature: "0",
        },
        {
          product_id: "3",
          thumbnail: "https://example.com/product3.jpg",
          name: "Nestle Original Coffee-Mate Coffee Creamer",
          reg_price: 3796,
          discount_percent: 10,
          discount_price: 3445,
          quantity: 200,
          unit: "bottle",
          canonical: "nestle-coffee-mate-creamer",
          description:
            "Nestle Original Coffee-Mate Coffee Creamer, a rich and creamy addition to your coffee.",
          created_at: "2024-02-15T08:30:45.000Z",
          updated_at: "2024-04-25T09:15:10.000Z",
          deleted: false,
          rating: "4",
          c_id: "3",
          br_id: "3",
          event_percent: 25,
          event_price: 2847,
          is_visible: "1",
          is_feature: "0",
        },
        {
          product_id: "4",
          thumbnail: "https://example.com/product4.jpg",
          name: "Seeds of Change Brown & Red Rice",
          reg_price: 8000,
          discount_percent: 10,
          discount_price: 7200,
          quantity: 500,
          unit: "bag",
          canonical: "seeds-of-change-rice",
          description:
            "Organic brown and red rice blend, perfect for a healthy and nutritious meal.",
          created_at: "2024-01-10T12:00:00.000Z",
          updated_at: "2024-03-15T13:30:00.000Z",
          deleted: false,
          rating: "3.7",
          c_id: "4",
          br_id: "4",
          event_percent: 15,
          event_price: 6800,
          is_visible: "1",
          is_feature: "1",
        },
        {
          product_id: "5",
          thumbnail: "https://example.com/product5.jpg",
          name: "Sahale Crumble Cashew Mix Snacks",
          reg_price: 4500,
          discount_percent: 5,
          discount_price: 4275,
          quantity: 300,
          unit: "bag",
          canonical: "sahale-crumble-cashew-snacks",
          description:
            "Tasty and nutritious cashew mix snacks with a crumble texture.",
          created_at: "2024-04-05T15:10:20.000Z",
          updated_at: "2024-04-15T16:20:30.000Z",
          deleted: false,
          rating: "2",
          c_id: "5",
          br_id: "5",
          event_percent: 10,
          event_price: 4050,
          is_visible: "1",
          is_feature: "0",
        },
        {
          product_id: "6",
          thumbnail: "https://example.com/product6.jpg",
          name: "Organic Raw Almonds",
          reg_price: 12000,
          discount_percent: 20,
          discount_price: 9600,
          quantity: 250,
          unit: "bag",
          canonical: "organic-raw-almonds",
          description:
            "High-quality organic raw almonds, perfect for snacking or adding to recipes.",
          created_at: "2024-05-01T18:45:00.000Z",
          updated_at: "2024-05-20T19:55:00.000Z",
          deleted: false,
          rating: "4.8",
          c_id: "6",
          br_id: "6",
          event_percent: 25,
          event_price: 9000,
          is_visible: "1",
          is_feature: "1",
        },
        {
          product_id: "7",
          thumbnail: "https://example.com/product4.jpg",
          name: "Seeds of Change Brown & Red Rice",
          reg_price: 8000,
          discount_percent: 10,
          discount_price: 7200,
          quantity: 500,
          unit: "bag",
          canonical: "seeds-of-change-rice",
          description:
            "Organic brown and red rice blend, perfect for a healthy and nutritious meal.",
          created_at: "2024-01-10T12:00:00.000Z",
          updated_at: "2024-03-15T13:30:00.000Z",
          deleted: false,
          rating: "3.7",
          c_id: "4",
          br_id: "4",
          event_percent: 15,
          event_price: 6800,
          is_visible: "1",
          is_feature: "1",
        },
        {
          product_id: "8",
          thumbnail: "https://example.com/product5.jpg",
          name: "Sahale Crumble Cashew Mix Snacks",
          reg_price: 4500,
          discount_percent: 5,
          discount_price: 4275,
          quantity: 300,
          unit: "bag",
          canonical: "sahale-crumble-cashew-snacks",
          description:
            "Tasty and nutritious cashew mix snacks with a crumble texture.",
          created_at: "2024-04-05T15:10:20.000Z",
          updated_at: "2024-04-15T16:20:30.000Z",
          deleted: false,
          rating: "2",
          c_id: "5",
          br_id: "5",
          event_percent: 10,
          event_price: 4050,
          is_visible: "1",
          is_feature: "0",
        },
        {
          product_id: "9",
          thumbnail: "https://example.com/product6.jpg",
          name: "Organic Raw Almonds",
          reg_price: 12000,
          discount_percent: 20,
          discount_price: 9600,
          quantity: 250,
          unit: "bag",
          canonical: "organic-raw-almonds",
          description:
            "High-quality organic raw almonds, perfect for snacking or adding to recipes.",
          created_at: "2024-05-01T18:45:00.000Z",
          updated_at: "2024-05-20T19:55:00.000Z",
          deleted: false,
          rating: "4.8",
          c_id: "6",
          br_id: "6",
          event_percent: 25,
          event_price: 9000,
          is_visible: "1",
          is_feature: "1",
        },
        
      ]
    
      }

      // state.data = [
      //   ...state.data,
      //   // {
      //   //   id: 7,
      //   //   thumbnail:
      //   //     "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-5.jpg?v=1663128373&width=360",
      //   //   name: "Seeds of Change Brown & Red Rice",
      //   //   rating: 4.1,
      //   //   discount_price: 72,
      //   //   reg_price: 80,
      //   //   category_name: "Bánh kẹo",
      //   // },
      //   // {
      //   //   id: 8,
      //   //   thumbnail:
      //   //     "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2_3f29934d-43f4-497f-a3c5-56b7159c91af.jpg?v=1663051490&width=360",
      //   //   name: "Sahale Crumble Cashew Mix Snacks",
      //   //   rating: 3.9,
      //   //   discount_price: 45.3,
      //   //   reg_price: 40,
      //   //   category_name: "Bánh kẹo",
      //   // },
      //   // {
      //   //   id: 9,
      //   //   thumbnail:
      //   //     "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-2.jpg?v=1656924060&width=360",
      //   //   name: "Gorton’s Beer Battered Fish Fillets",
      //   //   rating: 4.5,
      //   //   discount_price: 23.85,
      //   //   reg_price: 28,
      //   //   category_name: "Bánh kẹo",
      //   // },
      //   // {
      //   //   id: 10,
      //   //   thumbnail:
      //   //     "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-3.jpg?v=1663128562&width=360",
      //   //   name: "Nestle Original Coffee-Mate Coffee Creamer",
      //   //   rating: 5,
      //   //   discount_price: 32.45,
      //   //   reg_price: 37.96,
      //   //   category_name: "Bánh kẹo",
      //   // },
      //   // {
      //   //   id: 11,
      //   //   thumbnail:
      //   //     "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-5.jpg?v=1663128373&width=360",
      //   //   name: "Seeds of Change Brown & Red Rice",
      //   //   rating: 5,
      //   //   discount_price: 72,
      //   //   reg_price: 80,
      //   //   category_name: "Bánh kẹo",
      //   // },
      //   // {
      //   //   id: 12,
      //   //   thumbnail:
      //   //     "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2_3f29934d-43f4-497f-a3c5-56b7159c91af.jpg?v=1663051490&width=360",
      //   //   name: "Sahale Crumble Cashew Mix Snacks",
      //   //   rating: 5,
      //   //   discount_price: 45.3,
      //   //   reg_price: 40,
      //   //   category_name: "Bánh kẹo",
      //   // },
      // ];
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
        // state.data.data = [
        //   {
        //     id: 1,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-2.jpg?v=1656924060&width=360",
        //     name: "Gorton’s Beer Battered Fish Fillets",
        //     rating: 4.5,
        //     discount_price: 23.85,
        //     reg_price: 28,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 2,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-3.jpg?v=1663128562&width=360",
        //     name: "Nestle Original Coffee-Mate Coffee Creamer",
        //     rating: 4,
        //     discount_price: 32.45,
        //     reg_price: 37.96,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 3,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-5.jpg?v=1663128373&width=360",
        //     name: "Seeds of Change Brown & Red Rice",
        //     rating: 3.7,
        //     discount_price: 72,
        //     reg_price: 80,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 4,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2_3f29934d-43f4-497f-a3c5-56b7159c91af.jpg?v=1663051490&width=360",
        //     name: "Sahale Crumble Cashew Mix Snacks",
        //     rating: 2,
        //     discount_price: 45.3,
        //     reg_price: 40,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 5,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-2.jpg?v=1656924060&width=360",
        //     name: "Gorton’s Beer Battered Fish Fillets",
        //     rating: 4.8,
        //     discount_price: 23.85,
        //     reg_price: 28,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 6,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-3.jpg?v=1663128562&width=360",
        //     name: "Nestle Original Coffee-Mate Coffee Creamer",
        //     rating: 5,
        //     discount_price: 32.45,
        //     reg_price: 37.96,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 7,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-5.jpg?v=1663128373&width=360",
        //     name: "Seeds of Change Brown & Red Rice",
        //     rating: 4.1,
        //     discount_price: 72,
        //     reg_price: 80,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 8,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2_3f29934d-43f4-497f-a3c5-56b7159c91af.jpg?v=1663051490&width=360",
        //     name: "Sahale Crumble Cashew Mix Snacks",
        //     rating: 3.9,
        //     discount_price: 45.3,
        //     reg_price: 40,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 9,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/product-9-2.jpg?v=1656924060&width=360",
        //     name: "Gorton’s Beer Battered Fish Fillets",
        //     rating: 4.5,
        //     discount_price: 23.85,
        //     reg_price: 28,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 10,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-3.jpg?v=1663128562&width=360",
        //     name: "Nestle Original Coffee-Mate Coffee Creamer",
        //     rating: 5,
        //     discount_price: 32.45,
        //     reg_price: 37.96,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 11,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/thumbnail-5.jpg?v=1663128373&width=360",
        //     name: "Seeds of Change Brown & Red Rice",
        //     rating: 5,
        //     discount_price: 72,
        //     reg_price: 80,
        //     category_name: "Bánh kẹo",
        //   },
        //   {
        //     id: 12,
        //     thumbnail:
        //       "https://boostify-nesst.myshopify.com/cdn/shop/products/product-2-2_3f29934d-43f4-497f-a3c5-56b7159c91af.jpg?v=1663051490&width=360",
        //     name: "Sahale Crumble Cashew Mix Snacks",
        //     rating: 5,
        //     discount_price: 45.3,
        //     reg_price: 40,
        //     category_name: "Bánh kẹo",
        //   },
        // ];
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

export const {clearData} = productListSlice.actions;
export default productListSlice;
