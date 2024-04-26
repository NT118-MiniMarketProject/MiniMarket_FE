import { Text, View, TextInput, StyleSheet, StatusBar} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign, Feather, EvilIcons } from "@expo/vector-icons";
import SafeView from './SafeView';
import { LinearGradient } from 'expo-linear-gradient';


const Header = () => {
    const [text, setText] = useState('');
  return (
    <LinearGradient
      className="rounded-xl"
      colors={["#0A773D", "#5CA927"]}
      start={[0, 0]}
      end={[1, 0]}
    >
      <SafeView classname="flex-row items-center space-x-2 bg-white rounded-lg px-3 py-1 mx-2 mb-3">
        <TouchableOpacity>
          <AntDesign name="bars" size={24} color="#0A773D" />
        </TouchableOpacity>
        <View className="bg-white flex-1 rounded-lg py-1 px-2 flex-row items-center">
          <EvilIcons name="search" size={24} color="#515764" />
          <TextInput
            placeholder="Nhập sản phẩm"
            onChangeText={setText}
            value={text}
            className="border-none text-txtgray mx-1"
          />
        </View>
        <TouchableOpacity>
          <Feather name="shopping-cart" size={22} color="#0A773D" />
        </TouchableOpacity>
      </SafeView>
    </LinearGradient>

    // <View>
    //     <SafeAreaView className='flex-1'>
    //         <View className="bg-primary px-4 py-3">
    //             <SafeAreaView className="bg-white rounded-lg py-1 px-2 flex-row items-center">
    //                 <TouchableOpacity>
    //                 <AntDesign name="bars" size={24} color="#0A773D" />
    //                 </TouchableOpacity>
    //                 <TextInput
    //                 placeholder="Type here..."
    //                 onChangeText={setText}
    //                 value={text}
    //                 className="flex-1 border-none text-txtgray mx-1"
    //                 />
    //             <TouchableOpacity>
    //                 <Feather name="shopping-cart" size={22} color="#0A773D" />
    //             </TouchableOpacity>
    //             </SafeAreaView>
    //         </View>

    //     </SafeAreaView>

    // </View>
  );
}

export default Header

