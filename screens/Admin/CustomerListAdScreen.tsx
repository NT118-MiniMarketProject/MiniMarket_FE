import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Image, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import tailwind from 'tailwind-rn';

const defaultAvatar = 'https://img.icons8.com/material/344/user-male-circle--v1.png';

interface User {
  name: string;
  email: string;
  phone: string;
  address: string | null;
  avater: string | null;
  role: string;
}

const CustomerListAdScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get<{ data: User[] }>('https://minimarket-be.onrender.com/api/v1/user', config);
        const filteredUsers = response.data.data
        setUsers(filteredUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <View className='flex-1 p-4'>
      <FlatList
        data={users}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          item.role == 'customer' && (
            <View className='bg-white p-6 mb-4 rounded-lg shadow-lg'>
              <View className='flex-row items-center mb-4'>
                <Image
                  className='h-16 w-16 rounded-full mr-4'
                  source={{ uri: item.avater || defaultAvatar }}
                />
                <View>
                  <Text className='text-xl font-bold text-red-500'>{item.name}</Text>
                  <Text className='text-sm text-green-600'>{item.role}</Text>
                </View>
              </View>
              <View className='flex-row items-center mb-2'>
                <Icon name="envelope" size={20} color="#4A5568" className='mr-2' />
                <Text className='text-base text-gray-800'>{item.email}</Text>
              </View>
              <View className='flex-row items-center mb-2'>
                <Icon name="phone" size={20} color="#4A5568" className='mr-2' />
                <Text className='text-base text-gray-800'>{item.phone}</Text>
              </View>
              <View className='flex-row items-center mb-2'>
                <Icon name="map-marker" size={20} color="#4A5568" className='mr-2' />
                <Text className='text-base text-gray-800'>
                  {item.address ? item.address : 'No address available'}
                </Text>
              </View>
            </View>
          )
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomerListAdScreen;