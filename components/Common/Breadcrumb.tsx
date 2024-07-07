import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";

const Breadcrumb = ({ navigation, title }: any) => {
  const navigation1 =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View className="flex-row bg-txtwhite items-center space-x-2 px-1 mb-1 py-2">
      <TouchableOpacity
        className="mx-1 px-1"
        onPress={() => {
          if (navigation1?.canGoBack()) {
            navigation1.goBack();
          } else {
            navigation1.navigate("HomeStackScreen");
          }
        }}

      >
        <AntDesign name="caretleft" size={20} color="#515764" />
      </TouchableOpacity>
      <Text className="font-bold ms-2 text-sm ">{title}</Text>
    </View>
  );
};

export default Breadcrumb;

const styles = StyleSheet.create({});
