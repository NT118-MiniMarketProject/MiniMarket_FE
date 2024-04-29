import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, ScrollView,FlatList, ViewToken } from 'react-native'
import React, { useEffect, useRef } from 'react'
import SafeView from '../components/Common/SafeView'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchCategoryGroupDetail } from '../store/features/Collection/categoryGroupDetailSlice'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CategoriesScreen = () => {
  const categoryGroupDetail = useAppSelector((state) => state.categoryGroupDetail);
  const [index, setIndex] = React.useState<number>(0);
  const [flag, setFlag] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const flatRef = useRef<FlatList>(null);
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setIndex(viewableItems[0].index || 0);
      }
    }
  ).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  useEffect(() => {
    dispatch(fetchCategoryGroupDetail());
  },[])
  // Handle scrollToIndex
  useEffect(() => {
    if (flag){
      flatRef.current?.scrollToIndex({ index: index, animated: true });
    }
    return () => {
      setFlag(false);
    }
  }, [index])
  return (
    <View className="flex-row flex-1 bg-gray-200">
      {/* Left bar */}
      <View className="w-1/3 bg-transparent">
        <TouchableOpacity className="w-full flex-row space-x-1 items-center justify-center border-dashed border-b border-gray-300 py-3">
          <MaterialCommunityIcons name="sale" size={12} color="red" />
          <Text className="font-bold text-black text-11m text-center">
            Khuyến mãi hot
          </Text>
        </TouchableOpacity>
        {categoryGroupDetail.data.map((item, idx) => (
          <TouchableOpacity
            className={`w-full flex-column items-center border-dashed border-b border-gray-300 py-2 ${
              idx === index ? "bg-lightgreen" : ""
            }`}
            key={idx}
            onPress={() => {
              setIndex(idx);
              setFlag(true);
            }}
          >
            {/* Image */}
            <View className="overflow-hidden w-1/3 bg-transparent p-1">
              {/* image */}
              <ImageBackground
                src={item.thumbnail}
                resizeMode="contain"
                style={{
                  width: "100%",
                  paddingTop: "100%",
                }}
              />
            </View>
            {/* Text */}
            <Text
              className={`font-bold text-center text-11m ${
                idx === index ? "font-bold text-txtgreen" : "text-txtgray"
              }`}
            >
              {item.categoryGroupName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Right bar FlatList */}
      <FlatList
        className="w-2/3 grow-0"
        contentContainerStyle={{paddingBottom: 550}}
        style={{
          // height: 2000
        }}
        ref={flatRef}
        data={categoryGroupDetail.data}
        keyExtractor={(item) => item.id.toString()}
        horizontal={false}
        showsVerticalScrollIndicator
        renderItem={(item) => {
          return (
            <View className={`w-full flex-row flex-wrap mb-2 py-1 ${index===item.index ? "bg-lightgreen" : "bg-white"}`}>
              {item.item.list.map(
                (cate: { thumbnail: string; name: string }, index: number) => (
                  <TouchableOpacity className="w-1/3 flex-column items-center py-2" key={index}>
                    {/* Image */}
                    <View className="overflow-hidden w-3/4 bg-transparent p-1">
                      {/* image */}
                      <ImageBackground
                        source={{ uri: cate.thumbnail }}
                        resizeMode="contain"
                        style={{
                          width: "100%",
                          paddingTop: "100%",
                        }}
                      />
                    </View>
                    {/* Text */}
                    <Text className="text-center text-12m text-txtgray">
                      {cate.name}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          );
        }}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />
    </View>
  );
}

export default CategoriesScreen

const styles = StyleSheet.create({})