import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import {
  categoryGroupInterface,
  dummyProduct,
  ngrok,
  productHomeInterface,
  tenmien,
} from "../../utils";
import axios from "axios";
import Toast, { ToastOptions } from "react-native-root-toast";
import { Icon, toastConfig } from "../styles";
import Product from "../Common/Product";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProductSkeleton from "../Common/ProductSkeleton";

const defaultErrMsg = "Ops! There's something wrong, try again later";

interface HomeProductBlockProps {
  categoryGroupId: categoryGroupInterface["id"];
  categoryGroupName: categoryGroupInterface["name"];
  products?: productHomeInterface[];
}

const HomeProductBlock: React.FC<HomeProductBlockProps> = ({
  categoryGroupId,
  categoryGroupName,
  products = [],
}) => {
  const [isLoading, setIsLoading] = useState(products.length ? false : true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${ngrok}/api/danhmuc/${categoryGroupId}`
        );
        const data = response.data;
        products = data.data;
      } catch (e) {
        console.log(e);
        // Toast.show(defaultErrMsg, toastConfig as ToastOptions);
        products = dummyProduct;
      } finally {
        setIsLoading(false);
      }
    };
    if (products.length === 0) fetchProducts();
  }, []);

  return (
    <View
      className="flex-row w-full flex-wrap pt-10 relative border-t-2 mt-14"
      style={{ backgroundColor: "#F5FDFF", borderColor: "#00B906" }}
    >
      <View
        className="flex-row absolute justify-center items-center left-0 right-0"
        style={{ top: -20 }}
      >
        {/* Left triangle */}
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderRightWidth: 15,
            borderTopWidth: 18.5,
            alignSelf: "flex-start",
            borderRightColor: "#005C03",
            borderTopColor: "transparent",
          }}
        />
        {/* Name */}
        <Text
          className="py-1 px-3 rounded-b-lg text-lg text-white font-semibold"
          style={{
            backgroundColor: "#00B906",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          {categoryGroupName}
        </Text>
        {/* Right triangle */}
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderLeftWidth: 15,
            borderTopWidth: 18.5,
            alignSelf: "flex-start",
            borderLeftColor: "#005C03",
            borderTopColor: "transparent",
          }}
        />
      </View>
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <View className="w-1/3 mb-1 px-0.5" key={index}>
            <ProductSkeleton key={index} />
          </View>
        ))
      ) : (
        <FlatList
          scrollEnabled={false}
          numColumns={3}
          columnWrapperStyle={{ flex: 1 }}
          data={products}
          renderItem={({
            item,
            index,
          }: {
            item: productHomeInterface;
            index: number;
          }) => {
            if (index >= 15) return null;
            return (
              <View className="w-1/3 mb-1 px-0.5">
                <Product {...item} />
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Xem thêm */}
      {!isLoading && (
        <TouchableOpacity className="flex-row justify-center items-center bg-green-200 py-3 min-w-full mt-3">
          <Text>Xem thêm </Text>
          <Text className="font-semibold">{categoryGroupName}</Text>
          <Icon
            name="chevron-forward-outline"
            size={18}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeProductBlock;

const styles = StyleSheet.create({});
