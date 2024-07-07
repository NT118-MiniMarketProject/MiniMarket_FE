import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Colors, Icon } from "../../components/styles";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import { tenmien } from "../../utils";
import { io } from "socket.io-client";

const ChatAdSreen = ({ navigation }: { navigation: any }) => {
  const [messages, setMessages] = useState<any>([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: require("../../assets/images/user_placeholder.png"),
  //       },
  //     },
  //   ]);
  // }, []);

  const socketRef = useRef<any>();

  useEffect(() => {
    socketRef.current = io("ws://minimarket-be.onrender.com/api/v1");
    socketRef.current.on("connect", () => {
      console.log("connected to server");
      socketRef.current.emit("join_room", "123");
      socketRef.current.on("receive_message", (message: any) => {
        setMessages((previousMessages: any) =>
          GiftedChat.append(previousMessages, [message])
        );
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const onSend = useCallback(
    (messages = []) => {
      setMessages((previousMessages: any) =>
        GiftedChat.append(previousMessages, messages)
      );
      // Emit the message to the serve
      const data = messages[0] as any; // Assuming you're sending one message at a time
      // console.log("data", messages);
      socketRef.current.emit("send_message", { ...data, room: "123" });
    },
    [socketRef.current]
  );

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

export default ChatAdSreen;

const styles = StyleSheet.create({});
