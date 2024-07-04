import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  orderInterface,
  paymentMethodConvert,
  priceFormatter,
} from "../../utils";
import { Colors } from "../styles";
import OrderStatusTag from "./OrderStatusTag";
import { FontAwesome5 } from "@expo/vector-icons";
import { convertDateTime } from "../../utils/functions";

const Order = ({
  order,
  navigation,
}: {
  order: orderInterface;
  navigation: any;
}) => {
  const firstItem = order.orderitems[0];

  const maHD = order.order_id
    .split("-")
    .filter((_, idx, arr) => idx === arr.length - 1)
    .toString()
    .toUpperCase();

  return (
    <View className="bg-zinc-50 rounded-md py-2" style={{ elevation: 3 }}>
      <View className="px-2">
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

        <View className="mt-2" style={styles.row}>
          {/* Ảnh SP */}
          <Image
            source={{ uri: firstItem.products.thumbnail }}
            resizeMode="cover"
            style={{ width: 68, height: 68 }}
          />
          <View className="flex-1 ml-2">
            <View className="flex-1 justify-between">
              {/* Tên SP */}
              <Text
                style={styles.text}
                className="font-light"
                numberOfLines={1}
              >
                {firstItem.products.name}
              </Text>

              <View style={styles.row}>
                {/* Mã đơn hàng */}
                <Text
                  style={[styles.text, { color: Colors.placeholder }]}
                >{`Đơn hàng #${maHD}`}</Text>

                {/* Số lượng */}
                <Text
                  style={styles.text}
                  // className="font-light"
                >{`x${firstItem.quantity}`}</Text>
              </View>

              <View style={styles.row}>
                {/* Có khuyển mãi ? */}
                <View
                  className="px-1"
                  style={{
                    borderWidth: 0.85,
                    borderColor: "#FF1700",
                    opacity: firstItem.fromEvent === 1 ? 1 : 0,
                  }}
                >
                  <Text
                    className="font-light"
                    style={{ fontSize: 12, color: "#FF1700" }}
                  >
                    Sự kiện khuyến mãi
                  </Text>
                </View>

                <View className="flex-row">
                  {/* Giá bình thường */}
                  <Text
                    className="mr-1 line-through"
                    style={[
                      styles.text,
                      {
                        opacity:
                          firstItem.products.reg_price >
                          firstItem.products.discount_price
                            ? 1
                            : 0,
                      },
                    ]}
                  >
                    {`${priceFormatter(firstItem.products.reg_price)}đ`}
                  </Text>

                  {/* Giá Khuyến mãi */}
                  <Text
                    style={[styles.text, { color: Colors.primary }]}
                  >{`${priceFormatter(
                    firstItem.products.discount_price
                  )}đ`}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Số loại sản phẩm */}
      <View
        className="py-1.5 items-center mt-2"
        style={{
          borderTopWidth: 1.2,
          borderBottomWidth: 1.2,
          borderColor: "#e2e8f0",
        }}
      >
        <Text
          className="text-xs"
          style={{ color: Colors.placeholder }}
        >{`Có ${order.orderitems.length} sản phẩm`}</Text>
      </View>

      <View className="px-2">
        <View style={styles.row} className="mt-2">
          <View style={styles.textGroup}>
            <Text style={styles.text}>Thanh toán bằng: </Text>

            {/* Phương thức thanh toán  */}
            <Text style={[styles.text, { color: "black" }]}>
              {paymentMethodConvert(order.payment_method)}
            </Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.text}>Thành tiền: </Text>

            {/* Tổng giá trị đơn hàng */}
            <Text
              style={{ color: Colors.primary, fontSize: 14 }}
            >{`${priceFormatter(order.total)}đ`}</Text>
          </View>
        </View>

        <View className="flex-row justify-end">
          <TouchableOpacity
            className="flex-row items-center p-2"
            onPress={() =>
              navigation.navigate("OrderDetailScreen", {
                order_id: order.order_id,
                maHD,
              })
            }
          >
            <Text className="mr-2" style={[styles.text, { color: "#0A773D" }]}>
              Xem chi tiết
            </Text>
            <FontAwesome5 name="chevron-right" size={13} color="#0A773D" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Order;

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
});
