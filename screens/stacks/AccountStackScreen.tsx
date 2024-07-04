import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../Account/AccountScreen";
import AccountInfoScreen from "../Account/AccountInfoScreen";
import LoginScreen from "../Account/Authen/LoginScreen";
import SignUpScreen from "../Account/Authen/SignUpScreen";
import { Colors, Icon } from "../../components/styles";
import { CredentialContext } from "../../contexts/CredentialContext";
import ForgotPasswordScreen from "../Account/Authen/ForgotPasswordScreen";
import EmailVerificationScreen from "../Account/Authen/EmailVerificationScreen";
import NewPasswordScreen from "../Account/Authen/NewPasswordScreen";
import FeedbackFormScreen from "../Account/FeedbackFormScreen";
import AccountScreenAfterLogin from "../Account/AccountScreenAfterLogin";
import OrderListScreen from "../Order/OrderListScreen";
import OrderDetailScreen from "../Order/OrderDetailScreen";

const AccountStackScreen: React.FC = () => {
  const { credential } = useContext(CredentialContext);
  const AccountStack = createStackNavigator();
  const authenHeaderOptions = {
    headerStyle: {
      backgroundColor: "transparent",
      height: 100,
    },
    headerTintColor: Colors.black,
    headerTransparent: true,
    headerTitle: "",
    headerLeftContainerStyle: {
      paddingLeft: 10,
      paddingTop: 30,
    },
    headerBackImage: () => (
      <Icon name="arrow-back-outline" size={28} color={Colors.black} />
    ),
  };

  return credential ? (
    // Đã đăng nhập
    <AccountStack.Navigator
      initialRouteName="AccountScreenAfterLogin"
      screenOptions={{ headerShown: false }}
    >
      <AccountStack.Screen
        name="AccountScreenAfterLogin"
        component={AccountScreenAfterLogin}
      />
      <AccountStack.Screen
        name="AccountInfoScreen"
        component={AccountInfoScreen}
        options={{ presentation: "modal" }}
      />
      <AccountStack.Screen
        name="FeedbackFormScreen"
        component={FeedbackFormScreen}
        options={{ presentation: "modal" }}
      />
      <AccountStack.Screen
        name="AccountNewPasswordScreen"
        component={NewPasswordScreen}
        options={{ presentation: "modal", ...authenHeaderOptions }}
      />
      <AccountStack.Screen
        name="OrderListScreen"
        component={OrderListScreen}
        options={{ presentation: "modal" }}
      />
      <AccountStack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      />
    </AccountStack.Navigator>
  ) : (
    // Chưa đăng nhập
    <AccountStack.Navigator
      initialRouteName="AccountScreen"
      screenOptions={{ headerShown: false }}
    >
      <AccountStack.Screen name="AccountScreen" component={AccountScreen} />
      <AccountStack.Screen
        name="FeedbackFormScreen"
        component={FeedbackFormScreen}
        options={{ presentation: "modal" }}
      />
      <AccountStack.Screen
        name="AccountLoginScreen"
        component={LoginScreen}
        options={{ presentation: "modal", ...authenHeaderOptions }}
      />
      <AccountStack.Screen
        name="AccountSignUpScreen"
        component={SignUpScreen}
        options={{ presentation: "modal", ...authenHeaderOptions }}
      />
      <AccountStack.Screen
        name="AccountForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ ...authenHeaderOptions }}
      />
      <AccountStack.Screen
        name="AccountEmailVerificationScreen"
        component={EmailVerificationScreen}
        options={{ ...authenHeaderOptions }}
      />
      <AccountStack.Screen
        name="AccountNewPasswordScreen"
        component={NewPasswordScreen}
        options={{ ...authenHeaderOptions }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountStackScreen;

{
  /* <AccountStack.Screen
        name="TestScreen"
        component={FeedbackFormScreen}
        // options={{ presentation: "modal", ...authenHeaderOptions }}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      /> */
}
