import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { priceFormatter, productHomeInterface } from "../../utils";
import { RootStackParamList } from "../../utils/types";
import { addToCart } from "../../store/features/Cart/cartSlice";
import { useAppDispatch } from "../../store";
import { Colors, Icon } from "../styles";

const Product = ({
  id,
  thumbnail,
  name,
  reg_price,
  discount_price,
  discount_percent,
  canonical,
  rating,
  numOfRatings,
}: productHomeInterface) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  return (
    <View
      className="w-full bg-white border border-gray-300 p-0 rounded-md"
      style={{ height: 274 }}
    >
      <View className="flex-1">
        <TouchableOpacity
          className="w-full h-full"
          onPress={() => {
            // navigation.navigate("ProductDetailScreen", { id });
            dispatch(addToCart({ productId: id.toString(), quantity: 1 })).then((res) => {
              console.log(res);
              if (res.payload){
                alert("Them thanh cong ")
              }
              else alert("Them that bai")
            });
          }}
        >
          {/* Thumbnail */}
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-28 rounded-t-md"
            resizeMode="cover"
          />

          {/* Chứa text */}
          <View className="p-1 flex-1">
            {/* Tên SP */}
            <Text className="font-sans text-12m h-10" numberOfLines={2}>
              {name}
            </Text>

            {/* Giá */}
            <View className="overflow-hidden">
              {discount_price && discount_price < reg_price ? (
                <>
                  <View className="flex-row">
                    <Text
                      className="font-sans text-base font-bold"
                      style={{ lineHeight: 16 }}
                    >
                      {priceFormatter(discount_price)}đ
                    </Text>
                    {canonical && (
                      <Text className="font-sans text-xs text-txtgray self-end pl-1">
                        /{canonical}
                      </Text>
                    )}
                  </View>
                  <View className="flex-row mt-1">
                    <Text className="font-sans text-sm text-txtgray line-through">
                      {priceFormatter(reg_price)}đ
                    </Text>
                    <View className="bg-red-500 px-1 py-0.5 rounded-md ml-1">
                      <Text className="text-white font-bold text-center text-xs">
                        -
                        {Math.round(
                          ((reg_price - discount_price) * 100) / reg_price
                        )}
                        %
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <View className="flex-row">
                  <Text
                    className="font-sans text-base font-bold"
                    style={{ lineHeight: 16 }}
                  >
                    {priceFormatter(reg_price)}đ
                  </Text>
                  {canonical && (
                    <Text className="font-sans text-xs text-txtgray self-end pl-1">
                      /{canonical}
                    </Text>
                  )}
                </View>
              )}
            </View>

            {/* Số sao đánh giá */}
            <View className="flex-row items-center mt-auto justify-between">
              <View className="flex-row items-center">
                <Text className="font-sans font-bold text-yellow-500 text-sm">
                  {Math.round(rating ?? 5).toFixed(1)}
                </Text>
                <Icon size={14} name="star" color="rgb(234 179 8)" />
              </View>
              <Text className="font-sans text-txtgray" style={{ fontSize: 10 }}>
                ({numOfRatings ?? 0} đánh giá)
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Nút MUA */}
      <TouchableOpacity
        className="justify-center items-center rounded-b-md"
        style={{ backgroundColor: Colors.primary }}
      >
        <Text className="text-white font-semibold text-base py-1">MUA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Product;
