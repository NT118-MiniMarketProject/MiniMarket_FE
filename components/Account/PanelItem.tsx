import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

const PanelItem = ({
  value,
  icon,
  iconColor,
  iconSize,
  caret = false,
  onPress,
  children,
  textStyle,
  disableBtn,
}: {
  value: string;
  icon?: any;
  iconColor?: any;
  iconSize?: any;
  caret?: boolean;
  onPress?: any;
  children?: any;
  textStyle?: StyleProp<TextStyle>;
  disableBtn?: any;
}) => {
  const item = (
    <View className="px-2 py-3 flex-row justify-between">
      <View className="flex-row">
        {icon && (
          <View className="mr-3 justify-center">
            <Feather
              name={icon}
              size={iconSize ?? 22}
              color={iconColor ?? "#5C595B"}
            />
          </View>
        )}
        <Text className="text-black text-base" style={textStyle}>
          {value}
        </Text>
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
    <TouchableOpacity onPress={onPress} disabled={disableBtn}>
      {item}
    </TouchableOpacity>
  ) : (
    item
  );
};

export default PanelItem;

const styles = StyleSheet.create({});
