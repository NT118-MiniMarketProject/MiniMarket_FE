import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./ChatScreen";
import { Colors, Icon } from "../components/styles";

const ChatStackScreen: React.FC = () => {
  const ChatStack = createStackNavigator();
  return (
    <ChatStack.Navigator
      initialRouteName="ChatScreen"
      screenOptions={{
        // headerTitle: "Chat",
        // headerStyle: { backgroundColor: Colors.greenBackground },
        // headerTitleStyle: { color: Colors.white },
        // headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatStackScreen;

const styles = StyleSheet.create({});
