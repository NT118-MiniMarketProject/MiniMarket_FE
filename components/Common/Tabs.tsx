import { Text, View } from 'react-native'
import React from 'react'
import {
    Feather,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Header from './Header';
import HomeStackScreen from '../../screens/stacks/HomeStackScreen';
import HomeScreen from '../../screens/Home/HomeScreen';
import AccountStackScreen from '../../screens/stacks/AccountStackScreen';
import { getTabBarVisibility } from '../../utils/functions';
import { RouteProp } from '@react-navigation/native';
import DealStackScreen from '../../screens/stacks/DealStackScreen';
import CartStackScreen from '../../screens/stacks/CartStackScreen';
import TestScreen from '../../screens/TestScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  const fontSize = 12;
  const iconSize = 22;
return (
  <Tab.Navigator
    screenOptions={{
      // color of active icon
      tabBarActiveTintColor: "#007E42",
      tabBarInactiveTintColor: "#515764",
      // other customization
      tabBarStyle: {
        backgroundColor: "white",
      },
      tabBarLabelStyle: {
        fontSize: fontSize,
      },
      header: () => <Header />,
    }}
  >
    <Tab.Screen
      name={"Trang chủ"}
      options={({route}) => ({
        tabBarStyle: {display: getTabBarVisibility(route,"HomeScreen")},
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name="home"
            size={iconSize} // decrease icon size a little bit
            color={focused ? "#007E42" : "#515764"}
          />
        ),
      })}
      component={HomeStackScreen}
    />

    <Tab.Screen
      name={"Khuyến mãi"}
      options={{
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name="sale"
            size={iconSize} // decrease icon size a little bit
            color={focused ? "#007E42" : "#515764"}
          />
        ),
      }}
      component={DealStackScreen}
    />

    <Tab.Screen
      name={"Giỏ hàng"}
      options={{
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name="shoppingcart"
            size={iconSize} // decrease icon size a little bit
            color={focused ? "#007E42" : "#515764"}
          />
        ),
      }}
      component={CartStackScreen}
    />
   
    <Tab.Screen
      name={"Thông báo"}

      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="notifications-outline"
            size={iconSize}
            color={focused ? "#007E42" : "#515764"}
          />
        ),
      }}
      component={TestScreen}
    />

    <Tab.Screen
      name={"Tài khoản"}
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="user"
            size={iconSize} // decrease icon size a little bit
            color={focused ? "#007E42" : "#515764"}
          />
        ),
      }}
      component={AccountStackScreen}
    />
  </Tab.Navigator>
);
}

export default Tabs

