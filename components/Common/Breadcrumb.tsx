import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const Breadcrumb = ({ navigation, title }: any) => {
  return (
    <View className="flex-row bg-txtwhite items-center space-x-2 px-1 py-1.5 mb-1 py-2">
      <TouchableOpacity
        className="mx-1 px-1"
        onPress={() => {
          navigation.goBack();
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
