import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../utils/types'
import { CredentialContext } from '../../contexts/CredentialContext'
import Toast, { ToastOptions } from 'react-native-root-toast'
import { Colors, toastConfig } from '../../components/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const domain = "https://minimarket-be.onrender.com";
const defaultErrMsg = "Ops! There's something wrong, try again later";

const AccountScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {credential, setCredential} = useContext(CredentialContext);
  const {name} = credential ?? {};
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    if(!credential) {
      Toast.show('Not logged in', toastConfig as ToastOptions);
      return;
    }
    // url: https://minimarket-be.onrender.com/api/v1/auth/logout
    const url = domain + '/api/v1/auth/logout';
    try {
      const response = await axios.delete(url);
      // console.log(response);
      await AsyncStorage.removeItem('credential');
      setCredential(null);
      Toast.show(response.data?.msg ?? 'Logout successfully!', toastConfig as ToastOptions);
    }catch(err) {
      console.log(err);
      Toast.show(defaultErrMsg, toastConfig as ToastOptions);
    }finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SafeAreaView>
      <Text>{credential ? `Thông tin người dùng ${name}` : 'Người dùng chưa đăng nhập'}</Text>
      {
        credential ? 
        (<>
          <TouchableOpacity className='bg-blue-500' onPress={() => {
            navigation.navigate("AccountInfo");
          }}>
            <Text>Xem thông tin cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row justify-center items-center px-5 py-2 rounded-md border-1.2 border-black self-end m-3'
            onPress={() => {setIsLoggingOut(true); logout();}}
            disabled={isLoggingOut}
            style={{backgroundColor: isLoggingOut ? Colors.disabledBtn : Colors.white}}
          >
            {isLoggingOut && <ActivityIndicator color={Colors.disabledText}/>}
            <Text className='p-1' style={{color: isLoggingOut ? Colors.disabledText: Colors.black}}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </>) :
        (<View className='p-4 flex-row justify-end space-x-4'>
          <TouchableOpacity className='px-5 py-2 rounded-md bg-white' 
            onPress={() => navigation.navigate("AccountLoginScreen")}>
            <Text className='text-txtprimary'>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity className='px-5 py-2 rounded-md border-1.2 border-black' 
            onPress={() => navigation.navigate("AccountSignUpScreen")}>
            <Text className='text-black'>Đăng ký</Text>
          </TouchableOpacity>
        </View>)
      }
      
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})