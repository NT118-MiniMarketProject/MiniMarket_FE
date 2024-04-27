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
      <TouchableOpacity className='px-2 py-1 rounded-md' onPress={
        () => {
          navigation.navigate("AccountLoginScreen")
        }
      }>
        <Text>Đăng nhập</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})