import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Colors, StyledTextInput, Icon } from "../styles";
import { Feather } from "@expo/vector-icons";

const CustomInput = ({
  styledContainer, //dùng tailwind
  label,
  value,
  onBlur,
  require = false,
  error,
  labelColor,
  icon,
  ...props
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;
  const [labelHeight, setLabelHeight] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  const handleFocus = () => {
    setIsFocused(true);
    animatedLabel(1);
  };

  useEffect(() => {
    if (!value && !isFocused) animatedLabel(0);
  }, [value]);

  const handleBlur = (event: any) => {
    setIsFocused(false);
    if (!value) {
      animatedLabel(0);
    }
    onBlur(event);
  };

  const animatedLabel = (toValue: number) => {
    Animated.timing(labelPosition, {
      toValue: toValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const labelContainerStyle = {
    left: 12,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [(viewHeight - labelHeight) / 2, 0],
    }),
  };

  const labelStyle = {
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 13],
    }),
    color:
      error && !labelColor
        ? Colors.error
        : labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [labelColor ?? "black", Colors.black],
          }),
  };

  return (
    <View className={styledContainer}>
      <View
        className="border-1.2 rounded-lg pt-1 px-3 justify-center flex-1"
        style={{ borderColor: error ? Colors.error : Colors.placeholder }}
        onLayout={(event) => setViewHeight(event.nativeEvent.layout.height)}
      >
        <Animated.View
          style={labelContainerStyle}
          className="absolute flex-row"
          onLayout={(event) => setLabelHeight(event.nativeEvent.layout.height)}
        >
          {!value && !isFocused && icon && (
            <View className="mr-2 justify-center">
              <Feather
                name={icon}
                size={18}
                color={error ? Colors.error : "black"}
              />
            </View>
          )}
          <Animated.Text style={labelStyle}>{label}</Animated.Text>

          {require && <Text className="text-error ml-2">*</Text>}
        </Animated.View>
        <View className="flex-1 flex-row items-center pt-3">
          <StyledTextInput
            {...props}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="p-0 pt-1 h-full"
            textAlignVertical="top"
            value={value}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  test: {},
});
