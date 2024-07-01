import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import Toast, { ToastOptions } from "react-native-root-toast";
import { Colors, toastConfig } from "../../components/styles";
import { CredentialContext } from "../../contexts/CredentialContext";
import PanelItem from "../../components/Account/PanelItem";
import Panel from "../../components/Account/Panel";
import { tenmien } from "../../utils";
import { logout } from "../../utils/functions";
import { ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../store";
import { userActions } from "../../store/features/Auth/userSlice";

const domain = "https://minimarket-be.onrender.com";
const defaultErrMsg = "Ops! There's something wrong, try again later";

const AccoutScreenAfterLogin = ({ navigation, route }: any) => {
  const { credential, setCredential } = useContext(CredentialContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  const user = userState.data;
  const name = user.name.split(" ").slice(-2).join(" ");
  const defaultAvt = `https://ui-avatars.com/api/?background=random&name=${user.name}&rounded=true&bold=true`;
  const phone = "0359924897";

  const logoutHandler = async () => {
    setIsLoggingOut(true);
    try {
      await logout(credential, setCredential);
      dispatch(userActions.clearState(null));
      Toast.show("Logout successfully!", toastConfig as ToastOptions);
    } catch (err) {
      console.log(err);
      Toast.show(defaultErrMsg, toastConfig as ToastOptions);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // useEffect(
  //   () => console.log(">>> UserState after login: ", userState),
  //   [userState]
  // );

  const showMeOnPress = async () => {
    // {{URL}}/user/showMe
    const data = await axios
      .get(`${tenmien}/user/showMe`)
      .then((res) => res.data.data);
    console.log(">>> Show me: ", data);
  };

  return (
    <View className="flex-1">
      <ScrollView>
        <Panel title="Thông tin cá nhân">
          <View className="flex-row p-2 items-center">
            <View className="border-gray-300 border-1.2 rounded-full">
              <Image
                source={{ uri: user.avater ?? defaultAvt }}
                resizeMode="cover"
                style={{ width: 42, height: 42 }}
              />
            </View>
            <Text className="ml-2 text-black">Khách hàng </Text>
            <Text className="font-semibold">{name}</Text>
          </View>
          <PanelItem
            value="Sửa thông tin cá nhân"
            icon="user"
            caret
            onPress={() => navigation.navigate("AccountInfo")}
          />
          <PanelItem
            value="Thay đổi mật khẩu"
            icon="lock"
            caret
            onPress={() => navigation.navigate("AccountInfo")}
          />
          <PanelItem
            value="Địa chỉ nhận hàng"
            icon="truck"
            caret
            onPress={() => "Địa chỉ nhận hàng"}
          />
          <PanelItem
            value="Đơn hàng từng mua"
            icon="shopping-bag"
            caret
            onPress={() => console.log("đơn hàng từng mua")}
          />
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
          <PanelItem
            value="Tìm kiếm siêu thị"
            icon="map-pin"
            caret
            onPress={() => console.log("Pressed!")}
          />
        </Panel>

        <Panel>
          <PanelItem
            value="Đăng xuất"
            icon="log-out"
            iconSize={24}
            iconColor="#e74c3c"
            textStyle={{ fontSize: 16 }}
            onPress={logoutHandler}
            disableBtn={isLoggingOut}
          >
            {isLoggingOut && (
              <ActivityIndicator color={Colors.disabledText} className="ml-1" />
            )}
          </PanelItem>
        </Panel>
      </ScrollView>
    </View>
  );
};

export default AccoutScreenAfterLogin;

const styles = StyleSheet.create({});
