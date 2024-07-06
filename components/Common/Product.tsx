import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { priceFormatter, productHomeBEInterface } from "../../utils";
import { RootStackParamList } from "../../utils/types";
import { Colors, Icon } from "../styles";

export const PRODUCT_CARD_HEIGHT = 274;

interface ProductProps extends productHomeBEInterface {
  onPress?: () => void;
}

const Product: React.FC<ProductProps> = ({
  product_id,
  thumbnail,
  name,
  reg_price,
  discount_percent,
  discount_price,
  canonical,
  rating,
  event_percent,
  event_price,
  onPress,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isSale = event_percent && event_price;
  const isDiscount = discount_percent && discount_price;
  let current_price = reg_price,
    current_percent = 0;
  if (isSale) {
    current_price = event_price;
    current_percent = event_percent;
  } else if (isDiscount) {
    current_price = discount_price;
    current_percent = discount_percent;
  }
  const numOfRatings = null;
  return (
    <View
      className="w-full bg-white border border-gray-300 p-0 rounded-sm"
      style={{ height: PRODUCT_CARD_HEIGHT }}
    >
      <View className="flex-1">
        <TouchableOpacity
          className="w-full h-full"
          onPress={
            onPress ??
            (() => {
              navigation.navigate("ProductDetailScreen", { id: product_id });
              // dispatch(addToCart({ productId: id.toString(), quantity: 1 })).then((res) => {
              //   console.log(res);
              //   if (res.payload){
              //     alert("Them thanh cong ")
              //   }
              //   else alert("Them that bai")
              // });
            })
          }
        >
          <ImageBackground
            source={require("../../assets/images/product_placeholder.png")}
            resizeMode="cover"
          >
            {/* Thumbnail */}
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-28 rounded-t-sm"
              resizeMode="cover"
            />

            {/* Có trong Sale Event ? */}
            {isSale && (
              <View
                className="absolute -top-0.5 -left-0.5 py-0.5 px-1 bg-red-500 flex-row items-center rounded-tl-sm rounded-br-md"
                style={{
                  borderTopRightRadius: 1.5,
                  borderBottomLeftRadius: 1.5,
                }}
              >
                <Image
                  source={require("../../assets/images/sale_fire.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text className="font-bold text-white" style={{ fontSize: 11 }}>
                  SALE
                </Text>
              </View>
            )}
          </ImageBackground>

          {/* Chứa text */}
          <View className="p-1 flex-1">
            {/* Tên SP */}
            <Text className="font-sans text-12m h-10" numberOfLines={2}>
              {name}
            </Text>

            {/* Giá */}
            <View className="overflow-hidden">
              {current_price < reg_price ? (
                <>
                  <View className="flex-row">
                    <Text
                      className="font-sans text-base font-bold"
                      style={{ lineHeight: 16 }}
                    >
                      {priceFormatter(current_price)}đ
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
                        -{current_percent}%
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
                  {(parseFloat(rating) ?? 5).toFixed(1)}
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
        className="justify-center items-center rounded-b-sm"
        style={{ backgroundColor: Colors.primary }}
      >
        <Text className="text-white font-semibold text-base py-1">MUA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Product;
