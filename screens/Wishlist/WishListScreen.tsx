import React, { useEffect } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, Touchable, Button } from "react-native";
import { deleteItemWishList, fetchWishList } from "../../store/features/Products/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import LoadingModal from "../../components/Common/LoadingModal";

const WishListScreen: React.FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const toast = useToast();

  const {
    loading,
    error,
    data: wishList,
  } = useAppSelector(state => state.wishlist);
  const handleRemoveItem = async (productId: string) => {
    setIsLoading(true);
    dispatch(deleteItemWishList({product_id: productId})).then((res) => {
        setIsLoading(false);
        if (res.payload) {
            toast.show("Xoá thành công!")
        }
        else{
            toast.show("Xảy ra lỗi! Vui lòng thử lại sau.")
        }
    });
  };
  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchWishList()).then(() => setIsLoading(false))
  }, []);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-red-500 text-lg">{error}</Text>
//       </View>
//     );
//   }

  return (
    <View className="flex-1">
      <Breadcrumb title="Danh sách yêu thích" />
      {/* {isLoading ? <LoadingModal /> : null} */}
      {wishList.length ? (
        <FlatList
          data={wishList}
          keyExtractor={(item) => item.product_id}
          renderItem={({ item }) => (
            <View className="w-full flex-row p-2 border-b border-gray-300">
              <Image source={{ uri: item.thumbnail }} className="w-20 h-20" />
              <View className="flex-1 flex-col items-start space-y-1 ml-4 justify-center">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductDetailScreen", {
                      id: item.product_id,
                    });
                  }}
                >
                  <Text className="text-13m font-bold">{item.name}</Text>
                </TouchableOpacity>
                <Text className="text-gray-500">{item.discount_price} VND</Text>
                <TouchableOpacity
                className="border border-red-500 bg-transparent rounded-md p-2"
                  onPress={() => handleRemoveItem(item.product_id)}
                >
                    <Text className="text-red-500">Xoá</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray text-center text-14m">
            Không có sản phẩm nào trong danh sách yêu thích
          </Text>
        </View>
      )}
    </View>
  );
};

export default WishListScreen;
