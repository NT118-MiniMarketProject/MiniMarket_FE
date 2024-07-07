import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import tailwind from "tailwind-rn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";

const fetchOrders = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      "https://minimarket-be.onrender.com/api/v1/order/getAll",
      config
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

interface OrderItemProps {
  order: {
    order_id: string;
    address: string;
    total: number;
    note: string;
    status: string;
    payment_method: string;
    user_id: string;
    created_at: string;
    orderitems: Array<{
      orderitem_id: number;
      price: number;
      quantity: number;
      total: number;
      fromEvent: number;
      isReview: boolean;
      products: {
        product_id: string;
        thumbnail: string;
        name: string;
        reg_price: number;
        discount_price: number;
      };
    }>;
  };
  onUpdate: () => void;
}

const updateOrderStatus = async (orderId: string, status: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.put(
      `https://minimarket-be.onrender.com/api/v1/order/${orderId}`,
      {
        status: status,
      },
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

const deleteOrder = async (orderId: string, userId: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  try {
    const response = await axios.delete(
      `https://minimarket-be.onrender.com/api/v1/order/admin/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          userId: userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
const OrderItem: React.FC<OrderItemProps> = ({ order, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const handleUpdateStatus = async () => {
    await updateOrderStatus(order.order_id, selectedStatus);
    onUpdate();
  };
  const handleCancel = async () => {
    await deleteOrder(order.order_id, order.user_id);
    onUpdate();
  };
  return (
    <View className="p-4 mb-4 border border-gray-300 rounded-lg">
      <Text className="text-lg font-bold">Order ID: {order.order_id}</Text>
      <Text className="font-bold">
        Địa chỉ: <Text className="font-normal">{order.address}</Text>
      </Text>
      <Text className="font-bold">
        Tổng đơn hàng: <Text className="font-normal">{order.total}</Text>
      </Text>
      {order.note && (
        <Text className="font-bold">
          Note: <Text className="font-normal">{order.note}</Text>
        </Text>
      )}
      <Text className="font-bold">
        Trạng thái: <Text className="font-normal">{order.status}</Text>
      </Text>
      <Text className="font-bold">
        Phương thức thanh toán:{" "}
        <Text className="font-normal">{order.payment_method}</Text>
      </Text>
      <Text className="font-bold">
        Ngày tạo:{" "}
        <Text className="font-normal">
          {new Date(order.created_at).toLocaleString()}
        </Text>
      </Text>
      {order.orderitems.map((item) => (
        <View key={item.orderitem_id} className="flex-row mt-4">
          <Image
            source={{ uri: item.products.thumbnail }}
            className="w-12 h-12 mr-4"
          />
          <View className="flex-1">
            <Text className="font-bold">{item.products.name}</Text>
            <Text>Giá: {item.price}</Text>
            <Text>Số lượng: {item.quantity}</Text>
            <Text>Tổng: {item.total}</Text>
          </View>
        </View>
      ))}
      <View className="flex justify-between mt-4">
        <Text className="text-lg">Trạng thái đơn hàng</Text>
        <Dropdown
          className="bg-slate-200 p-4 mt-3"
          data={[
            { label: "Pending", value: "Pending" },
            { label: "Processing", value: "Processing" },
            { label: "Shipped", value: "Shipped" },
            { label: "Deliveried", value: "Delivered" },
          ]}
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value.value)}
          placeholder="Chọn trạng thái"
          labelField="label"
          valueField="value"
        />
        <TouchableOpacity
          style={styles.update}
          onPress={() => {
            handleUpdateStatus();
          }}
        >
          <Text className="text-white text-base bg-red-80 text-center">
            Cập nhật trạng thái
          </Text>
        </TouchableOpacity>
        {order.status !== "Delivered" && (
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => {
              handleCancel();
            }}
          >
            <Text className="text-white text-base bg-red-80 text-center">
              Hủy đơn hàng
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const OrderListAdScreen: React.FC = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const ordersData = await fetchOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4 mt-8">Danh sách đơn hàng</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item?.order_id}
        renderItem={({ item }) => (
          <OrderItem order={item} onUpdate={getOrders} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  cancel: {
    marginTop: 15,
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 7,
  },
  update: {
    marginTop: 15,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 7,
  },
});
export default OrderListAdScreen;
