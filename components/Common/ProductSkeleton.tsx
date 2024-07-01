import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ProductSkeleton() {
  const colorMode: "light" | "dark" = "light";
  return (
    <View
      className="w-full bg-white border border-gray-300 p-0 rounded-md items-center"
      style={{ height: 274 }}
    >
      <Skeleton
        colorMode={colorMode}
        radius="square"
        height={112}
        width={"100%"}
      />
      <View className="px-0.5">
        <View className="my-2 w-full items-center">
          <Skeleton
            colorMode={colorMode}
            radius="round"
            height={30}
            width={"97%"}
          />
        </View>
        <View className="flex-row w-full" style={{ columnGap: 8 }}>
          <Skeleton
            colorMode={colorMode}
            radius="round"
            height={25}
            width={50}
          />
          <Skeleton
            colorMode={colorMode}
            radius="round"
            height={25}
            width={35}
          />
        </View>
      </View>
      <View className="mt-auto">
        <Skeleton
          colorMode={colorMode}
          radius="square"
          height={75}
          width={"100%"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
