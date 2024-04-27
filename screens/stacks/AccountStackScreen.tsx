import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../Account/AccountScreen';
import AccountInfoScreen from '../Account/AccountInfoScreen';
import LoginScreen from '../Authen/LoginScreen';

const AccountStack = createStackNavigator();


const AccountStackScreen:React.FC = () => {
  return (
    <AccountStack.Navigator>
        <AccountStack.Screen name="AccountScreen" component={AccountScreen} options={{headerShown:false}}/>
        <AccountStack.Screen name="AccountLoginScreen" component={LoginScreen} options={{headerShown:false, presentation: "modal"}}/>
        <AccountStack.Screen name="AccountInfo" component={AccountInfoScreen} options={{presentation: "modal"}}/>

    </AccountStack.Navigator>
  )
}

export default AccountStackScreen

