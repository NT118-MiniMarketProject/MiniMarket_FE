import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Product from "../Common/Product";
import {
  categoryGroupInterface,
  dummyCategoryGroup,
  dummyProduct,
  ngrok,
  productHomeInterface,
  tenmien,
  tenmien1,
} from "../../utils";
import axios from "axios";
import HomeProductBlock from "./HomeProductBlock";
import ProductBlockSkeleton from "../Common/ProductBlockSkeleton";
import { Colors } from "../styles";

export default function HomeProducts() {
  const [categoryGroups, setCategoryGroups] = useState<
    categoryGroupInterface[]
  >([]);
  const [isFetchingCateGroups, setIsFetchingCateGroup] = useState(true);
  const [products, setProducts] = useState<productHomeInterface[][]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  useEffect(() => {
    const fetchCategoryGroups = async () => {
      try {
        const response = await axios.get(`${ngrok}/api/danhmuc`);
        setCategoryGroups(response.data);
        await loadProductBlock(response.data);
      } catch (e) {
        console.log(e);
        // Toast.show(defaultErrMsg, toastConfig as ToastOptions);
        console.warn(e);
        setCategoryGroups(dummyCategoryGroup);
        await loadProductBlock(dummyCategoryGroup);
      } finally {
        setIsFetchingCateGroup(false);
      }
    };

    fetchCategoryGroups();
  }, []);

  const loadProductBlock = async (categroups: categoryGroupInterface[]) => {
    // console.log("products: ", products.length);
    // console.log("categroups: ", categroups.length);
    if (products.length >= categroups.length || isFetchingProducts) return;
    setIsFetchingProducts(true);
    try {
      const response = await axios.get(
        `${ngrok}/api/danhmuc/${categroups[products.length].id}`
      );
      const data = response.data;
      setProducts([...products, data.data]);
    } catch (e) {
      console.log(e);
      // Toast.show(defaultErrMsg, toastConfig as ToastOptions);
      setProducts([...products, dummyProduct]);
    } finally {
      setIsFetchingProducts(false);
    }
  };

  return (
    <View className="mb-4 bg-transparent">
      {isFetchingCateGroups ? (
        <ProductBlockSkeleton />
      ) : (
        <FlatList
          scrollEnabled={false}
          data={products}
          renderItem={({
            item,
            index,
          }: {
            item: productHomeInterface[];
            index: number;
          }) => {
            return (
              <HomeProductBlock
                categoryGroupId={categoryGroups[index].id}
                categoryGroupName={categoryGroups[index].name}
                products={item}
              />
            );
          }}
          keyExtractor={(item, index) => categoryGroups[index].id.toString()}
          ListFooterComponent={
            isFetchingProducts ? (
              <View className="m-2">
                <ActivityIndicator size={"large"} color={Colors.primary} />
              </View>
            ) : null
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => loadProductBlock(categoryGroups)}
        />
      )}
    </View>
  );
}
