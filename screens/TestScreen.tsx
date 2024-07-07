import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import Panel from "../components/Account/Panel";
import PanelItem from "../components/Account/PanelItem";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/types";
import { socket } from "../utils";

const TestScreen = () => {
  // const handler = () => {
  //   socket.emit("EventType", "data", (message: any) => {
  //     console.log(message);
  //   });
  // };

  return <View className="flex-1"></View>;
};

export default TestScreen;

const dummyMess = [
  {
    id: 1,
    name: "Trieu",
    avater: require("../assets/images/user_placeholder.png"),
    time: "",
    text: "Trương công quốc triệu đang làm chat realtime",
  },
  {
    id: 2,
    name: "Khoa",
    avater: require("../assets/images/user_placeholder.png"),
    time: "",
    text: "Hello",
  },
  {
    id: 3,
    name: "Khoa",
    avater: require("../assets/images/user_placeholder.png"),
    time: "",
    text: "Nguyễn Lý Đăng Khoa làm momo",
  },
];
