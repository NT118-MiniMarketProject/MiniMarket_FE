import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Breadcrumb from "../../components/Common/Breadcrumb";
import Order from "../../components/Order/Order";
import { Colors } from "../../components/styles";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchOrderList } from "../../store/features/Orders/orderListSlice";
import {
  orderStatusArr,
  statusConvert,
  OrderStatus,
  SCREEN_HEIGHT,
} from "../../utils";
import OrderStatusTag from "../../components/Order/OrderStatusTag";
import { FontAwesome5 } from "@expo/vector-icons";

const OrderListScreen = ({ navigation, route }: any) => {
  const [isFetching, setIsFetching] = useState(false);
  const [filteredStatus, setfilterStatus] = useState<OrderStatus[]>([]);
  const dispatch = useAppDispatch();
  const orderState = useAppSelector((state) => state.orderList);

  //  Mỗi lần vào Lịch sử đơn hàng thì fetch dữ liệu (trang OrderListScreen được đưa vào stack navigation)
  useEffect(() => {
    getOrderList();
    // console.log("hello");
  }, []);

  const getOrderList = async () => {
    setIsFetching(true);
    await dispatch(fetchOrderList());
    setIsFetching(false);
  };

  const handleFilterPress = (status: OrderStatus) => {
    if (filteredStatus.includes(status)) {
      setfilterStatus(filteredStatus.filter((s) => s != status));
    } else {
      setfilterStatus([...filteredStatus, status]);
    }
  };

  const getFilteredOrder = () => {
    if (filteredStatus.length === 0) return orderState.data;
    return orderState.data.filter((order) =>
      filteredStatus.includes(order.status)
    );
  };

  const filteredOrder = getFilteredOrder();

  return (
    <View className="flex-1">
      <Breadcrumb navigation={navigation} title="Lịch sử đơn hàng" />

      <View className="bg-txtwhite p-1">
        <View className="flex-row justify-between items-end px-1">
          <View
            className="flex-row p-1 border rounded-md items-center"
            style={{ borderColor: Colors.black }}
          >
            <FontAwesome5 name="filter" size={14} color={Colors.black} />
            <Text className="text-sm ml-1.5" style={{ color: Colors.black }}>
              Lọc trạng thái đơn hàng
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setfilterStatus([])}
            className="items-center p-1 rounded-md bg-green-200 mr-2"
          >
            <View
              className="absolute rounded-full bg-yellow-500 z-20 w-4 h-4 justify-center items-center -top-0.5 right-2"
              style={{ opacity: filteredStatus.length > 0 ? 1 : 0 }}
            >
              <Text style={{ fontSize: 10 }} className="font-bold">
                {filteredStatus.length}
              </Text>
            </View>
            <FontAwesome5 name="trash-alt" size={18} color={"black"} />
            <Text style={{ fontSize: 11, marginTop: 4 }}>Xoá lọc</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row py-2 justify-around">
          {orderStatusArr.map((status, idx) => {
            if (status === "Cancelled") return;
            const active = filteredStatus.includes(status);
            return (
              <TouchableOpacity
                className="px-2"
                onPress={() => handleFilterPress(status)}
                key={idx}
              >
                <View
                  className="py-1 px-2"
                  style={{
                    borderBottomColor: active
                      ? Colors.primary
                      : Colors.disabledText,
                    borderBottomWidth: 1.7,
                  }}
                >
                  <Text
                    style={{
                      color: active ? Colors.primary : Colors.disabledText,
                    }}
                  >
                    {statusConvert(status)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        contentContainerStyle={{
          paddingBottom: 50,
          paddingTop: 16,
          paddingHorizontal: 8,
        }}
        data={filteredOrder}
        renderItem={({ item }) => (
          <Order order={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.order_id}
        ItemSeparatorComponent={() => <View className="h-3"></View>}
        ListEmptyComponent={() => (
          <View
            className="items-center"
            style={{ marginTop: 0.2 * SCREEN_HEIGHT }}
          >
            <Pressable onPress={() => navigation.navigate("HomeStackScreen")}>
              <Image
                source={require("../../assets/images/empty_order.png")}
                style={{ width: 100, height: 100 }}
              />
            </Pressable>
            <Text>Chưa có đơn hàng</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={getOrderList}
            colors={[Colors.greenBackground, Colors.primary]}
          />
        }
        // refreshing={refreshing}
        // onRefresh={handleRefresh}
      />
    </View>
  );
};

export default OrderListScreen;

const styles = StyleSheet.create({});
