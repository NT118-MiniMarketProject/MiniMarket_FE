import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../utils/types'

const AccountScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>Thông tin người dùng anh Khoa</Text>
      <TouchableOpacity className='bg-blue-500' onPress={() => {
        navigation.navigate("AccountInfo");
      }}>
        <Text>Xem thông tin cá nhân</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})