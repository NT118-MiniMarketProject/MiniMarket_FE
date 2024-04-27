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



const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  return (
    <View className="bg-gray-100 mt-1">
      <ScrollView>
        <HomeCategories />
        <HomeDeal />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
