import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { fetchProductSales, productsSalesData } from '../../store/features/Sales/productsSalesSlice'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from "@expo/vector-icons";
import DealProduct from '../Common/DealProduct'

interface productSalesGroupProps {
    
}

const HomeDeal = () => {
    const productSales = useAppSelector((state) => state.productsSales);
    const [productSalesGroup, setProductSalesGroup] = React.useState<any>([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchProductSales());
    }, []);
  useEffect(() => {
    
  }, [productSales.loading]);

  return (
    <View className="bg-lightgreen px-2 mt-1">
      <View className="flex-row items-center py-3 justify-between">
        <Text className="text-txtgray font-bold text-14m">KHUYẾN MÃI SỐC</Text>
        <TouchableOpacity className="flex-row space-x-1 items-center">
          <Text className="text-txtblue text-12m underline">Xem thêm</Text>
          <AntDesign name="arrowright" size={15} color="#0095FD" />
        </TouchableOpacity>
      </View>
      {/* Products */}
      <View className='flex flex-row flex-wrap'>
        {productSales.data?.map((productItem, index) => {
            if (index<4){
                return (
                  <View className='w-1/3 px-1 mb-1' key={index}>
                    <DealProduct
                      key={productItem.id}
                      dealproduct={productItem}
                      quantity={productItem.quantity}
                      remaining={productItem?.remaining || productItem.quantity}
                    />
                  </View>
                );
            }
            
        })}
      </View>
    </View>
  );
}

export default HomeDeal

const styles = StyleSheet.create({})