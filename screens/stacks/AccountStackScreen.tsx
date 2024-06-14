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

const AccountStack = createStackNavigator();

const AccountStackScreen: React.FC = () => {
  const { credential } = useContext(CredentialContext);

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

  return (
    <AccountStack.Navigator initialRouteName="AccountScreen">
      <AccountStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      {credential ? (
        <AccountStack.Screen
          name="AccountInfo"
          component={AccountInfoScreen}
          options={{ presentation: "modal" }}
        />
      ) : (
        <>
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
            options={{ presentation: "modal", ...authenHeaderOptions }}
          />
          <AccountStack.Screen
            name="AccountEmailVerificationScreen"
            component={EmailVerificationScreen}
            options={{ presentation: "modal", ...authenHeaderOptions }}
          />
          <AccountStack.Screen
            name="AccountNewPasswordScreen"
            component={NewPasswordScreen}
            options={{ presentation: "modal", ...authenHeaderOptions }}
          />
        </>
      )}
      <AccountStack.Screen
        name="TestScreen"
        component={EmailVerificationScreen}
        options={{ presentation: "modal", ...authenHeaderOptions }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountStackScreen;
