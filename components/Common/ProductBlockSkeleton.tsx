import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductBlockSkeleton() {
  const colorMode: "light" | "dark" = "light";
  return (
    <View
      className="flex-row w-full flex-wrap pt-10 pb-5 relative border-t-2 mt-14"
      style={{ backgroundColor: "#F5FDFF", borderColor: Colors.placeholder }}
    >
      <View
        className="flex-row absolute justify-center items-center left-0 right-0"
        style={{ top: -20 }}
      >
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderRightWidth: 15,
            borderTopWidth: 18.5,
            alignSelf: "flex-start",
            borderRightColor: "#565656",
            borderTopColor: "transparent",
          }}
        />
        <View
          className="py-1 px-3 rounded-b-lg"
          style={{
            backgroundColor: Colors.placeholder,
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
          <Skeleton
            colorMode={colorMode}
            radius="round"
            height={35}
            width={200}
          />
        </View>
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderLeftWidth: 15,
            borderTopWidth: 18.5,
            alignSelf: "flex-start",
            borderLeftColor: "#565656",
            borderTopColor: "transparent",
          }}
        />
      </View>
      {Array.from({ length: 6 }).map((_, index) => (
        <View className="w-1/3 mb-1 px-0.5" key={index}>
          <ProductSkeleton key={index} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
