import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useContext, useState } from "react";
import { CredentialContext } from "../../contexts/CredentialContext";
import Toast, { ToastOptions } from "react-native-root-toast";
import { toastConfig, Colors } from "../../components/styles";
import axios from "axios";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const domain = "https://minimarket-be.onrender.com";
const defaultErrMsg = "Ops! There's something wrong, try again later";

const AccoutScreenAfterLogin = ({ navigation, route }: any) => {
  const { credential, setCredential } = useContext(CredentialContext);
  // const { name, displayName } = credential?.user ?? {};
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
    <View>
      <Text>AccoutScreenAfterLogin</Text>
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
    </View>
  );
};

export default AccoutScreenAfterLogin;

const styles = StyleSheet.create({});
