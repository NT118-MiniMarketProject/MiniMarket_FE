import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PopularProduct {
  product_id: string;
  thumbnail: string;
  name: string;
  reg_price: number;
  discount_percent: number;
  discount_price: number;
  quantity: number;
  unit: string;
  canonical: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  rating: string;
  c_id: string;
  br_id: string;
  event_percent: number | null;
  event_price: number | null;
  is_visible: string;
  is_feature: string;
}

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  popularProductBoughtTimes: number;
  popularProduct: PopularProduct;
}

const StatisticAdScreen: React.FC = () => {
  const [stats, setStats] = useState<Stats|null>(null);
  const [year, setYear] = useState<string>('');
  const [noData, setNoData] = useState(false);
  const [quarter, setQuarter] = useState(String);

  const getStatistics = async (quarter: string, year: string) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    try {
      const response = await axios.post('https://minimarket-be.onrender.com/api/v1/sales/statistics', {
            quarter: quarter,
            year: year
      }, config);
        setStats(response.data.stats);
        setNoData(false);
    } catch (error) {
        setStats(null);
        setNoData(true);
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text className='text-2xl text-center font-bold mb-4 mt-8'>Thống kê bán hàng</Text>
      
      <View className='flex justify-between mt-3'>
        <Text className='text-lg'>Chọn quý</Text>
            <Dropdown
                className='bg-slate-100 p-4 mt-3'
                data={[
                {label: '1', value: 1 },
                {label: '2', value: 2 },
                {label: '3', value: 3 },
                {label: '4', value: 4 },
                ]}
                onChange={(value) => setQuarter(value.value)}
                placeholder="Chọn quý"
                labelField="label"
                valueField="value"
            />
        <Text className='text-lg mt-3'>Chọn năm</Text>
        <TextInput
          className='bg-slate-100 p-4 mt-3'
          placeholder="Nhập năm"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
      </View>
        <TouchableOpacity style={styles.btn} onPress={() => {getStatistics(quarter, year)}}>
            <Text className='text-white text-base bg-red-80 text-center'>Xem thống kê</Text>
        </TouchableOpacity>
        {noData && <Text className='font-bold text-2xl text-center mt-4'>Không có thông tin</Text>}
      {stats && (
        <View style={styles.statsContainer}>
          <Text className='font-bold text-lg'>Tổng đơn hàng: <Text className='font-normal'>{stats.totalOrders}</Text></Text>
          <Text className='font-bold text-lg'>Tổng doanh thu: <Text className='font-normal'>{stats.totalRevenue}</Text></Text>
          <Text className='font-bold text-lg'>Sản phẩm phổ biến nhất:</Text>
          <Image style={styles.productImage} source={{ uri: stats.popularProduct.thumbnail }} />
          <Text className='text-red-500 font-bold text-2xl text-center'>{stats.popularProduct.name}</Text>
          <Text className='text-red-500 font-bold text-2xl text-center'>Được {stats.popularProductBoughtTimes} lần mua</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  statsContainer: {
    marginTop: 16,
  },
  statsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
    marginLeft: 90
  },
  btn: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 7,
  }
});

export default StatisticAdScreen;
