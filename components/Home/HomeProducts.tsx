import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import {
  categoryGroupBEInterface,
  dummyCategoryGroup,
  dummyProduct,
  productHomeBEInterface,
  tenmien,
} from "../../utils";
import ProductBlockSkeleton from "../Common/ProductBlockSkeleton";
import { Colors } from "../styles";
import HomeProductBlock from "./HomeProductBlock";

export default function HomeProducts() {
  const [categoryGroups, setCategoryGroups] = useState<
    categoryGroupBEInterface[]
  >([]);
  const [isFetchingCateGroups, setIsFetchingCateGroup] = useState(true);
  const [fetchedProducts, setFetchedProducts] = useState<
    { products: productHomeBEInterface[]; totalProducts: number }[]
  >([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  useEffect(() => {
    const fetchCategoryGroups = async () => {
      try {
        // fetching category groups
        // const response = await axios.get(`${ngrok}/api/danhmuc`);
        const response = await axios.get(`${tenmien}/category/group`);
        const data = response.data;
        setCategoryGroups(data.categroup);
        await loadProductBlock(data.categroup);
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

  const loadProductBlock = async (categroups: categoryGroupBEInterface[]) => {
    // console.log("products: ", products.length);
    // console.log("categroups: ", categroups.length);
    if (fetchedProducts.length >= categroups.length || isFetchingProducts)
      return;
    setIsFetchingProducts(true);
    try {
      // const response = await axios.get(
      //   `${ngrok}/api/danhmuc/${categroups[products.length].id}`
      // );
      const response = await axios.get(
        `${tenmien}/category/group/search/${
          categroups[fetchedProducts.length].categroup_id
        }}`
      );
      const data = response.data;
      const { products, totalProducts } = data;
      setFetchedProducts([...fetchedProducts, { products, totalProducts }]);
    } catch (e) {
      console.log(e);
      // Toast.show(defaultErrMsg, toastConfig as ToastOptions);
      setFetchedProducts([
        ...fetchedProducts,
        { products: dummyProduct, totalProducts: 0 },
      ]);
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
          data={fetchedProducts}
          renderItem={({ item, index }) => {
            return (
              <HomeProductBlock
                categoryGroupId={categoryGroups[index].categroup_id}
                categoryGroupName={categoryGroups[index].categroup_name}
                fetchedProducts={item}
              />
            );
          }}
          keyExtractor={(item, index) =>
            categoryGroups[index].categroup_id.toString()
          }
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
