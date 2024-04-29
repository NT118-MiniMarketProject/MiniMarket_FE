import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../utils/types'

const AccountScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView>
      <Text>Thông tin người dùng anh Khoa</Text>
      <TouchableOpacity className='bg-blue-500' onPress={() => {
        navigation.navigate("AccountInfo");
      }}>
        <Text>Xem thông tin cá nhân</Text>
      </TouchableOpacity>
      <View className='p-4 flex-row justify-end space-x-4'>
        {/* <TouchableOpacity className='px-5 py-2 rounded-md bg-white' 
          onPress={() => navigation.navigate("Đăng nhập")}>
          <Text className='text-txtprimary'>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity className='px-5 py-2 rounded-md border-1.2 border-black' 
          onPress={() => navigation.navigate("Đăng ký")}>
          <Text className='text-black'>Đăng ký</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})