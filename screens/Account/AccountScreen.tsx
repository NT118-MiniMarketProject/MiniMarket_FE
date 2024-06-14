import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../utils/types";
import { CredentialContext } from "../../contexts/CredentialContext";
import Toast, { ToastOptions } from "react-native-root-toast";
import { Colors, toastConfig } from "../../components/styles";
import axios from "axios";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const domain = "https://minimarket-be.onrender.com";
const defaultErrMsg = "Ops! There's something wrong, try again later";

const AccountScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { credential, setCredential } = useContext(CredentialContext);
  const { name, displayName } = credential?.user ?? {};
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    if (!credential) {
      Toast.show("Not logged in", toastConfig as ToastOptions);
      return;
    }

    setIsLoggingOut(true);
    // url: https://minimarket-be.onrender.com/api/v1/auth/logout
    const url = domain + "/api/v1/auth/logout";
    try {
      if (credential.provider === "password") {
        const response = await axios.delete(url);
        // console.log(response);
        setCredential(null);
        Toast.show(
          response.data?.msg ?? "Logout successfully!",
          toastConfig as ToastOptions
        );
      } else if (credential.provider === "firebase") {
        const providerId = auth().currentUser?.providerData[0].providerId;
        // console.log(providerId);
        // console.log(">>> Credential user: ", credential.user.providerData);
        // console.log(">>> auth().currentUser: ", auth().currentUser?.providerData);
        if (providerId === "google.com") {
          await GoogleSignin.revokeAccess();
          await auth().signOut();
        } else if (providerId === "facebook.com") {
        }
        Toast.show("Logout successfully!", toastConfig as ToastOptions);
      }
    } catch (err) {
      console.log(err);
      Toast.show(defaultErrMsg, toastConfig as ToastOptions);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SafeAreaView>
      <Text>
        {credential
          ? `Thông tin người dùng ${name || displayName}`
          : "Người dùng chưa đăng nhập"}
      </Text>
      {credential ? (
        <>
          <TouchableOpacity
            className="bg-blue-500"
            onPress={() => {
              navigation.navigate("AccountInfo");
            }}
          >
            <Text>Xem thông tin cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-72 flex-row justify-center items-center px-5 py-2 rounded-md border-1.2 border-black self-center m-4"
            onPress={logout}
            disabled={isLoggingOut}
            style={{
              backgroundColor: isLoggingOut ? Colors.disabledBtn : Colors.white,
              borderColor: isLoggingOut ? Colors.disabledText : Colors.black,
            }}
          >
            <Text
              className="p-1"
              style={{
                color: isLoggingOut ? Colors.disabledText : Colors.black,
              }}
            >
              Đăng xuất
            </Text>
            {isLoggingOut && (
              <ActivityIndicator
                color={Colors.disabledText}
                className="absolute right-20"
              />
            )}
          </TouchableOpacity>
        </>
      ) : (
        <View className="p-4 flex-row justify-end space-x-4">
          <TouchableOpacity
            className="px-5 py-2 rounded-md bg-white"
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
      )}
      <View className="items-center justify-center">
        <TouchableOpacity
          className="px-5 py-2 rounded-md bg-yellow-400"
          onPress={() => navigation.navigate("TestScreen")}
        >
          <Text className="text-slate-900">Test screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
