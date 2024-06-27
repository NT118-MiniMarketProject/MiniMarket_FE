import {Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchcategoryHeader } from '../../store/features/Collection/categoryHeaderSlice';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { Skeleton } from 'moti/skeleton';


const HomeCategories = () => {
    const categoryHeader = useAppSelector((state) => state.categoryHeader);
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchcategoryHeader());
    }, []);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={
        {
          // justifyContent: "space-between",
          // alignItems: "center",
          // paddingVertical: 10,
          // width: "100%"
        }
      }
      className="bg-white px-2 py-1 my-1"
    >
      {categoryHeader.loading
        ? Array(5).map((item) => (
          <View className='w-1/5'>
            <Skeleton
              colorMode={"light"}
              radius="round"
              height={20}
              width={30}
            />
          </View>
            
          ))
        : categoryHeader.data.map((item) => (
            <TouchableOpacity
              key={item.id}
              className=" flex-column space-y-2 items-center p-2 pb-0 w-20"
              onPress={() => {
                navigation.navigate("ProductListScreen", {
                  categoryId: item.id,
                  categoryName: item.name,
                  categroup: item.categroup,
                });
              }}
            >
              <Image
                className="h-10 w-10 bg-contain bg-center"
                src={item.thumbnail}
              />
              <Text className="text-center text-txtsecond text-10m w-100">
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
    </ScrollView>
  );
}

export default HomeCategories

