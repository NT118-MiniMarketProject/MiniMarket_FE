import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../utils/types";
import SafeView from "../../components/Common/SafeView";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchcategoryHeader } from "../../store/features/Collection/categoryHeaderSlice";
import HomeCategories from "../../components/Home/HomeCategories";
import HomeDeal from "../../components/Home/HomeDeal";
import HomeProducts from "../../components/Home/HomeProducts";
import HomeProductBlock from "../../components/Home/HomeProductBlock";
import { fetchCart } from "../../store/features/Cart/cartSlice";

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  return (
    <View className="bg-gray-100 mt-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeCategories />
        <HomeDeal />
        <HomeProducts />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
