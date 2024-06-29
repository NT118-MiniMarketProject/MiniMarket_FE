import { Text, View, TextInput, StyleSheet, StatusBar} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign, Feather, EvilIcons } from "@expo/vector-icons";
import SafeView from './SafeView';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';
import { useIsFocused } from '@react-navigation/native';
import { useAppSelector } from '../../store';
import { CredentialContext } from '../../contexts/CredentialContext';

const Header = () => {
    const {credential} = useContext(CredentialContext);
    const [text, setText] = useState('');
    const isFocused = useIsFocused();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const cartNumber = useAppSelector(state => state.cart.data.cartItems.length)
    useEffect(() => {
        setText('');
    },[])
  return (
    <LinearGradient
      className="rounded-xl"
      colors={["#0A773D", "#5CA927"]}
      start={[0, 0]}
      end={[1, 0]}
    >
      <SafeView classname="flex-row items-center space-x-2 bg-txtwhite rounded-lg px-3 py-1 mx-2 mb-3">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CategoriesScreen");
          }}
        >
          <AntDesign name="bars" size={24} color="#0A773D" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SearchScreen");
          }}
          className="bg-txtwhite flex-1 rounded-lg py-1 px-2 flex-row items-center"
        >
          <EvilIcons name="search" size={24} color="#515764" />
          <View className="border-none text-txtgray mx-1">
            <Text className='text-txtgray'>Nhập sản phẩm</Text>
          </View>
        </TouchableOpacity>
        {/* Cart Icon */}
        <TouchableOpacity className='relative' onPress={() => navigation.navigate("CartStackScreen")}>
          {(cartNumber && credential) ?
            <View className='bg-red-600 rounded-full w-4 h-4 z-10 flex-row items-center justify-center absolute' style={styles.absolutePositioned}>
              <Text className='text-txtwhite' style={{fontSize: 10}}>{cartNumber}</Text>
            </View>
            : null
          }
          <Feather name="shopping-cart" size={22} color="#0A773D" />
        </TouchableOpacity>
      </SafeView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  absolutePositioned: {
    position: "absolute",
    top: -5,
    right: -5,
  },
});

export default Header

