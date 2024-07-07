import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Panel from "../../components/Account/Panel";
import PanelItem from "../../components/Account/PanelItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../utils/types";

const AccountScreen = ({ navigation, route }: any) => {
  const navigation1 = useNavigation<StackNavigationProp<RootStackParamList>>();

  const phone = "0359924897";

  return (
    <View>
      <Panel title="Thông tin cá nhân">
        <View>
          <Text className="p-2">
            Để xem "Tài khoản" vui lòng đăng nhập / đăng ký
          </Text>
          <View className="p-4 flex-row justify-end space-x-4">
            <TouchableOpacity
              className="px-5 py-2 rounded-md bg-white border-1.2 border-yellow-500"
              onPress={() => navigation.navigate("AccountLoginScreen")}
            >
              <Text className="text-txtprimary">Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-5 py-2 rounded-md border-1.2 border-black"
              onPress={() => navigation.navigate("AccountSignUpScreen")}
            >
              <Text className="text-black">Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Panel>
      <Panel title="Hỗ trợ khách hàng">
        <PanelItem
          value={`Tổng đài tư vấn: ${phone}`}
          icon="phone"
          onPress={() => Linking.openURL(`tel: ${phone}`)}
        >
          <Text className="text-12m text-placeholder">(7:00 - 21:30)</Text>
        </PanelItem>
        <PanelItem
          value="Góp ý / Liên hệ"
          icon="mail"
          caret
          onPress={() => navigation.navigate("FeedbackFormScreen")}
        />
        {/* <PanelItem
          value="Tìm kiếm siêu thị"
          icon="map-pin"
          caret
          onPress={() => console.log("Pressed!")}
        /> */}
      </Panel>
      {/* Temporary */}
      {/* <TouchableOpacity
        className="bg-primary text-txtwhite text-center mt-2 px-3 py-2"
        onPress={() => {
          navigation.navigate("AdminStackScreen");
        }}
      >
        <Text>Di chuyển tới trang admin</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});

// <View className="items-center justify-center">
//         <TouchableOpacity
//           className="px-5 py-2 rounded-md bg-yellow-400"
//           onPress={() => navigation.navigate("TestScreen")}
//         >
//           <Text className="text-slate-900">Test screen</Text>
//         </TouchableOpacity>
//       </View>
