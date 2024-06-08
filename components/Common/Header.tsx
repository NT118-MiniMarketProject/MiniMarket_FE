import { Text, View, TextInput, StyleSheet, StatusBar} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign, Feather, EvilIcons } from "@expo/vector-icons";
import SafeView from './SafeView';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';
import { useIsFocused } from '@react-navigation/native';

const Header = () => {
    const [text, setText] = useState('');
    const isFocused = useIsFocused();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    useEffect(() => {
        setText('');
    })
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
        <TouchableOpacity>
          <Feather name="shopping-cart" size={22} color="#0A773D" />
        </TouchableOpacity>
      </SafeView>
    </LinearGradient>
  );
}

export default Header

