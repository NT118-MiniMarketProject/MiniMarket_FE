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


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
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
        fontSize: 13,
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
            size={23} // decrease icon size a little bit
            color={focused ? "#007E42" : "#515764"}
          />
        ),
        headerShown: true,
      })}
      component={HomeStackScreen}
    />

    {/* <Tab.Screen
      name={"Deals"}
      options={{
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name="sale"
            size={23} // decrease icon size a little bit
            color={focused ? "#007E42" : "#515764"}
          />
        ),
        headerShown: false,
      }}
      component={HomeStackScreen}
    /> */}

    {/* <Tab.Screen
      name={"Cart"}

      options={{
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name="shoppingcart"
            size={23} // decrease icon size a little bit
            color={focused ? "#007E42" : "#515764"}
          />
        ),
      }}
    >
      {() => <HomeScreen />}
    </Tab.Screen>
    <Tab.Screen
      name={"Notification"}

      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="notifications-outline"
            color={focused ? "#007E42" : "#515764"}
          />
        ),
        headerShown: false,
      }}
    >
      {() => <HomeScreen />}
    </Tab.Screen> */}

    <Tab.Screen
      name={"Tài khoản"}

      options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="user"
            size={23} // decrease icon size a little bit
            color={focused ? "#007E42" : "#515764"}
          />
        ),
        headerShown: true,
      }}
      component={AccountStackScreen}
    />
  </Tab.Navigator>
);
}

export default Tabs

