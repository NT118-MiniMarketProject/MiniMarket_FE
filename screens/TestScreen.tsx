import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import Panel from "../components/Account/Panel";
import PanelItem from "../components/Account/PanelItem";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/types";

const TestScreen = () => {
  return (
    <View>
      <Text>Test screen</Text>
    </View>
  );
};

export default TestScreen;
