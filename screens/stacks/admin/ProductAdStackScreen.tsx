import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductListAdScreen from '../../Admin/ProductListAdScreen';
import AddProductForm from '../../Admin/AddProductForm';


const ProductAdStack = createStackNavigator();

const ProductAdStackScreen: React.FC = () => {
  return (
    <ProductAdStack.Navigator>
      <ProductAdStack.Screen
        name="ProductListAdScreen"
        component={ProductListAdScreen}
        options={{headerShown: false }}
      />
      <ProductAdStack.Screen name="AddProductForm" component={AddProductForm} options={{headerTitle: "Chỉnh sửa sản phẩm"}}/>
      
    </ProductAdStack.Navigator>
  );
};

export default ProductAdStackScreen

const styles = StyleSheet.create({})