import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../styles";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";

const LoadingModal = () => {
  const [width, setWidth] = useState(0);

  return (
    <>
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-400 opacity-60 z-20"></View>
      <View
        style={{
          position: "absolute",
          top: 0.35 * SCREEN_HEIGHT,
          left: 0.5 * (SCREEN_WIDTH - width),
          zIndex: 21,
        }}
        onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      >
        <ActivityIndicator size={"large"} color={Colors.primary} />
        <Text
          style={{
            color: Colors.greenBackground,
            fontSize: 14,
            marginTop: 4,
            fontWeight: "bold",
          }}
        >
          Đang tải ...
        </Text>
      </View>
    </>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({});
