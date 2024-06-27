import React, { useState } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, Dimensions, FlatList  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import RadioItem from './RadioItem'; // Đảm bảo bạn import RadioItem từ đúng đường dẫn

const data = [
  { id: 1, name: 'Item 1', price: '$10', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-UhFrwmBZnXAMSKgTZMEKvZQBZr1U32kr6w&s' },
  { id: 2, name: 'Item 2', price: '$20', imgUrl: 'https://www.shutterstock.com/image-photo/grilled-pork-bread-260nw-1539968231.jpg' },
  { id: 3, name: 'Item 3', price: '$15', imgUrl: 'https://www.shutterstock.com/image-photo/banh-mi-vietnamese-sandwich-food-600nw-1713347764.jpg' },
];
const ProductDetailScreen = () => {
  const width = Dimensions.get('window').width;
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgk1qdnw9A7MjQFGxkSYRO-ldfArQKU75QA&s',
    'https://media.istockphoto.com/id/1324862595/photo/banh-mi-vietnam-sandwich-of-vietnam-photography.jpg?s=612x612&w=0&k=20&c=I3cAXbxO890EXL9ZTQ9uOZZztzBaKYzRhk7J-ONu6X4=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxSPCnPlvtzGx7dauhujs3PTJVdh5B6d7PA&s',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item: any) => {
    setSelectedItem(item.id === selectedItem ? null : item.id);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="mt-14 bg-gray-300">
        <View className="m-2 p-2 bg-white rounded-xl relative">
          <Text className="text-lg font-bold">THÔNG TIN CHI TIẾT SẢN PHẨM</Text>
        </View>

        {/* ================================================================= */}

        <View style={{ flex: 1 }}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={images}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => {
              setCurrentIndex(index);
            }}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Image
                  source={{ uri: item }}
                  style={styles.image}
                />
              </View>
            )}
          />
          <Text style={styles.imageCount}>{`${currentIndex + 1}/${images.length}`}</Text>
        </View>

        {/* ================================================================= */}
        <View><Text className="fs-lg font-bold m-2">Bánh mì thượng hàng ăn ngon tuyệt với</Text></View>
        <View><Text className="fs-sm opacity-30 mx-2 ">(*) Thông tin lưu ý sản phẩm</Text></View>
        <View>
          <Text className="fs-lg font-bold m-2">35.000đ</Text>
          <View className="flex items-start flex-row">
            <Text className="fs-lg font-bold mx-2 opacity-30">25.000đ</Text>
            <Text className="fs-lg font-bold mx-2 text-red-500 ">-29%</Text>
          </View>
        </View>

        {/* ======================================================================= */}
        <View className="bg-white m-2 p-2 rounded">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RadioItem
            item={item}
            selected={selectedItem}
            onSelect={handleSelectItem}
          />
        )}
      />
    </View>

        {/* ================================================================ */}
        <View className="flex flex-row text-sm p-4 bg-gray-100 rounded-lg shadow-md">
          <View className="flex-1">
            <Text className="font-bold text-amber-500">HOÀN TIỀN hoặc GIAO LẠI NGAY</Text>
            <Text className="text-gray-600">nếu không tươi ngon, hư hỏng, hết hạn</Text>
          </View>

          <View className="flex items-center ml-4 border border-blue-500 rounded-lg bg-blue-100 bg-opacity-50 justify-center p-2">
            <Text className="text-blue-500 font-semibold"> Mời phản ánh chất lượng</Text>
          </View>
        </View>


        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++== */}

        <View>
        <Text style={{ margin: 8, fontSize: 18, fontWeight: 'bold', color: '#333' }}>Thông tin sản phẩm</Text>
        <Text style={{ marginHorizontal: 8, opacity: 0.7, fontSize: 14, color: '#666' }}>
          Bánh mì là một loại baguette của Việt Nam với lớp vỏ ngoài giòn tan, ruột mềm, còn bên trong là phần nhân. Tùy theo văn hóa vùng miền hoặc sở thích cá nhân mà người ta có thể lựa chọn nhiều loại đồ ăn kèm khác nhau, ngoài ra tên gọi của bánh cũng phụ thuộc phần lớn vào những biến tấu ấy.
        </Text>
      </View>
      <View style={{ marginTop: 16, borderTopWidth: 1, borderColor: '#ccc', paddingTop: 16 }}>
        <View style={{ flexDirection: 'row', marginVertical: 4, backgroundColor: '#f0f8ff' }} className="m-2">
          <Text style={{ flex: 1, fontWeight: 'bold', color: '#007BFF' }} className="bg-red-200">Thương hiệu</Text>
          <Text style={{ flex: 1, color: '#333' }}>Bánh Mì Việt</Text>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 4, backgroundColor: '#f0f8ff' }} className="m-2">
          <Text style={{ flex: 1, fontWeight: 'bold', color: '#007BFF' }} className="bg-red-200">Công dụng</Text>
          <Text style={{ flex: 1, color: '#333' }}>Ăn liền</Text>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 4, backgroundColor: '#f0f8ff' }} className="m-2">
          <Text style={{ flex: 1, fontWeight: 'bold', color: '#007BFF' }} className="bg-red-200">Thành phần</Text>
          <Text style={{ flex: 1, color: '#333' }}>Bột mì, Nước, Muối, Men</Text>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 4, backgroundColor: '#f0f8ff' }} className="m-2">
          <Text style={{ flex: 1, fontWeight: 'bold', color: '#007BFF' }} className="bg-red-200">Hương</Text>
          <Text style={{ flex: 1, color: '#333' }}>Bánh mì</Text>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 4, backgroundColor: '#f0f8ff' }} className="m-2">
          <Text style={{ flex: 1, fontWeight: 'bold', color: '#007BFF' }} className="bg-red-200">Khối lượng</Text>
          <Text style={{ flex: 1, color: '#333' }}>100g</Text>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 4, backgroundColor: '#f0f8ff' }} className="m-2">
          <Text style={{ flex: 1, fontWeight: 'bold', color: '#007BFF' }} className="bg-red-200">Sản xuất tại</Text>
          <Text style={{ flex: 1, color: '#333' }}>Việt Nam</Text>
        </View>
      </View>
      


{/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++== */}

        <View>
          <Text style={{ margin: 8, fontSize: 18, fontWeight: 'bold', color: '#333' }}>Đôi nét về sản phẩm</Text>
          <Text className="mx-2">...</Text>
        </View>

        <View>
          <Text style={{ margin: 8, fontSize: 18, fontWeight: 'bold', color: '#333' }}>Lợi ích sản phẩm</Text>
          <Text className="mx-2">...</Text>
        </View>



      </ScrollView>
      
      <LinearGradient
        colors={['#00FF00', '#00CC00']} // Adjust gradient colors as needed
        className="justify-center"
        style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', padding: 20 }}
      >
        <View style={styles.container}>
          <Text style={[styles.text, styles.boldText, { marginLeft: 8 }]}>MUA HÀNG</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
  },
  text: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  carouselItem: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageCount: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
});

export default ProductDetailScreen;
