import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import {
  categoryGroupInterface,
  productHomeInterface,
  tenmien,
} from "../../utils";
import axios from "axios";
import Toast, { ToastOptions } from "react-native-root-toast";
import { Icon, toastConfig } from "../styles";
import Product from "../Common/Product";
import { TouchableOpacity } from "react-native-gesture-handler";

const defaultErrMsg = "Ops! There's something wrong, try again later";
const dummyProduct = [
  {
    id: 1,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/319229/bhx/nac-dam-heo-nhap-khau-500g-hat-nem-nam-huong-maggi-450g-dong-lanh-500g-202311201507328081.jpg",
    name: "Nạc dăm heo nhập khẩu 500g & hạt nêm nấm hương Maggi 450g",
    reg_price: 105500,
    discount_percent: 60,
    discount_price: 42200,
    canonical: null,
    quantity: 69,
    remaining: 3,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
    numOfRatings: 10,
  },
  {
    id: 2,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/319228/bhx/ba-roi-heo-nhap-khau-dong-lanh-500g-hat-nem-maggi-400g-202311201604013696.jpg",
    name: "Ba rọi heo nhập khẩu 500g & hạt nêm Maggi 400g",
    reg_price: 111500,
    discount_percent: 15,
    discount_price: 94775,
    canonical: "",
    quantity: 76,
    remaining: 3,
    rating: 4.3,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
  },
  {
    id: 4,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/314535/bhx/ba-roi-heo-nhap-khau-dong-lanh-300g-202309072143306697.jpg",
    name: "Ba rọi heo nhập khẩu đông lạnh 300g",
    reg_price: 40000,
    discount_percent: 0,
    discount_price: 40000,
    canonical: "300g",
    quantity: 16,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
    numOfRatings: 5,
  },
  {
    id: 5,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/298878/bhx/nac-dam-heo-nhap-khau-dong-lanh-tui-200g-202212060825395663.jpg",
    name: "Nạc dăm heo nhập khẩu 200g",
    reg_price: 29000,
    discount_percent: 0,
    discount_price: 29000,
    canonical: "200g",
    quantity: 71,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
    numOfRatings: 12,
  },
  {
    id: 6,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/297350/bhx/nac-dam-heo-nhap-khau-dong-lanh-tui-500g-202211111014371522.jpg",
    name: "Nạc dăm heo nhập khẩu 500g",
    reg_price: 52000,
    discount_percent: 0,
    discount_price: 52000,
    canonical: "500g",
    quantity: 5,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
  },
  {
    id: 7,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/307864/bhx/thit-vai-heo-nhap-khau-dong-lanh-200g-202306090845057118.jpg",
    name: "Thịt vai heo nhập khẩu 200g",
    reg_price: 25000,
    discount_percent: 0,
    discount_price: 25000,
    canonical: "200g",
    quantity: 14,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
    numOfRatings: 3,
  },
  {
    id: 8,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/297351/bhx/thit-vai-heo-nhap-khau-dong-lanh-500gr-202306090843334771.jpg",
    name: "Thịt vai heo nhập khẩu 500g",
    reg_price: 75500,
    discount_percent: 0,
    discount_price: 75500,
    canonical: "500g",
    quantity: 51,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
  },
  {
    id: 9,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/312808/bhx/thit-nac-heo-nhap-khau-dong-lanh-200g-202311131505049353.jpg",
    name: "Thịt nạc heo đông lạnh 200g",
    reg_price: 25000,
    discount_percent: 0,
    discount_price: 25000,
    canonical: "200g",
    quantity: 13,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
  },
  {
    id: 10,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/312803/bhx/thit-nac-heo-nhap-khau-dong-lanh-500g-202308090936560456.jpg",
    name: "Thịt nạc heo đông lạnh 500g",
    reg_price: 59000,
    discount_percent: 0,
    discount_price: 59000,
    canonical: "500g",
    quantity: 13,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
    numOfRatings: 7,
  },
  {
    id: 11,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/314539/bhx/suon-non-heo-nhap-khau-dong-lanh-300g-202311131512332166.jpg",
    name: "Sườn non heo nhập khẩu đông lạnh 300g",
    reg_price: 46000,
    discount_percent: 0,
    discount_price: 46000,
    canonical: "300g",
    quantity: 23,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
    numOfRatings: 5,
  },
  {
    id: 13,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/310663/bhx/thit-heo-xay-200g-202310201709376275.jpg",
    name: "Thịt heo xay 200g",
    reg_price: 20000,
    discount_percent: 0,
    discount_price: 20000,
    canonical: "200g",
    quantity: 15,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
  },
  {
    id: 15,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/309992/bhx/-202311061348346522.jpg",
    name: "2 túi xương que heo đông lạnh 500g",
    reg_price: 78000,
    discount_percent: 0,
    discount_price: 78000,
    canonical: "1kg",
    quantity: 59,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
    numOfRatings: 22,
  },
  {
    id: 17,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/297346/bhx/chan-gio-heo-nhap-khau-dong-lanh-500g-3-5-mieng-202306090841143145.jpg",
    name: "Chân giò heo nhập khẩu 500g",
    reg_price: 35000,
    discount_percent: 29,
    discount_price: 24850,
    canonical: "500g",
    quantity: 70,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
    numOfRatings: 9,
  },
  {
    id: 18,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/310966/bhx/thit-ba-roi-heo-rung-lai-250g-202308051537117960.jpg",
    name: "Thịt ba rọi heo rừng lai 250g",
    reg_price: 95000,
    discount_percent: 10,
    discount_price: 85500,
    canonical: "250g",
    quantity: 74,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
    numOfRatings: 2,
  },
  {
    id: 19,
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/12718/308126/bhx/thit-kho-trung-cut-300g-202308281045510922.jpg",
    name: "Thịt kho trứng cút 300g",
    reg_price: 49000,
    discount_percent: 0,
    discount_price: 49000,
    canonical: "300g",
    quantity: 59,
    remaining: null,
    rating: 5,
    category_name: "Thịt heo",
    category_id: 1,
    brand_id: 1,
    numOfRatings: 32,
  },
];

