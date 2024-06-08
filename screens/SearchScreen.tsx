import { Text, View, TextInput,  FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign, Feather, EvilIcons } from "@expo/vector-icons";
import SafeView from "../components/Common/SafeView";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/types";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SEARCH_HISTORY_KEY = "SEARCH_HISTORY";

const SearchScreen = () => {
  const [text, setText] = useState("");
  const isFocused = useIsFocused();
  const inputRef = useRef<TextInput>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    if (isFocused){
      setText("");
      if (inputRef.current) {
        inputRef.current.focus();
        loadSearchHistory();
      }
    }
    
  }, [isFocused]);
  const handleSearch = (query: string) => {
    if (query){
        saveSearchHistory(query);
        navigation.navigate("ProductSearchScreen", {
            search: query,
            isSale:false
        })
    }
  }
  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error("Failed to load search history", error);
    }
  };
  const saveSearchHistory = async (query: string) => {
    try {
      const updatedHistory = [
        query,
        ...searchHistory.filter((item) => item !== query),
      ].slice(0, 10); // Keep the latest 10 searches
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error("Failed to save search history", error);
    }
  };
    const clearSearchHistory = async () => {
    try {
        setSearchHistory([]);
        await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
        console.error("Failed to clear search history", error);
    }
    };
  return (
    <>
      <LinearGradient
        className="rounded-xl"
        colors={["#0A773D", "#5CA927"]}
        start={[0, 0]}
        end={[1, 0]}
      >
        <SafeView classname="flex-row items-center space-x-2 bg-txtwhite rounded-lg px-3 py-1 mx-2 mb-3">
          <TouchableOpacity
            className=""
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={24} color="#0A773D" />
          </TouchableOpacity>
          <View className="bg-txtwhite border border-gray-200 flex-1 rounded-lg py-1 px-2 flex-row items-center">
            <EvilIcons name="search" size={24} color="#515764" />
            <TextInput
              ref={inputRef}
              placeholder="Nhập sản phẩm"
              onChangeText={setText}
              value={text}
              className="border-none text-txtgray mx-1"
              onSubmitEditing={() => handleSearch(text)}
              returnKeyType="search" // This changes the keyboard's return key to say "Search"
            />
          </View>
          <TouchableOpacity className="" onPress={() => handleSearch(text)}>
            <Text className="text-13m text-primary font-bold">Tìm kiếm</Text>
          </TouchableOpacity>
        </SafeView>
      </LinearGradient>
      {/* History Search */}
      <View className="bg-gray-100">
        <FlatList
        className="bg-txtwhite"
            data={searchHistory}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
            <TouchableOpacity className="w-full border-b border-gray-100 p-3" onPress={() => handleSearch(item)}>
                <Text >{item}</Text>
            </TouchableOpacity>
            )}
            ListFooterComponent={
                searchHistory.length ?
                <TouchableOpacity onPress={clearSearchHistory}>
                    <Text className="text-center text-txtgray p-3">Xóa lịch sử tìm kiếm</Text>
                </TouchableOpacity>
                : null
            }
        />
      </View>
    </>
  );
};

export default SearchScreen;
