import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProductAdStackScreen from "./admin/ProductAdStackScreen";
import ScreenTemp from "../Admin/ScreenTemp";
import IntroAdScreen from "../Admin/IntroAdScreen";
import CustomerListAdScreen from "../Admin/CustomerListAdScreen";
import OrderListAdScreen from "../Admin/OrderListAdScreen";
import StatisticAdScreen from "../Admin/StatisticAdScreen";
import ChatAdStackScreen from "./admin/ChatAdStackScreen";
const Drawer = createDrawerNavigator();

const AdminStackScreen = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Giới thiệu" component={IntroAdScreen} />
      <Drawer.Screen name="Sản phẩm" component={ProductAdStackScreen} />
      <Drawer.Screen name="Khách hàng" component={CustomerListAdScreen} />
      <Drawer.Screen name="Đơn hàng" component={OrderListAdScreen} />
      <Drawer.Screen name="Thống kê" component={StatisticAdScreen} />
      <Drawer.Screen name="Chat" component={ChatAdStackScreen} />
    </Drawer.Navigator>
  );
};

export default AdminStackScreen;

const styles = StyleSheet.create({});
