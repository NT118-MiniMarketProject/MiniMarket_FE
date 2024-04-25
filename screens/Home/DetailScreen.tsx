import { Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";


const DetailScreen = () => {
  const route = useRoute<any>();
  const { itemId } = route.params || {};
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-400 font-bold">{itemId}</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default DetailScreen;
