import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
  FlatList,
} from "react-native";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../utils/types";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchCategory } from "../store/features/CategoryProducts/categorySlice";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { fetchBrandCate } from "../store/features/CategoryProducts/brandSlice";
import { productHomeBEInterface, productHomeInterface } from "../utils";
import Product from "../components/Common/Product";
import {
  clearData,
  fetchCategoryProducts,
} from "../store/features/Products/productListSlice";
import { Colors } from "react-native/Libraries/NewAppScreen";

// type DetailsScreenRouteProp = RouteProp<RootStackParamList, "ProductList">;

// type Props = {
//   route: DetailsScreenRouteProp;
// };
type ProductListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ProductListScreen"
>;

const ProductListScreen = ({ route }: ProductListScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const categoryData = useAppSelector((state) => state.category);
  const brandData = useAppSelector((state) => state.brand);
  const productList = useAppSelector((state) => state.productList);
  const [page, setPage] = useState<number>(1);
  const [fetchParams, setFetchParams] = useState<{
    categoryId: number;
    categoryName: string;
    categroup: number;
    brandId: string;
    sort: string;
  }>({
    categoryId: -1,
    categoryName: "",
    categroup: -1,
    brandId: "",
    sort: "",
  });
  const [tempParams, setTempParams] = useState<{
    brandId: string;
    sort: string;
  }>({
    brandId: "",
    sort: "",
  });
  const [visiable, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isFocusced = useIsFocused();
  const updateFetchParams = (newParams: Partial<typeof fetchParams>) => {
    setFetchParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };
  const sortList = [
    {
      id: 1,
      name: "Giá thấp tới cao",
      query: "minTomax",
    },
    {
      id: 2,
      name: "Giá cao tới thấp",
      query: "maxTomin",
    },
    {
      id: 3,
      name: "Tên A-Z",
      query: "a-z",
    },
    {
      id: 4,
      name: "Tên Z-A",
      query: "z-a",
    },
  ];
  const openModal = () => {
    setTempParams({ brandId: fetchParams.brandId, sort: fetchParams.sort });
    setVisible(true);
  };
  const applyModal = () => {
    updateFetchParams({ brandId: tempParams.brandId, sort: tempParams.sort });
    setVisible(false);
  };
  const removeFilter = () => {
    updateFetchParams({ brandId: "", sort: "" });
    setVisible(false);
  };
  const fetchingProductList = (reset: boolean) => {
    if (reset) dispatch(clearData());
    const query = `cid=${fetchParams.categoryId}&brid=${fetchParams.brandId}&sort=${fetchParams.sort}&page=${page}`;
    dispatch(fetchCategoryProducts(query));
  };
  useEffect(() => {
    if (isFocusced) {
      const { categoryId, categoryName, categroup } = route?.params ?? {};
      updateFetchParams({ categoryId, categoryName, categroup });
      dispatch(fetchCategory(categroup.toString()));
    }
  }, [isFocusced]);
  // Fetching categories of the group
  // useEffect(() => {
  //   // dispatch(clearData());

  //   }, [route.params.categoryId])
  useEffect(() => {
    updateFetchParams({ brandId: "" });
    dispatch(fetchBrandCate(fetchParams.categoryId));
  }, [fetchParams.categoryId]);
  useEffect(() => {
    setPage(1);
    fetchingProductList(true);
  }, [fetchParams.categoryId, fetchParams.brandId, fetchParams.sort]);
  useEffect(() => {
    if (page > 1) {
      fetchingProductList(false);
    }
  }, [page]);
  // Fetching products of the category

  return (
    <>
      <View className="">
        {/* Breadcrumb */}
        <View className="flex-row bg-txtwhite items-center space-x-2 px-1 py-1.5 border-b border-gray-300 mb-1 ">
          <TouchableOpacity
            className="mx-1 px-1"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="caretleft" size={20} color="#515764" />
          </TouchableOpacity>
          <Text className="font-bold ms-2 text-12m ">
            {fetchParams.categoryName}
          </Text>
        </View>
        {/* Categories list */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="bg-txtwhite px-2 py-1 mb-1 w-full border-y-1"
          style={{
            height: 120,
          }}
          // contentContainerStyle={{paddingVertical: 20}}
        >
          {categoryData.data.list.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                className={`flex-column space-y-2 items-center p-2 pb-0 w-20 ${
                  item.id === fetchParams.categoryId
                    ? "border border-primary"
                    : ""
                }`}
                disabled={item.id === fetchParams.categoryId}
                onPress={() => {
                  updateFetchParams({
                    categoryId: item.id,
                    categoryName: item.name,
                    categroup: item.categroup,
                    brandId: "",
                  });
                }}
              >
                <Image
                  className="h-10 w-10 bg-contain bg-center"
                  src={item.thumbnail}
                />
                <Text className="text-center text-txtsecond text-10m w-100 mb-3">
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {/* Filter options */}
        <View className="flex-row items-center bg-txtwhite border-b border-gray-200 mb-1 ">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="bg-txtwhite px-2 py-2 w-full border-y-1 flex-row space-x-2 h-16"
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            {/* Sort */}
            <Menu>
              <MenuTrigger>
                <View className="flex-row items-center space-x-2 h-full rounded-md py-3 px-2 border border-gray-200 relative ">
                  <Text className="text-txtsecond text-13m">Sắp xếp</Text>
                  <AntDesign name="caretdown" size={16} color="black" />
                </View>
              </MenuTrigger>
              <MenuOptions>
                {sortList.map((item) => (
                  <MenuOption
                    key={item.id}
                    onSelect={() => {
                      updateFetchParams({
                        sort: item.query,
                      });
                    }}
                    text={item.name}
                  />
                ))}
              </MenuOptions>
            </Menu>
            {/* Price range - show popup */}
            <TouchableOpacity
              className="flex-row items-center space-x-2 rounded-md px-2 border border-gray-200"
              onPress={() => setVisible(true)}
            >
              <Text className="text-txtsecond text-13m">Thương hiệu</Text>
              <AntDesign name="caretdown" size={16} color="black" />
            </TouchableOpacity>
            {/* Danh sach thuong hieu */}
            {brandData.data.map((item) => (
              <TouchableOpacity
                key={item.brand_id}
                className={`w-20 h-full border-none rounded-md border border-gray-200 ${
                  item.brand_id === fetchParams.brandId
                    ? "border border-2 border-primary"
                    : ""
                }`}
                disabled={item.brand_id === fetchParams.brandId}
                onPress={() => {
                  updateFetchParams({
                    brandId: item.brand_id,
                  });
                }}
              >
                <Image
                  className="w-full h-full cover bg-center"
                  src={item.thumbnail_brand}
                ></Image>
              </TouchableOpacity>
            ))}
            <View className="w-28"></View>
          </ScrollView>
          {/* Filter Button */}
          <TouchableOpacity
            className="relative flex-column items-center justify-center w-12 h-12 ms-auto rounded-md bg-green-200 shadow-5 mx-1"
            onPress={openModal}
          >
            <AntDesign name="filter" size={20} color="black" />
            <Text className="text-txtsecond text-11m">Bộ Lọc</Text>
            {/* Indicator */}
            {(fetchParams.brandId || fetchParams.sort) && (
              <View className="absolute top-0 right-1 rounded-full w-4 h-4 bg-yellow-500 flex-row justify-center items-center">
                <Text className="font-bold text-11m">
                  {fetchParams.brandId && fetchParams.sort ? "2" : "1"}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* PRODUCT LIST */}
        {productList.loading && page === 1 ? (
          <View className="m-2">
            <ActivityIndicator size={"large"} color={Colors.primary} />
          </View>
        ) : (
          <FlatList
            className=""
            scrollEnabled={true}
            numColumns={3}
            // columnWrapperStyle={{ flex: 1 }}
            data={productList.data.products}
            renderItem={({ item, index }) => {
              // const newItem: productHomeInterface = {
              //   id: parseInt(item.product_id),
              //   thumbnail: item.thumbnail,
              //   name: item.name,
              //   reg_price: item.reg_price,
              //   discount_price: item.discount_price,
              //   discount_percent: item.discount_percent,
              //   canonical: item.canonical,
              //   rating: parseInt(item.rating),
              // };
              return (
                <View className="w-1/3 mb-1 px-0.5">
                  <Product {...item} />
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              productList.loading ? (
                <View className="m-2" style={{ height: 300 }}>
                  <ActivityIndicator size={"large"} color={Colors.primary} />
                </View>
              ) : (
                <View style={{ height: 300 }}>
                  <Text className="text-center pt-2">
                    Không còn sản phẩm để hiển thị
                  </Text>
                </View>
              )
            }
            // onEndReachedThreshold={0.5}
            onEndReached={() => {
              // stop fetching when reaching this
              if (productList.data.currentPage < productList.data.numOfPages)
                setPage((prevPage) => prevPage + 1);
            }}
          />
        )}
      </View>

      {/* Modal */}
      <Modal visible={visiable} className=" flex-col">
        <View className="w-full h-12 bg-primary border-b border-gray-200"></View>
        {/* Header */}
        <View className="flex-row items-center bg-txtwhite p-2 mb-1 border border-gray-200">
          <Text className="text-15m font-bold">Bộ lọc</Text>
          <TouchableOpacity
            className="ml-auto"
            onPress={() => setVisible(false)}
          >
            <AntDesign name="closecircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* Scrollview */}
        <ScrollView className="flex-1 mx-2">
          <View className="filterblock mb-3">
            <Text className="font-bold mb-1">Chọn thương hiệu</Text>
            <View className="flex-row items-center space-x-1">
              {brandData.data.map((item) => (
                <View className="w-1/5 h-12 px-1 mb-1" key={item.brand_id}>
                  <TouchableOpacity
                    className={`w-full h-full border-none rounded-md border border-gray-200 ${
                      item.brand_id === tempParams.brandId
                        ? "border-primary border-2"
                        : ""
                    }`}
                    onPress={() => {
                      setTempParams({
                        brandId: item.brand_id,
                        sort: tempParams.sort,
                      });
                    }}
                  >
                    <Image
                      className="w-full h-full contain bg-center"
                      src={item.thumbnail_brand}
                    ></Image>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View className="filterblock">
            <Text className="font-bold mb-1">Sắp xếp</Text>
            <View className="flex-row flex-wrap">
              {sortList.map((item) => (
                <View className="w-1/2 mb-2 px-1" key={item.id}>
                  <TouchableOpacity
                    className={`h-12 border border-gray-200 rounded-sm flex-row items-center justify-center ${
                      item.query === tempParams.sort ? "border-primary" : ""
                    }`}
                    onPress={() => {
                      setTempParams({
                        brandId: tempParams.brandId,
                        sort: item.query,
                      });
                    }}
                  >
                    <Text className="">{item.name}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        {/* Footer */}
        <View className="mt-auto flex-row space-x-3 px-2 my-1">
          <TouchableOpacity
            className="border py-2 flex-row items-center justify-center border-primary bg-txtwhite rounded-sm text-center w-1/3"
            onPress={removeFilter}
          >
            <Text className="text-15m text-primary">Xoá lọc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border py-2 flex-row items-center justify-center border-none bg-primary text-white flex-1 rounded-sm text-center"
            onPress={applyModal}
          >
            <Text className="text-15m text-txtwhite">Áp dụng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({});
