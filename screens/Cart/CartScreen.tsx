import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    ActivityIndicator,
  } from "react-native";
  import React, { useContext, useEffect, useRef } from 'react'
  import { AntDesign } from "@expo/vector-icons";
  import { useAppDispatch, useAppSelector } from '../../store';
  import { fetchCart, updateQuantityCart } from '../../store/features/Cart/cartSlice';
  import {  priceFormatter } from '../../utils';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { CredentialContext } from "../../contexts/CredentialContext";
import LoadingModal from "../../components/Common/LoadingModal";
  
  // import { useIsFocused } from '@react-navigation/native';
  
  const CartScreen = () => {
    // const isFocused = useIsFocused();
      const { credential } = useContext(CredentialContext);
    const noteRef = useRef<TextInput>(null); 
    const dispatch = useAppDispatch();
    const cartData = useAppSelector(state => state.cart);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    function handleIncrement(
      isUp: boolean,
      quantity: number,
      cartItemId: string 
    ) {
      if (isUp) {
        dispatch(updateQuantityCart({ cartItemId, quantity: quantity + 1 }));
      } else {
        dispatch(updateQuantityCart({ cartItemId, quantity: quantity - 1 }));
      }
    }
    function handleDelete(cartItemId: string ) {
      dispatch(updateQuantityCart({ cartItemId, quantity: 0 }));
    }
    useEffect(() => {
      // if (isFocused){
        if(noteRef.current) noteRef.current.clear();
        dispatch(fetchCart());
    },[])
    return credential ? (
      <View className="bg-gray-200 relative pt-12 pb-24">
        {/* Header */}
        <View className="bg-txtwhite flex-row space-x-2 z-10 items-center mb-1 px-2 py-3 absolute top-0 left-0 right-0">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="caretleft" size={18} color="black" />
          </TouchableOpacity>
          <Text className=" font-bold">Giỏ hàng</Text>
        </View>
        {/* body */}
        <ScrollView
          className="h-full"
          horizontal={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* Dia chia */}
          <View className="bg-txtwhite px-2 mb-1 py-3">
            <Text className="font-bold text-13m">Giao đến</Text>
            <View className="flex-row items-center space-x-1 w-full">
              <Text
                className="flex-1 text-12m text-gray-500"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                Siêu thị Đường Ngueyn Van Linh, P.Long Thanh, thi xa Tan chau,
                tinh An Giang, Canh the gioi di odong dau cho tan chau nen di
                theo huogn nay de duoc nhanh
              </Text>
              <TouchableOpacity className="bg-primary h-10 w-10 flex-row items-center justify-center rounded-md ">
                <Text className="text-txtwhite">Đổi</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Líst */}
          <View className="bg-txtwhite px-2 mb-1 py-3">
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-13m mb-1">
                Danh sách sản phẩm
              </Text>
              {/* <TouchableOpacity>
                <Text className="text-12m text-primary">Xóa tất cả</Text>
              </TouchableOpacity> */}
            </View>
            <View className="w-full relative ">
              {cartData.loading && <LoadingModal />}
              {
                // cartData.loading ? (
                //   <View className="m-2" style={{ height: 300 }}>
                //     <ActivityIndicator size={"large"} color={Colors.primary} />
                //   </View>
                // ) :
                cartData?.data && cartData.data.cartItems.length ? (
                  cartData.data.cartItems.map((item, index) => (
                    <View
                      className="flex-row relative items-center space-x-1 w-full mb-1"
                      key={index}
                    >
                      {/* Image */}
                      <View className="overflow-hidden relative bg-txtwhite p-1 w-20 h-20 rounded-sm border border-gray-100">
                        {/* image */}
                        <ImageBackground
                          src={item.products.thumbnail}
                          resizeMode="contain"
                          style={{
                            width: "100%",
                            paddingTop: "100%",
                          }}
                        />
                      </View>
                      {/* Name */}
                      <Text
                        className="flex-1 text-12m text-gray-500"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {item.products.name}
                      </Text>
                      {/* Price and quantity */}
                      <View className="flex-col items-end">
                        <Text className="font-bold text-14m">
                          {priceFormatter(item.products.discount_price)}đ
                        </Text>
                        <Text className="text-12m line-through text-gray-400">
                          {priceFormatter(item.products.reg_price)}đ
                        </Text>
                        {/* Quantity */}
                        <View className="flex-row space-x-2 items-center">
                          <TouchableOpacity
                            className="bg-gray-200 h-6 w-6 flex-row items-center justify-center rounded-full"
                            onPress={() =>
                              handleIncrement(
                                false,
                                item.quantity,
                                item.cartItem.toString()
                              )
                            }
                          >
                            <AntDesign name="minus" size={17} color="black" />
                          </TouchableOpacity>
                          <Text className="text-13m text-gray-500">
                            {item.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              handleIncrement(
                                true,
                                item.quantity,
                                item.cartItem.toString()
                              )
                            }
                            className="bg-gray-200 h-6 w-6 flex-row items-center justify-center rounded-full"
                          >
                            <AntDesign name="plus" size={17} color="black" />
                          </TouchableOpacity>
                        </View>
                      </View>
                      {/* Delete items  */}
                      <TouchableOpacity
                        className="absolute w-6 h-6 flex-row items-center justify-center left-0 top-0 rounded-full bg-gray-200"
                        onPress={() => {
                          handleDelete(item.cartItem.toString());
                        }}
                      >
                        <AntDesign name="close" size={17} color="black" />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <View className="w-full h-20 flex-row items-center justify-center">
                    <Text className="text-13m text-gray-500 text-center">
                      Không có sản phẩm nào trong giỏ hàng
                    </Text>
                  </View>
                )
              }
            </View>
          </View>
          {/* Thogn tin thanh toan */}
          <View className="bg-txtwhite px-2 mb-1 py-3">
            <Text className="font-bold text-13m">THÔNG TIN THANH TOÁN</Text>
            <View className="flex-row py-1 justify-between items-center">
              <Text className="text-13m text-gray-500">Tổng cộng</Text>
              <Text className="font-bold text-13m">
                {priceFormatter(cartData.data?.total)}đ
              </Text>
            </View>
            <View className="flex-row py-1 justify-between items-center">
              <Text className="text-13m text-gray-500">Phí vận chuyển</Text>
              <Text className="font-bold text-13m">Miễn phí</Text>
            </View>
            <View className="flex-row py-1 justify-between items-center">
              <Text className="text-13m text-gray-500">Tổng thanh toán</Text>
              <Text className="font-bold text-13m">
                {priceFormatter(cartData.data?.total)}đ
              </Text>
            </View>
            {/* Notes */}
            <TextInput
              ref={noteRef}
              className="mt-1 p-1 text-13m text-gray-500 rounded-sm border border-gray-200 w-full"
              placeholder="Nhập ghi chú (nếu có)"
            />
          </View>
        </ScrollView>
        {/* Footer */}
        <View className="absolute bottom-0 left-0 right-0 bg-txtwhite px-1 border-t border-primary">
          <View className="flex-row items-center px-1 py-3 ">
            <AntDesign name="wallet" size={20} color="black" />
            <Text className="text-12m ml-1">Tiền mặt khi nhận hàng </Text>
            <Text className="ml-auto rounded-md p-1 bg-gray-300 text-12m">
              Chưa hỗ trợ hình thức thanh toán khác
            </Text>
          </View>
          <TouchableOpacity
            disabled={cartData.loading || !cartData.data.cartItems.length}
            className={`${
              cartData.loading || !cartData.data.cartItems.length
              ? "bg-gray-300 text-black" : "bg-primary text-txtwhite"
            } px-2 py-3 my-1 rounded-md items-center justify-center`}
          >
            <Text className="text-txtwhite font-bold">Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View className="flex-col items-center">
        <View className="bg-txtwhite flex-row space-x-2 z-10 items-center mb-1 px-2 py-3 absolute top-0 left-0 right-0">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="caretleft" size={20} color="black" />
          </TouchableOpacity>
          <Text className=" font-bold">Giỏ hàng</Text>
        </View>
        <View className="w-full h-20 flex-col items-center justify-center mt-16 space-y-4">
          <Text className="text-13m text-gray-500 text-center">
            Vui lòng đăng nhập để xem giỏ hàng
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AccountLoginScreen")}
            className="bg-primary px-2 py-1 ml-1 rounded-md"
          >
            <Text className="text-txtwhite">Đi tới trang đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  export default CartScreen
  