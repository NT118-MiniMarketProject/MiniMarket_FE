import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { priceFormatter, productHomeInterface } from '../../utils';

interface dealProductsProps{
    dealproduct: productHomeInterface,
  quantity: number;
  remaining: number;
}
const DealProduct = (props: dealProductsProps) => {
    const { dealproduct, quantity, remaining } = props;
  return (
    <TouchableOpacity className="w-full">
      <LinearGradient
        className="rounded-md flex-column"
        colors={["#5CA927", "#0A773D"]}
        start={[0, 0]}
        end={[1, 0]}
      >
        {/* Top image*/}
        <View className="bg-white mx-0.5 mt-0.5 rounded-t-md overflow-hidden">
          {/* Image container */}
          <View className="overflow-hidden bg-white p-1">
            {/* image */}
            <ImageBackground
              src={dealproduct.thumbnail}
              resizeMode="contain"
              style={{
                width: "100%",
                paddingTop: "100%",
              }}
            />
          </View>
          {/* Title */}
          <Text
            className="text-12m h-12 bg-transparent text-txtsecond px-1 py-2"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {dealproduct.name}
          </Text>
        </View>

        {/* Bottom*/}
        <View className="bg-transparent pt-3 px-1.5 pb-0.5 flex-row justify-between items-center">
          <View className="flex-column ">
            <Text className="font-bold text-12m text-txtyellow" numberOfLines={1} ellipsizeMode='tail'>
              {priceFormatter(dealproduct.discount_price)}đ
            </Text>
            <Text className="text-10m text-gray-200 line-through" numberOfLines={1} ellipsizeMode='tail'>
              {priceFormatter(dealproduct.reg_price)}đ
            </Text>
          </View>
          {/* Button */}
          <TouchableOpacity className="bg-lightgreen rounded-md py-1 px-3">
            <Text className="font-bold text-txtgreen text-13m text-center">
              MUA
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    imgbg: 
    {
        

    }
})

export default DealProduct

