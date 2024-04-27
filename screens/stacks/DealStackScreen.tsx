import { SafeAreaView, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Home/HomeScreen";
import DetailScreen from "../Home/DetailScreen";
import { useRoute } from "@react-navigation/native";
import Tabs from "../../components/Common/Tabs";
import DealScreen from "../Deal/DealScreen";

const DealStack = createStackNavigator();

const DealStackScreen: React.FC = () => {
  return (
    <DealStack.Navigator>
      <DealStack.Screen
        name="DealScreen"
        component={DealScreen}
        options={{ headerShown: false }}
      />
    </DealStack.Navigator>
    // <View className="flex-1 items-center justify-center bg-white">
    //   <Text className="text-red-400 font-bold">
    //     Open up App.js to start working on your app!
    //   </Text>
    //   <StatusBar style="auto" />
    // </View>
  );
};

export default DealStackScreen;
