import {Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchcategoryHeader } from '../../store/features/Collection/categoryHeaderSlice';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const HomeCategories = () => {
    const categoryHeader = useAppSelector((state) => state.categoryHeader);
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchcategoryHeader());
    }, []);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
      }}
      className="bg-white p-2 my-1"
    >
      {categoryHeader.data.map((item) => (
        <TouchableOpacity
          key={item.id}
          className="flex-column space-y-2 items-center p-2 w-13"
        >
          <Image className='h-10 w-10 bg-contain bg-center'  src={item.thumbnail} />
          <Text className="text-center text-txtsecond text-10m">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default HomeCategories

