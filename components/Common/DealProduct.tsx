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
        className="rounded-md flex-column relative"
        colors={["#5CA927", "#0A773D"]}
        start={[0, 0]}
        end={[1, 0]}
      >
        {Math.round(
          ((dealproduct.reg_price - dealproduct.discount_price) * 100) /
            dealproduct.reg_price
        ) > 0 && (
          <View className="bg-red-500 px-1 py-0.5 absolute rounded-xl right-1 top-1 z-10">
            <Text className="text-white font-bold text-center text-11m">
              -
              {Math.round(
                ((dealproduct.reg_price - dealproduct.discount_price) * 100) /
                  dealproduct.reg_price
              )}
              %
            </Text>
          </View>
        )}
        {/* Red Banner */}

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

        {/* Slider */}
        <View className='h-4 bg-white mx-1 rounded-lg mt-1 relative overflow-hidden flex-row items-center justify-center'> 
          <View className=' h-full w-10 absolute bg-txtyellow left-0 top-0' style={{
            width: `${(quantity-remaining)/quantity*100}%`
          }}></View>
          <Text className='text-11m text-center w-100'>Còn {remaining} sản phẩm</Text>
        </View>

        {/* Bottom*/}
        <View className="bg-transparent pt-1.5 px-1.5 pb-0.5 flex-row justify-between items-center">
          {/* Prices */}
          <View className="flex-column ">
            <Text
              className="font-bold text-12m text-txtyellow"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {priceFormatter(dealproduct.discount_price)}đ
            </Text>
            <Text
              className="text-10m text-gray-200 line-through"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
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

