import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const MessageListAdScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View className="flex-1">
      <ScrollView>
        <TouchableOpacity
          className="p-2 flex-row border-2 border-placeholder items-center"
          onPress={() => navigation.navigate("ChatAdScreen")}
        >
          <Image
            source={require("../../assets/images/user_placeholder.png")}
            style={{ width: 60, height: 60 }}
            className="rounded-full"
          />
          <Text className="text-black text-2xl ml-2">Khách hàng</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MessageListAdScreen;

const styles = StyleSheet.create({});
