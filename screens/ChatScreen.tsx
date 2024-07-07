import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Colors, Icon } from "../components/styles";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { CredentialContext } from "../contexts/CredentialContext";
import { useAppDispatch } from "../store";
import { getUserInfo } from "../store/features/Auth/userSlice";

const ChatScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { credential } = useContext(CredentialContext);
  const [messages, setMessages] = useState<any>([]);
  const dispatch = useAppDispatch();
  //   const

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: require("../assets/images/user_placeholder.png"),
        },
      },
    ]);
  }, []);

  //   useEffect(() => {
  //     if(credential) {
  //         if()
  //     }else {

  //     }
  //   },[]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.greenBackground,
          },
          left: {
            backgroundColor: Colors.primary,
          },
        }}
        textStyle={{
          left: {
            color: Colors.white,
          },
        }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View className="p-2">
          <Ionicons name="send" size={26} color={Colors.greenBackground} />
        </View>
      </Send>
    );
  };

  return (
    <>
      <View
        className="bg-trieugreen2 items-center justify-center pb-2"
        style={{ paddingTop: (StatusBar.currentHeight as number) + 10 }}
      >
        <TouchableOpacity
          className="absolute left-3 bottom-3"
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-outline" size={28} color={Colors.white} />
        </TouchableOpacity>
        <Text className="text-white text-2xl">Chat</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        timeTextStyle={{
          left: {
            color: Colors.black,
          },
          right: {
            color: Colors.black,
          },
        }}
      />
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
