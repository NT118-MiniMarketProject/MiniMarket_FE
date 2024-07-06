import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, Pressable, TouchableOpacity, ImageBackground } from "react-native";
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
  const route = useRoute();
  const {payment} = useRoute().params as any;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const orderDetail = useAppSelector(state => state.order);
  const [isOpen, setIsOpen] = useState<number>(0);
  
  useEffect(() => {
    if (isOpen===0 && payment){
      navigation.navigate("PayLoadScreen", {order_id: orderDetail.data.order_id, total: orderDetail.data.total} as any);
      // console.log(orderDetail.data.order_id, orderDetail.data.total, payment)
    }
    if (focused){
      if (((isOpen===2 && payment) || (isOpen===1 && !payment)) && navigation.canGoBack()) {
        navigation.dispatch(StackActions.popToTop());
      }
      setIsOpen(prev=>prev+1);
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
            Phương thức thanh toán: {orderDetail.data.payment_method}
          </Text>
          <Text className="text-14m text-gray-600 my-2">
            Trạng thái: {orderDetail.data.status}
          </Text>
          <Text className="text-14m text-gray-600 my-2">
            Ghi chú:{" "}
            {orderDetail.data.note ? orderDetail.data.note : "Không có ghi chú"}
          </Text>
          <Text className="text-14m text-gray-600 my-2 font-bold">
            Tổng tiền: {priceFormatter(orderDetail.data.total)} VNĐ
          </Text>
        </View>
        {/*  */}
        <View className="flex-col space-x-2 items-center justify-center">
          <View className="w-8 h-8">
            {/* Image */}
            <ImageBackground
              className="w-full h-full rounded-full"
              source={{
                uri: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0E3SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--3873048b5c25240e612222d38b001c927993024c/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--15c3f2f3e11927673ae52b71712c1f66a7a1b7bd/MoMo%20Logo.png",
              }}
            />
          </View>
          <Text className="text-txtgray text-14m mt-2 text-center">
            Thanh toán Momo: kết quả thanh toán sẽ cập nhật tối đa trong vòng 30 phút hoặc
            quý khách có thể kiểm tra thông tin truy cập bằng nút chi tiết đơn hàng bên dưới
          </Text>
          <Text className="text-txtgray text-12m mt-2 text-center px-3">
            Lưu ý: đơn hàng sẽ được giao và thu TIỀN MẶT nếu thanh toán thât bại
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
          <Text className="text-white text-center font-bold text-14m">
            Tiếp tục mua sắm
          </Text>
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
          <Text className="text-white text-center font-bold text-14m">
            Xem chi tiết đơn hàng
          </Text>
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
