import { Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Home/HomeScreen';
import DetailScreen from '../Home/DetailScreen';
import { useRoute } from '@react-navigation/native';
import Tabs from '../../components/Common/Tabs';


const HomeStack = createStackNavigator();


const HomeStackScreen: React.FC = () => {
  
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name='DetailScreen' component={DetailScreen} options={{presentation: "modal"}} />
    </HomeStack.Navigator>
    // <View className="flex-1 items-center justify-center bg-white">
    //   <Text className="text-red-400 font-bold">
    //     Open up App.js to start working on your app!
    //   </Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

export default HomeStackScreen;

