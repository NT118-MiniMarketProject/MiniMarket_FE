import { Text, View, Image, Pressable } from "react-native";
import React from "react";
import { priceFormatter, productHomeInterface } from "../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors, Icon } from "../styles";
import { LinearGradient } from "expo-linear-gradient";

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
  return (
    <View
      className="w-full bg-white border border-gray-300 p-0 rounded-md"
      style={{ height: 274 }}
    >
      <View className="flex-1">
        <TouchableOpacity className="w-full h-full">
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
            <View>
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
            {rating && (
              <View className="flex-row items-center mt-auto">
                <Text className="font-sans font-bold text-yellow-500 text-sm">
                  {Math.round(rating).toFixed(1)}
                </Text>
                <Icon size={14} name="star" color="rgb(234 179 8)" />
                {numOfRatings && (
                  <Text
                    className="font-sans text-txtgray"
                    style={{ fontSize: 10 }}
                  >
                    ({numOfRatings} đánh giá)
                  </Text>
                )}
              </View>
            )}
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
