import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React, { Children } from "react";

const PanelItem = ({
  value,
  icon,
  caret = false,
  onPress,
  children,
}: {
  value: string;
  icon?: any;
  caret?: boolean;
  onPress?: any;
  children?: any;
}) => {
  const item = (
    <View className="p-2 flex-row justify-between">
      <View className="flex-row">
        {icon && (
          <View className="mr-3 justify-center">
            <Feather name={icon} size={20} color="#5C595B" />
          </View>
        )}
        <Text className="text-black text-sm">{value}</Text>
        <View className="justify-center ml-1">{children}</View>
      </View>
      {caret && (
        <View className="justify-center">
          <Entypo name="chevron-right" size={18} color="black" />
        </View>
      )}
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress}>{item}</TouchableOpacity>
  ) : (
    item
  );
};

export default PanelItem;

const styles = StyleSheet.create({});
