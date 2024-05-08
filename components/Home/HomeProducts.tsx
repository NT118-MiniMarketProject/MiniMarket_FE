import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Product from "../Common/Product";
import { categoryGroupInterface, tenmien } from "../../utils";
import axios from "axios";
import HomeProductBlock from "./HomeProductBlock";

const dummyCategoryGroup = [
  {
    id: 1,
    name: "THỊT, CÁ, TRỨNG, HẢI SẢN",
    thumbnail:
      "https://genk.mediacdn.vn/k:thumb_w/640/2016/protein-foods-1000-1471225685968/thitcatrungsualamthenaodechonduocnguonproteinlanhmanh.jpg",
  },
  {
    id: 2,
    name: "RAU, CỦ, NẤM, TRÁI CÂY",
    thumbnail:
      "https://pqm.vn/wp-content/uploads/2021/02/dong-nam-a-nhung-loai-trai-cay-va-rau-tuoi-ngon-hap-dan-151.jpg",
  },
  {
    id: 3,
    name: "DẦU ĂN, NƯỚC CHẤM, GIA VỊ",
    thumbnail:
      "https://www.tuongan.com.vn/public/themes/tuongan//img/sanpham-banner-4.png",
  },
  {
    id: 4,
    name: "KEM, THỰC PHẨM ĐÔNG MÁT",
    thumbnail:
      "https://www.pricechopper.com/wp-content/uploads/2023/02/r3_022623_FrozenFoodMonth_montage.png",
  },
];

export default function HomeProducts() {
  const [categoryGroups, setCategoryGroups] = useState<
    categoryGroupInterface[]
  >([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCategoryGroups = async () => {
      try {
        const response = await axios.get(`${tenmien}/api/danhmuc`);
        const data = response.data;
        console.log({ data });
      } catch (e) {
        console.log(e);
        // Toast.show(defaultErrMsg, toastConfig as ToastOptions);
        setCategoryGroups(dummyCategoryGroup);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCategoryGroups();
  }, []);

  return (
    <View className="mb-4 bg-transparent">
      {categoryGroups.map((categoryGroup) => (
        <HomeProductBlock
          categoryGroupId={categoryGroup.id}
          categoryGroupName={categoryGroup.name}
          key={categoryGroup.id}
        />
      ))}
    </View>
  );
}
