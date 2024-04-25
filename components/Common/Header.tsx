import { Text, View, TextInput} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign, Feather } from "@expo/vector-icons";


const Header = () => {
    const [text, setText] = useState('');
  return (

    <SafeAreaView className='gradient-primary'>
        <SafeAreaView className='bg-blue-400'>
            <Text>Hello minh beo</Text>
        </SafeAreaView>
    </SafeAreaView>
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