interface HomeProductBlockProps {
  categoryGroupId: categoryGroupInterface["id"];
  categoryGroupName: categoryGroupInterface["name"];
}

const HomeProductBlock: React.FC<HomeProductBlockProps> = ({
  categoryGroupId,
  categoryGroupName,
}) => {
  const [products, setProducts] = useState<productHomeInterface[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${tenmien}/api/danhmuc/${categoryGroupId}`
        );
        const data = response.data;
        console.log({ data });
      } catch (e) {
        console.log(e);
        // Toast.show(defaultErrMsg, toastConfig as ToastOptions);
        setProducts(dummyProduct);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View
      className="flex-row w-full flex-wrap pt-10 relative border-t-2 mt-14"
      style={{ backgroundColor: "#F5FDFF", borderColor: "#00B906" }}
    >
      <View
        className="flex-row absolute justify-center items-center left-0 right-0"
        style={{ top: -20 }}
      >
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderRightWidth: 15,
            borderTopWidth: 18.5,
            alignSelf: "flex-start",
            borderRightColor: "#005C03",
            borderTopColor: "transparent",
          }}
        />
        <Text
          className="py-1 px-3 rounded-b-lg text-lg text-white font-semibold"
          style={{
            backgroundColor: "#00B906",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          {categoryGroupName}
        </Text>
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderLeftWidth: 15,
            borderTopWidth: 18.5,
            alignSelf: "flex-start",
            borderLeftColor: "#005C03",
            borderTopColor: "transparent",
          }}
        />
      </View>
      {products.map((product, index) => (
        <View className="w-1/3 mb-1 px-0.5" key={index}>
          <Product {...product} key={product.id} />
        </View>
      ))}

      {/* Xem thêm */}
      <TouchableOpacity className="flex-row justify-center items-center bg-green-200 py-3 min-w-full mt-3">
        <Text>Xem thêm </Text>
        <Text className="font-semibold">{categoryGroupName}</Text>
        <Icon
          name="chevron-forward-outline"
          size={18}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeProductBlock;

const styles = StyleSheet.create({});
