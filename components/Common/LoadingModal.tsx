import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../styles";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";

const LoadingModal = () => {
  return (
    <>
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-stone-400 opacity-50 z-20"></View>
      <View
        style={{
          position: "absolute",
          top: 0.32 * SCREEN_HEIGHT,
          left: 0.5 * (SCREEN_WIDTH - 76.4),
          zIndex: 21,
        }}
      >
        <ActivityIndicator size={"large"} color={Colors.primary} />
        <Text
          style={{
            color: Colors.primary,
            fontSize: 14,
            marginTop: 4,
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
