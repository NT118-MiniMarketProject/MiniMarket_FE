import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const statusArr: {
  [key: string]: {
    label: string;
    primary: string;
    secondary: string;
    icon: string;
  };
} = {
  Pending: {
    label: "Chờ xử lý",
    primary: "#75ccac",
    secondary: "#e9fff7",
    icon: "clock",
  },
  Processing: {
    label: "Đang xử lý",
    primary: "#e5c35b",
    secondary: "#fff7e0",
    icon: "sync",
  },
  Shipped: {
    label: "Đang giao",
    primary: "#007bff",
    secondary: "#cce4ff",
    icon: "shipping-fast",
  },
  Delivered: {
    label: "Đã giao",
    primary: "#28a745",
    secondary: "#d4edd9",
    icon: "check-circle",
  },
  Cancelled: {
    label: "Đã huỷ",
    primary: "#7a828a",
    secondary: "#e1e3e5",
    icon: "times-circle",
  },
};

const OrderStatusTag = ({
  value,
  size = "large",
}: {
  value: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  size?: "small" | "large";
}) => {
  const status = statusArr[value];

  const iconSize = size === "large" ? 18 : 12;
  const fontSize = size === "large" ? 12 : 9;

  return (
    <View
      className="rounded-md p-1 border-1.2 flex-row items-center justify-center"
      style={{ borderColor: status.primary, backgroundColor: status.secondary }}
    >
      <FontAwesome5 name={status.icon} size={iconSize} color={status.primary} />
      <Text
        className="ml-1"
        style={{ color: status.primary, fontSize: fontSize }}
      >
        {status.label}
      </Text>
    </View>
  );
};

export default OrderStatusTag;

const styles = StyleSheet.create({});
