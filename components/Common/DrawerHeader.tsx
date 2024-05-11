import {  Text, View, TouchableOpacity, TextInput} from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import SafeView from './SafeView';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigationProp, RootStackParamList, TabStackParamList } from '../../utils/types';
import { AntDesign, Entypo, EvilIcons, Feather } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const DrawerHeader = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [text, setText] = useState<string>("");
  return (
    <LinearGradient
      colors={["#0A773D", "#5CA927"]}
      start={[0, 0]}
      end={[1, 0]}
    >
      <SafeView classname="flex-row items-center space-x-2 rounded-lg px-3 py-1 mx-2 mb-2">
        <TouchableOpacity
          className="px-2 py-1 rounded-sm flex-column items-center"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="closecircle" size={21} color="white" />
          <Text className="text-center text-white text-11m">Đóng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-2 py-1 rounded-sm flex-column items-center"
          onPress={() => {
            navigation.navigate("Tabs", {screen: "HomeStackScreen"});
            // navigation.navigate("HomeStackScreen");
          }}
        >
          <Entypo name="home" size={21} color="white" />
          <Text className="text-center text-white text-11m">Trang chủ</Text>
        </TouchableOpacity>

        <View className="bg-white flex-1 rounded-lg py-1 px-2 flex-row items-center">
          <EvilIcons name="search" size={24} color="#515764" />
          <TextInput
            placeholder="Tìm kiếm"
            onChangeText={setText}
            value={text}
            className="border-none text-txtgray mx-1"
          />
        </View>
      </SafeView>
    </LinearGradient>
  );
}

export default DrawerHeader

