import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const CartScreen = () => {
  return (

    <View style={{ flex: 1 }}>


    <ScrollView className="mt-14 bg-gray-300"> 
      <View className="m-2 p-2 bg-white rounded-xl relative">
        <Text className="text-lg font-bold">GIỎ HÀNG</Text>
      </View>

  {/* ========================================== */}

      <View className="m-4 p-4 bg-white rounded-xl relative">
        <View className="absolute left-6 -top-6 bg-white mt-2 mb-2 p-1 rounded-xl">
          <Text className="font-bold">Giao đến</Text>
        </View>
        <Text className="text-sm font-bold">Địa chỉ:.....</Text>
        <Text className="text-sm opacity-40">Tên: ... . Số điện thoại: ... </Text>
        <Text className="text-sm text-emerald-500">Giao trước 12h ngày mai (14/06)</Text>
      </View>


  {/* ========================================== */}

      <View className="m-4 p-4 bg-white rounded-xl relative">
        <View className="absolute left-6 -top-6 bg-white mt-2 mb-2 p-1 rounded-xl">
          <Text className="font-bold">Giao từ</Text>
        </View>
        <Text className="text-sm opacity-40">Địa chỉ siêu thị:.....</Text>
        <Text className="text-sm text-emerald-500">nếu tồn kho có thay đổi, BHX sẽ liên hệ bạn trước khi giao hàng</Text>
      </View>

  {/* ========================================== */}


      <View className="m-4 p-4 bg-white rounded-xl relative">
        <View className="absolute left-6 -top-6 bg-white mt-2 mb-2 p-1 rounded-xl">
          <Text className="font-bold">Hàng có sẵn</Text>
        </View>
        
        <View className="border-b-2 pb-4">

        <View className="flex-row items-center m-2 relative">
        <Icon name="times" size={20} color="red" />
        <Image source={{ uri: 'https://sieuthixanh.com.vn/Upload/products/zoom/Bot-Giat-Omo-He-Bot-Thong-Minh-400g132713442100227588.jpg' }} className="w-12 h-12 mr-2" />
          <View>
            <Text className="text-sm">Tên sản phẩm</Text>
            <Text className="text-sm opacity-40">Kg x 1</Text>
            <Text className="text-sm opacity-40">Lưu ý: ... </Text>
          </View>
          <Text className="ml-auto">Giá</Text>
          
        </View>
        <View className="flex-row items-center border rounded px-2 justify-between mt-2 border-opacity-30">
          <Text className="text-sm">500g</Text>
          <View className="flex-row items-center">
            <View className="text-lg bg-gray-300 m-2 p-2 rounded-xl"><Text className="font-bold">-</Text></View>
            <Text className="mx-2 text-lg">0</Text>
            <View className="text-lg bg-gray-300 m-2 p-2 rounded-xl"><Text className="font-bold">+</Text></View>
          </View>
        </View>
        </View>

        <View className="border-b-2 pb-4">
        <View className="flex-row items-center m-2 relative">
        <Icon name="times" size={20} color="red"  />
        <Image source={{ uri: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTKlAq6qy7g9c7fcLrDF0IPw0nkOxZaBwz00srctBzUsESE9Z25aM7iikku163lNpF38fIJWU8JcUJnnIcIOodvGQCc_YSVdgSayrDFv8rdfnnuxOCqDhizHUveT4ZmujwjqaPYQBY&usqp=CAc' }} className="w-12 h-12 mr-2" />
          <View>
            <Text className="text-sm">Tên sản phẩm</Text>
            <Text className="text-sm opacity-40">Kg x 1</Text>
            <Text className="text-sm opacity-40">Lưu ý: ... </Text>
          </View>
          <Text className="ml-auto">Giá</Text>
          
        </View>
        <View className="flex-row items-center border rounded px-2 justify-between mt-2 border-opacity-30">
          <Text className="text-sm">500g</Text>
          <View className="flex-row items-center">
            <View className="text-lg bg-gray-300 m-2 p-2 rounded-xl"><Text className="font-bold">-</Text></View>
            <Text className="mx-2 text-lg">0</Text>
            <View className="text-lg bg-gray-300 m-2 p-2 rounded-xl"><Text className="font-bold">+</Text></View>
          </View>
        </View>
        </View>
        
      </View>


  {/* ========================================== */}

      <View className="m-4 p-4 bg-white rounded-xl relative">
        <View className="absolute left-6 -top-6 bg-white mt-2 mb-2 p-1 rounded-xl">
          <Text className="font-bold">Tạm hết hàng</Text>
        </View>

        <View className="flex-row items-center border-b-2 border-opacity-40 relative m-2">
        <Icon name="times" size={20} color="blue"  />

        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTkgUYbCHX_1r3yUvW0J41pmU7Rr_593wfy18LuPSUxoSQHiMEw3vzKZDTMOyXA4um-fo8qYm7RuXKni7bkOX1zoVRbcCzgLbC4Xrv0FVQ&usqp=CAc' }} className="w-12 h-12 mr-2" />

          <View>
            <Text className="text-sm">Tên sản phẩm</Text>
            <Text className="text-sm text-amber-500">Tạm hết hàng</Text>
            <Text className="text-sm text-blue-500">Xem các sản phẩm tương tự</Text>
          </View>
          <Text className="ml-auto">Giá</Text>
        </View>
      </View>




  {/* ========================================== */}

      <View className="m-4 p-4 bg-white rounded-xl relative">
        <View className="absolute left-6 -top-6 bg-white mt-2 mb-2 p-1 rounded-xl">
          <Text className="font-bold">Thông tin thanh toán</Text>
        </View>
        <View className="flex-row justify-between opacity-40">
          <Text className="text-sm">Tiền Hàng: </Text>
          <Text className="text-sm">50.000đ</Text>
        </View>
        <View className="flex-row justify-between opacity-40">
          <Text className="text-sm">Phí giao hàng, phụ phí: </Text>
          <Text className="text-sm">50.000đ</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-sm">Tổng: </Text>
          <Text className="text-sm">50.000đ</Text>
        </View>
      </View>
    </ScrollView>

    <LinearGradient
      colors={['#00FF00', '#00CC00']} // Adjust gradient colors as needed
      className="justify-center"
      style={{  alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', padding: 20 }}
    >
      
<View style={styles.container}>
  <View style={styles.iconContainer}>
    <Icon name="shopping-cart" size={20} color="blue" />
  </View>
  <Text style={[styles.text, styles.boldText, { marginLeft: 8 }]}>Đặt Hàng</Text>
</View>

    </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
  },
  text: {
    fontSize: 16,
  },
  iconContainer: {
    marginRight: 8, // Adjust spacing between icon and text
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CartScreen;
