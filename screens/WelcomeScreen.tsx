import {Text, View, Image, StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/types';
// import {useis}

const WelcomeScreen: React.FC = () => {
  // StackNavigation<RootStack..> uses to specify the type of navigation obj,
  // stacknavigationprop -> define prop type for a stack navigator
  // RootStackParamList is the type you've defined for the navigation stack, specifying the available routes and their parameters.
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const id = setTimeout(() => {
      navigation.navigate("Tabs");
    }, 1000);
  }, []);
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={require("../assets/images/brand-logo.png")}
        className="h-40 w-40"
      ></Image>
      <Text className="text-center text-primary text-xl font-bold">
        Green Mart
      </Text>
    </View>
    // <View style={styles.container}>
    //   <LinearGradient
    //     // Background Linear Gradient
    //     colors={['rgba(0,0,0,0.8)', 'transparent']}
    //     style={styles.background}
    //   />
    //   <LinearGradient
    //     // Button Linear Gradient
    //     colors={['#4c669f', '#3b5998', '#192f6a']}
    //     style={styles.button}>
    //     <Text style={styles.text}>Sign in with Facebook</Text>
    //   </LinearGradient>
    // </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});

export default WelcomeScreen

