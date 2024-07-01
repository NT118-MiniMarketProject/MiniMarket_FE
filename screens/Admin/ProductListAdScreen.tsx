interface Product {
    product_id: string;
    thumbnail: string;
    name: string;
    reg_price: number;
    discount_percent: number | null;
    discount_price: number | null;
    quantity: number | null;
    unit: string;
    canonical: string | null;
    description: string | null;
    created_at: string;
    updated_at: string | null;
    deleted: boolean;
    rating: string | null;
    c_id: string;
    br_id: string;
    event_percent: number | null;
    event_price: number | null;
    is_visible: string | null;
    is_feature: string | null;
  }
  
  interface ApiResponse {
    numOfPages: number;
    totalProducts: number;
    currentPage: number;
    products: Product[];
  }


import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';


const ProductListAdScreen:  React.FC<{ navigation: any }> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more pages to load

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const response = await axios.get<ApiResponse>(
        `https://minimarket-be.onrender.com/api/v1/product?page=${nextPage}`
      );
      setProducts([...products, ...response.data.products]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < response.data.numOfPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>('https://minimarket-be.onrender.com/api/v1/product?page=0');
      setProducts(response.data.products);
      setCurrentPage(0);
      setHasMore(response.data.currentPage < response.data.numOfPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      loadMoreProducts();
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleDelete = async (productId: string) => {
    console.log(`https://minimarket-be.onrender.com/api/v1/product/${productId}`)
    const accessToken = await AsyncStorage.getItem('accessToken');
    // Show confirmation dialog before deletion
    Alert.alert(
      'Xác nhận xóa sản phẩm',
      'Bạn có chắc chắn muốn xóa sản phẩm này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: async () => {
            const config = {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            };

            console.log(accessToken)

            try {
              await axios.delete(`https://minimarket-be.onrender.com/api/v1/product/${productId}`, config);

              fetchProducts();
            } catch (error) {
              console.error('Error deleting product:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditPress = (product: Product) => {
    navigation.navigate('AddProductForm', { productId: product.product_id, product });
  };
  

  return (
    <View style={{ flex: 1 }} className="mt-8">
      <ScrollView onScroll={handleScroll}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Danh Sách sản phẩm</Text>
        </View>

        <TouchableOpacity className="bg-slate-300" style={styles.addButton} onPress={() => {/* Add navigation logic for adding product */}}>
          <Icon name="pencil" size={20} color="green" style={styles.icon1} />
          <Text style={styles.buttonText}>Thêm sản phẩm</Text>
        </TouchableOpacity>

        {products.map(product => (
            <View className="m-4 p-4 bg-white rounded-xl relative" key={product.product_id}>

        <View className="absolute left-6 -top-6 bg-white mt-2 mb- p-1 rounded-xl">
          <Text className="font-bold text-red-400">{product.name}</Text>
        </View>

                <View className="border-b-2 pb-4 mt-4">

                <View className="flex-row items-center m-2 relative">
                <Image source={{ uri: product.thumbnail }} className="w-16 h-16 mr-2" />
                <View>
                    <Text className="text-sm opacity-40">{product.unit} x {product.quantity}</Text> 
                    <Text className="opacity-40">Giá: {product.reg_price}đ</Text>
                    <Text className="opacity-40">ngày sản xuất: {formatDate(product.created_at)}</Text>
                </View>
                

                </View>

                </View>

                <View>


                <View style={styles.container} className="mt-4">
                <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(product.product_id)}>
                <Icon name="times" size={20} color="red" style={styles.icon} />
                <Text style={styles.actionText}>Xóa sản phẩm</Text>
              </TouchableOpacity>
                </View>

                <View style={styles.container} className="mt-4">
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEditPress(product)}>
  <Icon name="pencil" size={20} color="green" style={styles.icon} />
  <Text style={styles.text1}>Chỉnh sửa sản phẩm</Text>
</TouchableOpacity>
                </View>
                </View>
                </View>
        ))}

        {loading && (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        )}

        {!loading && !hasMore && (
          <Text style={styles.endMessage}>Đã tải hết sản phẩm</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
      container: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  text: {
    fontSize: 16,
  },
  iconContainer: {
    marginRight: 8, 
  },
  icon: {
    marginRight: 5, 
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
  },
  productContainer: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  labelContainer: {
    backgroundColor: '#ffffff',
    marginTop: -20,
    marginBottom: 10,
    marginLeft: 10,
    padding: 5,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: 14,
    color: '#808080',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  actionText: {
    marginLeft: 5,
    color: '#808080',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  endMessage: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#808080',
  },
  icon1: {
        marginRight: 5, 
  },
});

export default ProductListAdScreen;
