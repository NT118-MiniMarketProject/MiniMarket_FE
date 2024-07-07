import { SafeAreaView, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Home/HomeScreen";
import DetailScreen from "../Home/DetailScreen";
import { StackActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import Tabs from "../../components/Common/Tabs";
import DealScreen from "../Deal/DealScreen";
import CartScreen from "../Cart/CartScreen";
import ResultScreen from "../Cart/ResultScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import PayLoadScreen from "../Cart/PayLoadScreen";

const CartStack = createStackNavigator();

const CartStackScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // const currentScreen = useRoute().name;
  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log(currentScreen);
  //     if (currentScreen === "ResultScreen" && navigation.canGoBack()) {
  //       navigation.dispatch(StackActions.popToTop());
  //     }
  //   }, [navigation])
  // );
  return (
    <CartStack.Navigator detachInactiveScreens={true}>
      <CartStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <CartStack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{ headerShown: false }}
      />
      <CartStack.Screen
        name="PayLoadScreen"
        component={PayLoadScreen}
        options={{ headerShown: false }}
      />
    </CartStack.Navigator>
    // <View className="flex-1 items-center justify-center bg-white">
    //   <Text className="text-red-400 font-bold">
    //     Open up App.js to start working on your app!
    //   </Text>
    //   <StatusBar style="auto" />
    // </View>
  );
};

export default CartStackScreen;
