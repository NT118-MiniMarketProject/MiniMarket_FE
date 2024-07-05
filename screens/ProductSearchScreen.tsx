import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../utils/types";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../store";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { productHomeInterface } from "../utils";
import Product from "../components/Common/Product";
import {
  clearData,
  fetchCategoryProducts,
} from "../store/features/Products/productListSlice";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";

type ProductListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ProductSearchScreen"
>;

const ProductSearchScreen = ({ route }: ProductListScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const categoryData = useAppSelector((state) => state.category);
  const brandData = useAppSelector((state) => state.brand);
  const productList = useAppSelector((state) => state.productList);
  const [flag, setFlag] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [fetchParams, setFetchParams] = useState<{
    isSale: boolean;
    search: string;
    sort: string;
  }>({
    isSale: false,
    search: "",
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
  const removeFilter = () => {
    updateFetchParams({ sort: "" });
    setVisible(false);
  };
  const fetchingProductList = (reset: boolean) => {
    let currentPage = page;
    if (reset) {
      dispatch(clearData());
      currentPage = 1;
    }
    let query = `search=${fetchParams.search.trim()}&sort=${
      fetchParams.sort
    }&page=${currentPage}`;
    if (fetchParams.isSale) query += `keyword=sales`;
    console.log(query);
    dispatch(fetchCategoryProducts(query));
  };
  useEffect(() => {
    if (isFocusced) {
      const { isSale, search } = route?.params ?? {};
      updateFetchParams({ isSale, search });
      setFlag(true);
    }
  }, [isFocusced]);

  useEffect(() => {
    if (flag) {
      setPage(1);
      fetchingProductList(true);
    }
  }, [fetchParams.isSale, fetchParams.search, fetchParams.sort]);

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
          <Text className="font-bold ms-2 text-12m whitespace-nowrap">
            {fetchParams.isSale
              ? "Khuyến mãi"
              : `Tìm thấy ${productList.data?.totalProducts} kết quả với "${fetchParams?.search}"`}
          </Text>
        </View>

        {/* Filter options */}
        <View className="flex-row items-center justify-between bg-txtwhite border-b border-gray-200 mb-1 px-1.5 py-0.5 ">
          {/* Sort */}
          <Menu>
            <MenuTrigger>
              <View className="flex-row items-center space-x-2 rounded-md py-3 px-2 border border-gray-200">
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
          {/* Remove  Button */}
          <TouchableOpacity
            className="relative flex-column items-center justify-center w-12 h-12 ms-auto rounded-md bg-green-200 shadow-5 mx-1"
            onPress={removeFilter}
          >
            <Ionicons name="remove-circle-outline" size={20} color="black" />
            <Text className="text-txtsecond text-11m">Xoá lọc</Text>
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
                <View className="m-2" style={{ height: 200 }}>
                  <ActivityIndicator size={"large"} color={Colors.primary} />
                </View>
              ) : (
                <View style={{ height: 200 }}>
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
    </>
  );
};

export default ProductSearchScreen;

const styles = StyleSheet.create({});
