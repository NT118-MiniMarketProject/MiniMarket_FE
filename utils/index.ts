import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

// Variables
export const tenmien1: string = "http://localhost:8000";
export const tenmien: string = "https://minimarket-be.onrender.com/api/v1";
// export const tenmien: string = "localhost";
export const ngrok: string = "https://b004-171-243-48-12.ngrok-free.app" //cai nay de chay cai php backend, url thay doi moi lan start ngrok

export interface categoryGroupInterface {
  id: number;
  name: string;
  thumbnail: string;
}

export interface categoryInterface extends categoryGroupInterface {
  categroup: number
}

export interface productHomeInterface {
  // product xuat hien o home, khong can thong tin ve brand
  id: number;
  name: string;
  thumbnail: string;
  reg_price: number;
  discount_price: number;
  discount_percent?: number;
  rating: number;
  numOfRatings?: number;
  category_name?: string;
  canonical?: string | null;
}

export interface productHomeBEInterface {
  product_id: string;
  thumbnail: string;
  name: string;
  reg_price: number;
  discount_percent: number;
  discount_price: number;
  quantity: number;
  unit: string;
  canonical: string | null;
  description: string;
  created_at: string; // ISO date string
  updated_at: string | null; // ISO date string or null
  deleted: boolean;
  rating: string;
  c_id: string;
  br_id: string;
  event_percent: number;
  event_price: number;
  is_visible: string;
  is_feature: string;
}


// export interface productHomeBEInterface extends productHomeInterface{

// }

// đây là interface dữ liệu json backend trả về, nó bị khác với base của mình
export interface categoryBEInterface {
  category_id: string;
  thumbnail_category: string;
  categroup: number;
  category_name: string;
}


export interface productInfoInterface extends productHomeInterface {
  galleries: {
    gallery_id: number, 
    thumbnail_gallery: string,
    prod_gall_id: string,
    sort: number
  }[]
}

// Functions
export function priceFormatter(price: number): string {
  return price.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}
export function getNewSearchParamString(
  key: string,
  value: string,
  searchParams: string
) {
  const sp = new URLSearchParams(searchParams);
  if (!value) {
    sp.delete(key);
  } else {
    sp.set(key, value);
  }
  return `?${sp.toString()}`;
}

export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} vào ${hours}:${minutes}`;
}

export function statusConvert(stat: string): string {
  switch (stat) {
    case "pending":
      return "Chờ xử lý";
    case "processing":
      return "Đang xử lý";
    case "shipped":
      return "Đang giao";
    case "delivered":
      return "Đã giao";
    case "cancelled":
      return "Đã huỷ";
  }
  return "Không rõ";
}

// Thunk patterns
export const fetchingDataFromApi = async (url: string) => {
  // return async (dispatch){
  //     const fetchHandler = async () => {

  //     }
  // }
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error();
  }
};
// For storing utils function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = 1000
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    // ..args: rest contains all parameters as an alike array
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      // apply call the function as normally but seperate the args into vars
      func.apply(null, args);
    }, delay);
  };
};

//dummy data
export const dummyProduct = [
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

export const dummyCategoryGroup = [
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