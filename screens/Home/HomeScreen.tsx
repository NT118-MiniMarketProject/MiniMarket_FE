import { Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../utils/types";


const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-400 font-bold">
        Open up App.js to start working on your app!
      </Text>
      <TouchableOpacity className="bg-blue-500" onPress={() => {
        navigation.navigate("DetailScreen", { itemId: 23 });
      }}>
        <Text>Click me</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
