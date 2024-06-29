import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../styles';

const LoadingModal = () => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 flex-row items-center justify-center opacity-30 z-20">
      <ActivityIndicator size={"large"} color={Colors.primary} />
    </View>
  );
}

export default LoadingModal

const styles = StyleSheet.create({})