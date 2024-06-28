import { StyleSheet, Text, View, useWindowDimensions, Animated} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { fetchProductSales, productsSalesData } from '../../store/features/Sales/productsSalesSlice'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from "@expo/vector-icons";
import DealProduct from '../Common/DealProduct'
import { Dimensions } from 'react-native'
import { ViewToken } from 'react-native'
import ProductSkeleton from '../Common/ProductSkeleton'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../utils/types'

const HomeDeal = () => {
  const productSales = useAppSelector((state) => state.productsSales);
  const [productSalesGroup, setProductSalesGroup] = React.useState<
    productsSalesData[][]
  >([]);
  const [index, setIndex] = useState<number>(0);
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductSales());
  }, []);
  useEffect(() => {
    if (productSales.data) {
      let temp: productsSalesData[][] = [];
      let count = 0;
      let group: productsSalesData[] = [];
      productSales.data.forEach((productItem, index) => {
        if (count < 6) {
          group.push(productItem);
          count++;
        } else {
          temp.push(group);
          group = [];
          count = 0;
        }
      });
      setProductSalesGroup(temp);
    }
  }, [productSales.loading]);


  return (
    <View className="bg-lightgreen px-2 mt-1">
      {/* Header */}
      <View className="flex-row items-center py-3 justify-between">
        <Text className="text-txtgray font-bold text-14m">KHUYẾN MÃI SỐC</Text>
        <TouchableOpacity className="flex-row space-x-1 items-center" onPress={() => {
          navigation.navigate("ProductSearchScreen", {
            isSale: true,
            search: ""
          })
        }}>
          <Text className="text-txtblue text-12m underline">Xem thêm</Text>
          <AntDesign name="arrowright" size={15} color="#0095FD" />
        </TouchableOpacity>
      </View>
      {/* Products */}
      {productSales.loading ? (
        <View className='w-full flex-row mb-2'>
          {Array.from({ length: 6 }).map((_, index) => (
            <View className="w-1/3 mb-1 px-0.5" key={index}>
              <ProductSkeleton key={index} />
            </View>
          ))}
        </View>
      ) : (
        <>
          <View>
            <FlatList
              data={productSalesGroup}
              horizontal
              renderItem={(item) => (
                <View
                  className="flex-row flex-wrap"
                  style={{ width: width - 16 }}
                >
                  {item.item.map((productItem, index) => {
                    return (
                      <View className="w-1/3 mb-1 px-0.5" key={index}>
                        <DealProduct
                          key={productItem.id}
                          dealproduct={productItem}
                          quantity={productItem.quantity}
                          remaining={
                            productItem?.remaining || productItem.quantity
                          }
                        />
                      </View>
                    );
                  })}
                </View>
              )}
              pagingEnabled
              bounces={false}
              keyExtractor={(item, index) => index.toString()}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              onViewableItemsChanged={viewableItemsChanged}
              scrollEventThrottle={32}
              viewabilityConfig={viewConfig}
              ref={slideRef}
            />
          </View>
          {/* Index Indicator */}
          <View className="flex-row items-center justify-center w-full my-3">
            {productSalesGroup.map((_, i) => {
              return (
                <View
                  key={i}
                  className={`h-1 w-3 ${
                    i == index ? "bg-txtgreen" : "bg-gray-200"
                  } rounded-lg mx-1`}
                ></View>
              );
            })}
          </View>
        </>
      )}

    </View>
  );
};

export default HomeDeal

const styles = StyleSheet.create({})