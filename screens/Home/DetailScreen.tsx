import { Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";


const DetailScreen = () => {
  const route = useRoute<any>();
  // const { itemId } = route.params || {};
  return (
    <View className="bg-white">
      <Text className="text-red-400 font-bold">He nho he nhoks</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default DetailScreen;
