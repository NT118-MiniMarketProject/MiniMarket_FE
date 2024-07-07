import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatAdSreen from "../../Admin/ChatAdSreen";
import MessageListAdScreen from "../../Admin/MessageListAdScreen";

const ChatAdStack = createStackNavigator();

const ChatAdStackScreen: React.FC = () => {
  return (
    <ChatAdStack.Navigator>
      <ChatAdStack.Screen
        name="MessageListAdScreen"
        component={MessageListAdScreen}
        options={{ headerShown: false }}
      />
      <ChatAdStack.Screen
        name="ChatAdScreen"
        component={ChatAdSreen}
        options={{ headerShown: false }}
      />
    </ChatAdStack.Navigator>
  );
};

export default ChatAdStackScreen;

const styles = StyleSheet.create({});
