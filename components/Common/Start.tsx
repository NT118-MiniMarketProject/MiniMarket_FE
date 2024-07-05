import { FontAwesome } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

const Start = ({
  rating,
  size = "large",
  style = {},
}: {
  rating: string;
  size?: "small" | "large";
  style?: StyleProp<ViewStyle>;
}) => {
  const size_ = size === "small" ? 14 : 18;
  const rating_ = parseFloat(rating);
  return (
    <View className="flex-row" style={style}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const star =
          idx + 1 <= rating_ ? (
            <FontAwesome name="star" size={size_} color="rgb(234 179 8)" />
          ) : idx + 1 - rating_ < 1 ? (
            <FontAwesome
              name="star-half-empty"
              size={size_}
              color="rgb(234 179 8)"
            />
          ) : (
            <FontAwesome name="star-o" size={size_} color="rgb(234 179 8)" />
          );
        return (
          <View key={idx} className="flex-row">
            {star}
            {idx < 4 && <View className="px-0.5"></View>}
          </View>
        );
      })}
    </View>
  );
};

export default memo(Start);

const styles = StyleSheet.create({});
