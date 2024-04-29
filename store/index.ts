import {configureStore} from "@reduxjs/toolkit";
import categoryGroupSlice from "./features/Collection/categoryGroupSlice";
import productDetailSlice from "./features/Product/productDetailSlice";
import productListSlice from "./features/Products/productListSlice";
import cartSlice from "./features/Cart/cartSlice";
import salesSlice from "./features/Sales/salesSlice";
import productsSalesSlice from "./features/Sales/productsSalesSlice";
import productsBestSellSlice from "./features/Home/productsBestSellSlice";
import productsPopularSlice from "./features/Home/productsPopularSlice";
import brandSlice from "./features/CategoryProducts/brandSlice";
import categorySlice from "./features/CategoryProducts/categorySlice";
import categoryGroupRandSlice from "./features/CategoryProducts/categoryGroupRandSlice";
import userSlice from "./features/Auth/userSlice";
import orderListSlice from "./features/Orders/orderListSlice";
import orderSlice from "./features/Orders/orderSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import productReviewSlice from "./features/Product/productReviewSlice";
import wishlistSlice from "./features/Products/wishlistSlice";
import categoryHeaderSlice from "./features/Collection/categoryHeaderSlice";
import categoryGroupDetailSlice from "./features/Collection/categoryGroupDetailSlice";


export const store = configureStore({
  reducer: {
    categoryGroup: categoryGroupSlice.reducer,
    category: categorySlice.reducer,
    productDetail: productDetailSlice.reducer,
    productList: productListSlice.reducer,  
    cart: cartSlice.reducer,
    sales: salesSlice.reducer,
    productsSales: productsSalesSlice.reducer,
    productsBestSell: productsBestSellSlice.reducer,
    productsPopular: productsPopularSlice.reducer,
    brand: brandSlice.reducer,
    categoryGroupRand: categoryGroupRandSlice.reducer,
    productReview: productReviewSlice.reducer,
    user: userSlice.reducer,
    order: orderSlice.reducer,
    orderList: orderListSlice.reducer,
    wishlist: wishlistSlice.reducer,
    categoryHeader: categoryHeaderSlice.reducer,
    categoryGroupDetail: categoryGroupDetailSlice.reducer
  },
  devTools: process.env.NODE_ENV==="development",
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;