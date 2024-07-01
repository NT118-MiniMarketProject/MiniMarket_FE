import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Touchable, TouchableOpacity } from "react-native";
import { Icon } from "../../components/styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";

const IntroAdScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    useEffect(() => {
      navigation.addListener("beforeRemove", (e) => {
        // if (yourCondition) {
        //   return;
        // } else {
        // }
        e.preventDefault();
      });
    }, [navigation]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Giới Thiệu Giao Diện Quản Trị</Text>
      <Image
        source={require("../../assets/images/brand-logo.png")}
        className="h-40 w-40"
      ></Image>
      <Text className="text-center text-primary text-xl font-bold">
        Green Mart
      </Text>
      <View style={styles.section}>
        <Text style={styles.sectionContent} className="mt-2">
          Đây là giao diện quản trị ứng dụng GreenMart. Admin có thể xem, thêm,
          sửa thông tin các sản phẩm, đơn hàng, khách hàng,...
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Sản Phẩm</Text>
        <Text style={styles.sectionContent}>
          Nhấp vào "Sản Phẩm" để quản lý danh sách sản phẩm. Tại đây bạn có thể
          thêm, chỉnh sửa hoặc xóa sản phẩm, cũng như xem thông tin chi tiết về
          từng sản phẩm.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Khách Hàng</Text>
        <Text style={styles.sectionContent}>
          Nhấp vào "Khách Hàng" để quản lý thông tin khách hàng. Tại đây bạn có
          thể xem, chỉnh sửa và xóa chi tiết khách hàng, cũng như xử lý các yêu
          cầu của khách hàng.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Đơn Hàng</Text>
        <Text style={styles.sectionContent}>
          Nhấp vào "Đơn Hàng" để quản lý các đơn hàng của khách. Bạn có thể xem
          chi tiết đơn hàng, cập nhật trạng thái đơn hàng và xử lý bất kỳ vấn đề
          nào liên quan đến đơn hàng.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Báo Cáo</Text>
        <Text style={styles.sectionContent}>
          Nhấp vào "Báo Cáo" để tạo và xem báo cáo. Phần này giúp bạn phân tích
          doanh số, hành vi khách hàng và các số liệu quan trọng khác.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Cài Đặt</Text>
        <Text style={styles.sectionContent}>
          Nhấp vào "Cài Đặt" để cấu hình ứng dụng. Tại đây bạn có thể cập nhật
          hồ sơ, thay đổi cài đặt hệ thống và quản lý các tác vụ quản trị khác.
        </Text>
      </View>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeStackScreen")}
        className="mt-2 mx-2 px-5 py-3 bg-transparent border border-red-400 rounded-md"
      >
        <Text className="text-center text-red-400">Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    width: "100%",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default IntroAdScreen;
