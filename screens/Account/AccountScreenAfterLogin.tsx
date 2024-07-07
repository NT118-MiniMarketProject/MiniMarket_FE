import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast, { ToastOptions } from "react-native-root-toast";
import Panel from "../../components/Account/Panel";
import PanelItem from "../../components/Account/PanelItem";
import LoadingModal from "../../components/Common/LoadingModal";
import { Colors, toastConfig } from "../../components/styles";
import { CredentialContext } from "../../contexts/CredentialContext";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUserInfo, userActions } from "../../store/features/Auth/userSlice";
import { tenmien } from "../../utils";
import { logout } from "../../utils/functions";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <View className="flex-1">
      {userState.loading && <LoadingModal />}
      <ScrollView>
        <Panel title="Thông tin cá nhân">
          <View className="flex-row p-2 items-center">
            <View className="rounded-full border-gray-300 border-1.2">
              <Image
                source={{ uri: user.avater ?? defaultAvt }}
                resizeMode="cover"
                style={{ width: 60, height: 60 }}
                className="rounded-full"
              />
            </View>
            <Text className="ml-2 text-black">Khách hàng </Text>
            <Text className="font-semibold text-base">{name}</Text>
          </View>
          <PanelItem
            value="Sửa thông tin cá nhân"
            icon="user"
            caret
            onPress={() => navigation.navigate("AccountInfoScreen")}
          />
          <PanelItem
            value="Thay đổi mật khẩu"
            icon="lock"
            caret
            onPress={() =>
              navigation.navigate("AccountEmailVerificationScreen", {
                email: user.email,
              })
            }
          />
          {/* <PanelItem
            value="Địa chỉ nhận hàng"
            icon="truck"
            caret
            onPress={() => "Địa chỉ nhận hàng"}
          /> */}
          <PanelItem
            value="Lịch sử đơn hàng"
            icon="shopping-bag"
            caret
            onPress={() => navigation.navigate("OrderListScreen")}
          />
          <PanelItem
            value="Danh sách yêu thích"
            icon="heart"
            caret
            onPress={() => navigation.navigate("WishListScreen")}
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
            onPress={() =>
              navigation.navigate("FeedbackFormScreen", {
                name: user.name,
                phone: user.phone,
                email: user.email,
              })
            }
          />
          {/* <PanelItem
            value="Tìm kiếm siêu thị"
            icon="map-pin"
            caret
            onPress={() => console.log("Pressed!")}
          /> */}
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

        {/* Temporary */}
        {/* <TouchableOpacity
          className="bg-primary w-20"
          onPress={() => navigation.navigate("AdminStackScreen")}
        >
          <Text>Di chuyển tới trang admin</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default AccoutScreenAfterLogin;

const styles = StyleSheet.create({});
