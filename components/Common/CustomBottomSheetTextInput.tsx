import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from "react-native";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRef } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Colors, StyledTextInput, Icon } from "../styles";
import { Feather } from "@expo/vector-icons";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";

export interface CustomBottomSheetTextInputProps extends TextInputProps {
  styledContainer?: StyleProp<ViewStyle>;
  label: string;
  require?: boolean;
  error?: boolean;
  labelColor?: string;
}

const CustomBottomSheetTextInput = forwardRef<
  TextInput,
  CustomBottomSheetTextInputProps
>(
  (
    {
      onFocus,
      onBlur,
      value,
      error,
      labelColor,
      require,
      styledContainer,
      label,
      ...props
    },
    ref
  ) => {
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

    const handleBlur = () => {
      setIsFocused(false);
      if (!value) {
        animatedLabel(0);
      }
    };

    const animatedLabel = (toValue: number) => {
      Animated.timing(labelPosition, {
        toValue: toValue,
        duration: 150,
        useNativeDriver: false,
      }).start();
    };

    const labelContainerStyle = {
      left: 8,
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

    //#region hooks
    const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

    useEffect(() => {
      return () => {
        // Reset the flag on unmount
        shouldHandleKeyboardEvents.value = false;
      };
    }, [shouldHandleKeyboardEvents]);
    //#endregion

    //#region callbacks
    const handleOnFocus = useCallback(
      (args: any) => {
        shouldHandleKeyboardEvents.value = true;
        if (onFocus) {
          onFocus(args);
        }
        handleFocus();
      },
      [onFocus, shouldHandleKeyboardEvents]
    );
    const handleOnBlur = useCallback(
      (args: any) => {
        shouldHandleKeyboardEvents.value = false;
        if (onBlur) {
          onBlur(args);
        }
        handleBlur();
      },
      [onBlur, shouldHandleKeyboardEvents, value]
    );
    //#endregion

    return (
      <View style={styledContainer}>
        <View
          className="border-1.2 rounded-lg pt-1 px-2 justify-center flex-1"
          style={{ borderColor: error ? Colors.error : Colors.placeholder }}
          onLayout={(event) => setViewHeight(event.nativeEvent.layout.height)}
        >
          <Animated.View
            style={labelContainerStyle}
            className="absolute flex-row"
            onLayout={(event) =>
              setLabelHeight(event.nativeEvent.layout.height)
            }
          >
            <Animated.Text style={labelStyle}>{label}</Animated.Text>

            {require && <Text className="text-error ml-2">*</Text>}
          </Animated.View>
          <View className="flex-1 flex-row items-center pt-3">
            <StyledTextInput
              {...props}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              className="p-0 pt-1 h-full"
              textAlignVertical="top"
              value={value}
            />
          </View>
        </View>
      </View>
    );
  }
);

export default memo(CustomBottomSheetTextInput);

const styles = StyleSheet.create({
  test: {},
});
