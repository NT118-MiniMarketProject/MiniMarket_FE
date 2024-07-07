import { ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacityBase, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation, useRoute } from '@react-navigation/native';
import Breadcrumb from '../../components/Common/Breadcrumb';
import axios from 'axios';
import { priceFormatter, tenmien } from '../../utils';
import LoadingModal from '../../components/Common/LoadingModal';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { fetchOrder } from '../../store/features/Orders/orderSlice';
import { useAppDispatch } from '../../store';

const PayLoadScreen = () => {
    const route = useRoute();
    const { order_id, total }: { order_id: string, total: number } = route.params as any;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [payUrl, setPayUrl] = useState<string>("");
    const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //   navigation.addListener("beforeRemove", (e) => {
    //     e.preventDefault();
    //   });
    // }, [navigation]);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post(tenmien+"/payment", {order_id, total});
                setIsLoading(false);
                setPayUrl(response.data.data.payUrl);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (payUrl){
            Linking.openURL(payUrl);
        }
    }, [payUrl])

    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(fetchOrder(order_id)).then((res)=>{
            console.log(res.payload)
            if (res.payload){
                if (res.payload?.status === "PaidNotDelivered") {
                  navigation.navigate("ResultScreen", {payment: true});
                }
            }
        });
      }, 18000);

      return () => {
        clearInterval(interval);
      };
    }, []);
    



  return (
    <View>
      <Breadcrumb title="Đang chờ thanh toán" />
      <View className="py-12 bg-gray-200 flex-row items-center justify-center opacity-30 z-20">
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
      <Text className="text-center text-14m text-txtgray">
        Quý khách đã chọn thanh toán với số tiền {priceFormatter(total)} vnđ.
        Quý khách sẽ được chuyển đến link thanh toán.
      </Text>
      <Text className="text-center text-12m text-gray-500 px-5 mt-2">
        *Lưu ý: sau khi thanh toán quý khách có thể quay lại app. Hệ thống sẽ tự
        động chuyển đến trang kết quả khi có thông tin thanh toán.
      </Text>

      {/* Button */}
      <View className="flex-col items-center justify-center mt-4">
        {payUrl ? (
          <TouchableOpacity
            className="w-1/2 bg-primary p-2 rounded-md"
            onPress={() => {
              Linking.openURL(payUrl);
            }}
          >
            <Text className="text-white text-center">
              Đi tới trang thanh toán
            </Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          className="w-1/2 bg-gray-400 mt-2 p-2 rounded-md"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text className="text-white text-center">Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PayLoadScreen

const styles = StyleSheet.create({})