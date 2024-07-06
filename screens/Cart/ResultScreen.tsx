import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, Pressable, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { StackActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { useAppSelector } from "../../store";
import { priceFormatter } from "../../utils";
import { useIsFocused } from "@react-navigation/native";


const ResultScreen: React.FC = () => {
  const focused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const orderDetail = useAppSelector(state => state.order);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (focused){
      if (isOpen && navigation.canGoBack()) {
        navigation.dispatch(StackActions.popToTop());
      }
      setIsOpen(true);
    }
  }, [focused])
  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log(currentScreen);
  //     if (isOpen && navigation.canGoBack()) {
  //       navigation.dispatch(StackActions.popToTop());
  //     }
  //     setIsOpen(true);
  //   }, [navigation])
  // )


  return orderDetail?.data ? (
    <View className="flex-1 bg-gray-100 p-2 mt-2">
      <View className="flex-1 flex-col items-center mb-5">
        {/* Header */}
        <View className="flex-row space-x-2">
          <Ionicons name="checkmark-done-circle" size={34} color="#0A773D" />
          <Text className="text-xl font-bold text-[#0A773D] mb-2">
            ĐẶT HÀNG THÀNH CÔNG
          </Text>
        </View>
        {/* Info block */}
        <View className="w-full mx-8 my-1 p-3 px-6 rounded-md bg-gray-200">
          <Text className="text-14m text-gray-600 my-2">
            Mã vận đơn: {orderDetail.data.order_id}
          </Text>
          <Text className="text-14m text-gray-600 my-2">
            Thời gian đặt hàng: {orderDetail.data.created_at}
          </Text>
          <Text className="text-14m text-gray-600 my-2">
            Phương thức thanh toán: Tiền mặt
          </Text>
          <Text className="text-14m text-gray-600 my-2">
            Trạng thái: {orderDetail.data.status}
          </Text>
          <Text className="text-14m text-gray-600 my-2">
            Ghi chú: {orderDetail.data.note ? orderDetail.data.note : "Không có ghi chú"}
          </Text>
          <Text className="text-14m text-gray-600 my-2 font-bold">
            Tổng tiền: {priceFormatter(orderDetail.data.total)} VNĐ
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between p-5">
        <TouchableOpacity
          className="bg-[#0A773D] p-3 flex-1 mr-2 rounded flex-row justify-center items-center"
          onPress={() => {
            /* Implement navigation to home */
            navigation.navigate("HomeStackScreen");
          }}
        >
          <Text className="text-white text-center font-bold text-14m">Tiếp tục mua sắm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#0A773D] p-3 flex-1 ml-2 rounded flex-row justify-center items-center"
          onPress={() => {
            navigation.navigate("AccountStackScreen", {
              screen: "OrderDetailScreen",
              params: {
                order_id: orderDetail.data.order_id,
                maHD: orderDetail.data.order_id
                  .split("-")
                  .filter((_, idx, arr) => idx === arr.length - 1)
                  .toString()
                  .toUpperCase(),
              },
            } as any);
          }}
        >
          <Text className="text-white text-center font-bold text-14m">Xem chi tiết đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View className="text-center"> 
      <Text className="text-center w-full mt-10">Không có thông tin</Text>
    </View>
  );
};

export default ResultScreen;
