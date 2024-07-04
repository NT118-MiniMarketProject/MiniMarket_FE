import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Breadcrumb from "../../components/Common/Breadcrumb";
import OrderStatusTag from "../../components/Order/OrderStatusTag";
import { Colors } from "../../components/styles";
import { useAppDispatch, useAppSelector } from "../../store";
import { orderListActions } from "../../store/features/Orders/orderListSlice";
import { fetchOrder } from "../../store/features/Orders/orderSlice";
import { paymentMethodConvert, priceFormatter } from "../../utils";
import { convertDateTime } from "../../utils/functions";

const OrderDetailScreen = ({ navigation, route }: any) => {
  const { order_id, maHD } = route.params;

  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useAppDispatch();
  const orderState = useAppSelector((state) => state.order);
  const order = orderState.data;

  // Gọi API BE, Dùng useFocusEffect thì phải gọi api trong useCallback không thì sẽ bị gọi nhiều lần
  useFocusEffect(
    useCallback(() => {
      getOrder();
    }, [])
  );

  const getOrder = async () => {
    setIsFetching(true);
    await dispatch(fetchOrder(order_id));
    // console.log({ orderState }); //Lấy thành công data từ BE
    dispatch(orderListActions.updateOrder(orderState.data)); // Cập nhật lại OrderListSlice khi mới fetch mới một order
    setIsFetching(false);
  };

  return (
    <View className="flex-1">
      <Breadcrumb
        navigation={navigation}
        title={`Chi tiết đơn hàng #${maHD}`}
      />
      {isFetching ? (
        <View className="items-center mt-1">
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="pb-5">
            <View className="flex-1 mt-1.5 bg-txtwhite pt-5 pb-10 px-2">
              <View style={styles.row}>
                <View style={styles.textGroup}>
                  <Text style={styles.text}>Ngày đặt: </Text>

                  {/* Thời điểm đặt hàng */}
                  <Text
                    style={[styles.text, { color: "black" }]}
                    className="font-bold"
                  >
                    {convertDateTime(new Date(order.created_at))}
                  </Text>
                </View>

                {/* Trạng thái đơn hàng */}
                <OrderStatusTag value={order.status} />
              </View>

              <View className="bg-gray-200 rounded-md my-3 py-2">
                {/* Địa chỉ giao hàng */}
                <View style={styles.row2}>
                  <View style={styles.leftCol}>
                    <Text style={styles.text}>Địa chỉ giao:</Text>
                  </View>
                  <View style={styles.rightCol}>
                    <Text>{order.address}</Text>
                  </View>
                </View>

                {/* Ghi chú */}
                <View style={styles.row2}>
                  <View style={styles.leftCol}>
                    <Text style={styles.text}>Ghi chú:</Text>
                  </View>
                  <View style={styles.rightCol}>
                    {order.note ? (
                      <Text>{order.note}</Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 13,
                          color: Colors.placeholder,
                          fontStyle: "italic",
                        }}
                      >
                        Đơn hàng không có ghi chú
                      </Text>
                    )}
                  </View>
                </View>

                {/* Phương thức thanh toán */}
                <View style={styles.row2}>
                  <View style={styles.leftCol}>
                    <Text style={styles.text}>Thanh toán:</Text>
                  </View>
                  <View style={styles.rightCol}>
                    <Text>{paymentMethodConvert(order.payment_method)}</Text>
                  </View>
                </View>

                {/* Tổng đơn hàng */}
                <View style={styles.row2}>
                  <View style={styles.leftCol}>
                    <Text style={styles.text}>Tổng đơn hàng:</Text>
                  </View>
                  <View style={styles.rightCol}>
                    <Text>{`${priceFormatter(order.total)}đ`}</Text>
                  </View>
                </View>
              </View>

              <View className="mt-3">
                <Text>Danh sách sản phẩm</Text>
                <View className="mt-1.5">
                  {order.orderitems.map((item) => (
                    <View key={item.orderitem_id}>
                      <View className="py-2">
                        <TouchableOpacity
                          style={[styles.row, { alignItems: "flex-start" }]}
                          onPress={() =>
                            navigation.navigate("ProductDetailScreen", {
                              id: item.products.product_id,
                            })
                          }
                        >
                          {/* Ảnh SP */}
                          <Image
                            source={{ uri: item.products.thumbnail }}
                            resizeMode="cover"
                            style={{ width: 68, height: 68 }}
                          />
                          <View className="flex-1 ml-2">
                            <View className="flex-1 justify-between">
                              <View
                                style={[styles.row, { alignItems: "flex-end" }]}
                              >
                                {/* Tên SP */}
                                <Text
                                  style={[
                                    styles.text,
                                    {
                                      color: "black",
                                      marginRight: 8,
                                      flex: 8,
                                    },
                                  ]}
                                >
                                  {item.products.name}
                                </Text>
                                <View
                                  className="flex-row justify-end"
                                  style={{ flex: 5 }}
                                >
                                  {/* Giá bình thường */}
                                  <Text
                                    className="line-through mr-1"
                                    style={[
                                      styles.text,
                                      {
                                        opacity:
                                          item.products.reg_price >
                                          item.products.discount_price
                                            ? 1
                                            : 0,
                                      },
                                    ]}
                                  >
                                    {`${priceFormatter(
                                      item.products.reg_price
                                    )}đ`}
                                  </Text>

                                  {/* Giá Khuyến mãi */}
                                  <Text
                                    style={[styles.text, { color: "black" }]}
                                  >{`${priceFormatter(
                                    item.products.discount_price
                                  )}đ`}</Text>
                                </View>
                              </View>

                              <View style={styles.row}>
                                <Text
                                  style={[
                                    styles.text,
                                    { color: Colors.placeholder },
                                  ]}
                                >{`Đơn giá: ${priceFormatter(
                                  item.price
                                )}đ`}</Text>

                                {/* Số lượng */}
                                <Text
                                  style={styles.text}
                                >{`Số lượng: ${item.quantity}`}</Text>
                              </View>

                              <View style={styles.row}>
                                {/* Có khuyển mãi ? */}
                                <View
                                  className="px-1"
                                  style={{
                                    borderWidth: 0.85,
                                    borderColor: "#FF1700",
                                    opacity: item.fromEvent === 1 ? 1 : 0,
                                  }}
                                >
                                  <Text
                                    className="font-light"
                                    style={{ fontSize: 12, color: "#FF1700" }}
                                  >
                                    Sự kiện khuyến mãi
                                  </Text>
                                </View>
                                <Text
                                  style={{ color: Colors.primary }}
                                >{`${priceFormatter(item.total)}đ`}</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>

                        {/* Đánh giá sản phẩm */}
                        <TouchableOpacity
                          className="pt-1.5 self-start"
                          onPress={() => console.log("Đánh giá SP")}
                          disabled={false} //đã đánh giá thì true
                        >
                          <Text
                            className="text-amber-500"
                            style={{ fontSize: 13 }}
                          >
                            Đánh giá sản phẩm
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View className="border-b-1.2 border-slate-200"></View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Tổng giá trị đơn hàng */}
              <View style={styles.row} className="mt-4">
                <Text>Tổng đơn hàng</Text>
                <Text
                  style={{ color: Colors.primary, fontSize: 16 }}
                >{`${priceFormatter(order.total)}đ`}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: Colors.black,
  },

  textGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row2: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  leftCol: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 8,
  },
  rightCol: {
    flex: 2,
    alignItems: "flex-start",
    paddingLeft: 8,
  },
});
