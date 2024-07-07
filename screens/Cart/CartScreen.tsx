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
import React, { useCallback, useContext, useDebugValue, useEffect, useMemo, useRef, useState } from "react";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  cartActions,
  fetchCart,
  updateQuantityCart,
} from "../../store/features/Cart/cartSlice";
import { paymentMethodConvert, priceFormatter, tenmien } from "../../utils";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { CredentialContext } from "../../contexts/CredentialContext";
import LoadingModal from "../../components/Common/LoadingModal";
import ResultModal from "../../components/Common/ResultModal";
import LoadingModal2 from "../../components/Common/LoadingModal2";
import { getUserInfo } from "../../store/features/Auth/userSlice";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { addNewOrder, orderActions } from "../../store/features/Orders/orderSlice";
import axios from "axios";
  
  // import { useIsFocused } from '@react-navigation/native';
  
  const CartScreen = () => {
    // const isFocused = useIsFocused();
    const { credential } = useContext(CredentialContext);
    const noteRef = useRef<TextInput>(null); 
    const [note, setNote] = useState<string>("");
    const [infoFilled, setInfoFilled] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [payMethod, setPayMethod] = useState<number>(0);
    const dispatch = useAppDispatch();
    const cartData = useAppSelector(state => state.cart);
    const userData = useAppSelector(state => state.user);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // Bottom modal sheet handling
    const sheetModalRef = useRef<BottomSheetModal>(null);
    const { dismissAll } = useBottomSheetModal();
    const snapPoints = useMemo(() => ["30%", "35%"], []);
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );
      const handlePresentModalPress = useCallback(() => {
        sheetModalRef.current?.present();
      }, []);

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
        dispatch(fetchCart()).then((res) => {
          // console.log(res);
        });
        if (credential){
          dispatch(getUserInfo());
        }
    },[])
    useEffect(() => {
      if (!userData.loading && userData?.data.name && userData?.data.address && userData?.data.phone){
        setInfoFilled(true)
      }
    }, [userData.loading])
    const handleOrder = async () => {
      if (infoFilled){
        setIsLoading(true);
        let payMethodString = payMethod ? "Momo" : "Cash";
        dispatch(
          addNewOrder({
            address: userData.data.address || "",
            payment_method: payMethodString,
            note,
          })
        ).then((res) => {
          setIsLoading(false);
          if (res.payload) {
            dispatch(cartActions.clearCart());
            // Thanh toan khi nhan hang
            if (!payMethod){
              navigation.navigate("ResultScreen", {payment: false});
            }
            // Thanh toan qua momo
            else{ 
              navigation.navigate("ResultScreen", {payment: true});
            //   navigation.navigate("PayLoadScreen", {
            //     order_id: res.payload.data.data.order_id,
            //     total: res.payload.data.data.total
            // })
          }
          } else {
            alert("Đặt hàng không thành công");
          }
        });
        
        
        
      }
    }
    return credential ? (
      <>
        <View className="bg-gray-200 relative pt-12 pb-24">
          {isLoading ? <LoadingModal /> : <></>}
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
                {infoFilled ? (
                  <View className="flex-1 flex-col">
                    <Text
                      className={`text-12m text-gray-600 font-bold`}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {userData.data.address}
                    </Text>
                    <View className="flex-row space-x-1">
                      <Text className="text-12m text-gray-500">
                        Khách hàng: {userData.data.name},
                      </Text>
                      <Text className="text-12m text-gray-500">
                        SĐT: {userData.data.phone}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text
                    className={`flex-1 text-12m text-red-500`}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    "Vui lòng cập nhật đủ thông tin địa chỉ và số điện thoại"
                  </Text>
                )}

                <TouchableOpacity
                  className="bg-primary h-10 w-10 flex-row items-center justify-center rounded-md "
                  onPress={() => {
                    navigation.navigate("AccountStackScreen");
                  }}
                >
                  <Text className={`text-txtwhite`}>
                    {infoFilled ? "Đổi" : "Cập nhật"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Líst */}
            <View className="bg-txtwhite px-2 mb-1 py-3">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-13m mb-1">
                  Danh sách sản phẩm
                </Text>
              </View>
              <View className="w-full relative ">
                {cartData.data && cartData.data.cartItems.length ? (
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
                      <TouchableOpacity
                        className="flex-1 flex-row items-center"
                        onPress={() => {
                          navigation.navigate("ProductDetailScreen", {
                            id: item.products.product_id,
                          });
                        }}
                      >
                        <Text
                          className="flex-1 text-12m text-gray-500"
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {item.products.name}
                        </Text>
                      </TouchableOpacity>
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
                  <View className="w-full h-20 flex-col items-center justify-center">
                    <Text className="text-13m text-gray-500 text-center">
                      Không có sản phẩm nào trong giỏ hàng
                    </Text>
                    <TouchableOpacity
                      className="border rounded-md bg-primary px-2 py-1 mt-2"
                      onPress={() => navigation.navigate("HomeStackScreen")}
                    >
                      <Text className="text-center text-txtwhite font-bold">
                        Mua sắm ngay
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {cartData.loading ? <LoadingModal2 /> : <></>}
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
                value={note}
                onChangeText={(text) => setNote(text)}
                ref={noteRef}
                className="mt-1 p-1 text-13m text-gray-500 rounded-sm border border-gray-200 w-full"
                placeholder="Nhập ghi chú (nếu có)"
              />
            </View>
          </ScrollView>
          {/* Footer */}
          <View className="absolute bottom-0 left-0 right-0 bg-txtwhite px-1 border-t border-primary">
            <View className="flex-row items-center px-1 py-3 ">
              {!payMethod ? (
                <>
                  <MaterialCommunityIcons
                    name="cash"
                    size={24}
                    color="#2C3333"
                  />
                  <Text className="text-12m ml-2 text-txtgray">
                    Tiền mặt khi nhận hàng
                  </Text>
                </>
              ) : (
                <>
                  <View className="w-4 h-4">
                    {/* Image */}
                    <ImageBackground
                      className="w-full h-full rounded-full"
                      source={{
                        uri: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0E3SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--3873048b5c25240e612222d38b001c927993024c/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--15c3f2f3e11927673ae52b71712c1f66a7a1b7bd/MoMo%20Logo.png",
                      }}
                    />
                  </View>
                  <Text className="text-12m ml-2 text-txtgray">
                    Ví điện tử momo
                  </Text>
                </>
              )}

              <TouchableOpacity
                className="flex-row justify-center items-center ml-auto rounded-md p-1 bg-gray-300 "
                onPress={handlePresentModalPress}
              >
                <Text className="text-12m mr-1">
                  Đổi hình thức thanh toán khác
                </Text>
                <Entypo name="arrow-with-circle-up" size={16} color="gray" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              disabled={
                cartData.loading ||
                !cartData.data?.cartItems?.length ||
                !infoFilled
              }
              className={`${
                // cartData.loading ||
                // (cartData.data && !cartData.data.cartItems.length) ||
                // !infoFilled
                cartData.loading ||
                !cartData.data?.cartItems?.length ||
                !infoFilled
                  ? "bg-gray-300 text-black"
                  : "bg-primary text-txtwhite"
              } px-2 py-3 my-1 rounded-md items-center justify-center`}
              onPress={handleOrder}
            >
              <Text className="text-txtwhite font-bold">Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom sheet */}
        <BottomSheetModal
          ref={sheetModalRef}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{
            backgroundColor: Colors.greenBackground,
          }}
        >
          <BottomSheetView className="flex-1">
            {/* Option 1 */}
            <TouchableOpacity
              onPress={() => {
                setPayMethod(0);
                dismissAll();
              }}
            >
              <View className="flex-row p-2 items-center">
                <View className="items-center justify-center p-3 rounded-full ">
                  <MaterialCommunityIcons
                    name="cash"
                    size={24}
                    color="#2C3333"
                  />
                </View>
                <Text className="text-base ml-4">Tiền mặt khi nhận hàng</Text>
              </View>
            </TouchableOpacity>
            {/* Option 2 */}
            <TouchableOpacity
              onPress={() => {
                setPayMethod(1);
                dismissAll();
              }}
            >
              <View className="flex-row p-2 items-center">
                <View className="items-center justify-center p-3 rounded-full ">
                  <View className="w-10 h-10">
                    {/* Image */}
                    <ImageBackground
                      className="w-full h-full rounded-full"
                      source={{
                        uri: "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0E3SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--3873048b5c25240e612222d38b001c927993024c/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--15c3f2f3e11927673ae52b71712c1f66a7a1b7bd/MoMo%20Logo.png",
                      }}
                    />
                  </View>
                </View>
                <Text className="text-base ml-4">Ví điện tử momo</Text>
              </View>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      </>
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
            onPress={() => navigation.navigate("AccountStackScreen")}
            className="bg-primary px-2 py-1 ml-1 rounded-md"
          >
            <Text className="text-txtwhite">Đi tới trang đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  export default CartScreen
  