import { Dimensions } from "react-native";
import { io } from "socket.io-client";

// Variables
export const tenmien: string = "https://minimarket-be.onrender.com/api/v1";
// export const tenmien: string = "localhost";
export const ngrok: string = "https://b004-171-243-48-12.ngrok-free.app"; //cai nay de chay cai php backend, url thay doi moi lan start ngrok

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;

export const socket = io(tenmien);

export interface categoryGroupInterface {
  id: number;
  name: string;
  thumbnail: string;
}

export interface categoryInterface extends categoryGroupInterface {
  categroup: number;
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
  event_percent: number | null;
  event_price: number | null;
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

export interface categoryGroupBEInterface {
  categroup_id: number;
  categroup_name: string;
  thumbnail: string;
}

export interface productDetailInterface extends productHomeBEInterface {
  galleries: productGalleryInterface[];
}

export interface productGalleryInterface {
  gallery_id: number;
  thumbnail_gallery: string;
  prod_gall_id: string; //id của sản phẩm
  sort: number;
}

export interface orderInterface {
  order_id: string;
  address: string;
  total: number;
  note?: string | null;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  payment_method: string;
  created_at: string;
  orderitems: orderItemInterface[];
}

export const orderStatusArr = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;
export type OrderStatus = (typeof orderStatusArr)[number];

export interface orderItemInterface {
  orderitem_id: number;
  price: number;
  quantity: number;
  total: number;
  fromEvent: number;
  IsReview: true | null;
  products: productOrderInterface;
}

interface productOrderInterface {
  product_id: string;
  thumbnail: string;
  name: string;
  reg_price: number;
  discount_price: number;
}

export interface productReviewInterface {
  reviewId: number;
  rating: string;
  title: string;
  comment: string | null;
  created_at: string;
  user_avater: string | null;
  user_name: string;
  userId: string;
  productId: string;
}

// Functions
export function priceFormatter(price: number): string {
  if (price) {
    return price.toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });
  }
  return "0";
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
  stat = stat.toLowerCase();
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

export function paymentMethodConvert(stat: string): string {
  switch (stat) {
    case "Cash":
      return "Tiền mặt";
    default:
      return "Không rõ";
  }
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
export const dummyProduct: productHomeBEInterface[] = [
  {
    product_id: "1127",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8400/240445/bhx/sellingpoint.jpg",
    name: "Nghêu lụa đông lạnh Mama Food 200g",
    reg_price: 37000,
    discount_percent: 0,
    discount_price: 37000,
    quantity: 15,
    unit: "gói",
    canonical: "200g",
    description:
      "Hải sản đông lạnh Mama Food thương hiệu hải sản đông lạnh có giá trị dinh dưỡng cao, thơm ngon, hỗ trợ chữa được nhiều bệnh như tiểu đường, suy tinh, ho đàm, nóng nhiệt. Nghêu lụa đông lạnh Mama Food gói 200g tiện lợi chế biến thành các món hấp dẫn như hấp sả, canh nghêu, xào tỏi, dồn thịt sốt cà",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "14",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1128",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8400/239251/bhx/ngheu-lua-dong-lanh-tran-gia-khay-200g-202202170937065928.jpg",
    name: "Nghêu lụa đông lạnh Trần Gia 200g",
    reg_price: 40000,
    discount_percent: 0,
    discount_price: 40000,
    quantity: 14,
    unit: "khay",
    canonical: "200g",
    description:
      "Hải sản đông lạnh chất lượng từ hải sản đông lạnh Trần Gia. Giá trị dinh dưỡng cao, thơm ngon và được nhiều người ưa thích, ngoài ra còn có công dụng hỗ trợ một số bệnh, tốt cho sức khỏe. Nghêu lụa Trần Gia 200g tiện lợi chế biến thành các món hấp dẫn như hấp sả, canh nghêu, dồn thịt sốt cà,...",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "15",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1129",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8400/239254/bhx/sellingpoint.jpg",
    name: "Càng ghẹ đông lạnh Trần Gia 200g",
    reg_price: 136000,
    discount_percent: 0,
    discount_price: 136000,
    quantity: 27,
    unit: "khay",
    canonical: "200g",
    description:
      "Hải sản đông lạnh chất lượng từ hải sản đông lại Trần Gia. Là loại thực phẩm có hàm hàm lượng protein cao hơn nhiều so với thịt heo hay cá, dồi dào canxi, photpho, sắt và các vitamin A, B1, B2, C,…Càng ghẹ đông lạnh Trần Gia khay 200g tươi ngon chứa một lượng lớn omega 3, rất tốt cho tim mạch",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "15",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1130",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8400/239247/bhx/sellingpoint.jpg",
    name: "Lườn cá hồi đông lạnh Trần Gia 500g",
    reg_price: 70000,
    discount_percent: 0,
    discount_price: 70000,
    quantity: 90,
    unit: "khay",
    canonical: "500g",
    description:
      "Hải sản đông lạnh chất lượng từ hải sản đông lạnh Trần Gia. Lườn cá hồi đông lạnh Trần Gia khay 500g với thành phần lườn cá hồi 100% tươi ngon, giàu omega 3 tốt cho sức khỏe, không chất bảo quản được làm sạch và đóng gói kín đáo, an toàn tiện lợi chế biến thành nhiều món ăn ngon",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "15",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1131",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8400/239256/bhx/ca-trung-dong-lanh-tran-gia-khay-200g-202304050914190689.jpg",
    name: "Cá trứng đông lạnh Trần Gia 200g",
    reg_price: 44000,
    discount_percent: 0,
    discount_price: 44000,
    quantity: 70,
    unit: "khay",
    canonical: "",
    description:
      "Cá đông lạnh chất lượng từ cá đông lạnh Trần Gia. Cá trứng đông lạnh Trần Gia khay 200g từ nguồn nguyên liệu nhập khẩu châu Âu thơm ngon và giàu dinh dưỡng, có thể chế biến ra nhiều món ăn thơm khó cưỡng như chiên giòn, nướng muối ớt hay sốt cà chua,...",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "15",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1132",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8400/200150/bhx/hai-san-ngu-sac-sg-food-goi-300g-202209070906590945.jpg",
    name: "Hải sản ngũ sắc đông lạnh SG Food 300g",
    reg_price: 48000,
    discount_percent: 0,
    discount_price: 48000,
    quantity: 78,
    unit: "gói",
    canonical: "",
    description:
      "Thịt cá đông lạnh chất lượng từ thương hiệu thịt cá đông lạnh SG Food. Với thành phần gồm tôm, mực/bạch tuộc, cá/cồi điệp cùng gói gia vị cô đặc và các loại rau củ. Hải sản ngũ sắc SG Food gói 300g tiện lợi chế biến thành những món ngon hấp dẫn nhiều dinh dưỡng như xào, chiên cơm,...",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "16",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1133",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8400/244643/bhx/ca-hoi-phi-le-sg-food-khay-200g-202302081034475715.jpg",
    name: "Cá hồi phi lê đông lạnh SG Food 200g",
    reg_price: 110000,
    discount_percent: 0,
    discount_price: 110000,
    quantity: 79,
    unit: "khay",
    canonical: "",
    description:
      "Được tuyển chọn từ những con cá hồi nhập khẩu từ Nhật Bản giữ nguyên vị tươi ngon chắc thịt, Cá hồi phi lê SG Food khay 200g là một trong những lựa chọn tuyệt vời cho khách hàng đến từ cá đông lạnh SG Food. Đây là loại cá đông lạnh mang đến hương vị thơm ngon và cung cấp dinh dưỡng dồi dào.",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "16",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1134",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8400/240011/bhx/sellingpoint.jpg",
    name: "Cá trứng một nắng đông lạnh SG Food 410g",
    reg_price: 100000,
    discount_percent: 0,
    discount_price: 100000,
    quantity: 62,
    unit: "khay",
    canonical: "410g",
    description:
      "Cá đông lạnh chất lượng từ cá đông lạnh SG Food mang đến cho bạn những bữa ăn ngon mỗi ngày. Sản phẩm cá trứng không tẩm SG Food khay 250g từ nguồn nguyên liệu cá trứng tươi ngon, bên trong chứa đầy ắp trứng có hương vị thơm ngọt, bùi béo và dinh dưỡng chất lượng.",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "16",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1135",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8791/244636/bhx/sellingpoint.jpg",
    name: "Cá hồi phi lê tiêu xanh SG Food 300g",
    reg_price: 117000,
    discount_percent: 0,
    discount_price: 117000,
    quantity: 69,
    unit: "khay",
    canonical: "300g",
    description:
      "Được tuyển chọn từ những con cá hồi nhập khẩu từ Nhật Bản kết hợp với xốt tiêu xanh, cá hồi phi lê xốt tiêu xanh SG Food khay 300g là một trong những lựa chọn tuyệt vời cho khách hàng đến từ thực phẩm tẩm ướp SG Food. Đây là loại thực phẩm làm sẵn mang đến hương vị thơm ngon và cung cấp dinh dưỡng dồi dào.",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "16",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1136",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8791/244644/bhx/-202210121054325504.jpg",
    name: "Cá saba na uy tẩm muối ớt SG Food 400g",
    reg_price: 83500,
    discount_percent: 0,
    discount_price: 83500,
    quantity: 60,
    unit: "gói",
    canonical: "",
    description:
      "Với nguồn nguyên liệu được đánh bắt từ vùng biển lạnh Na Uy, cá saba Na Uy tẩm muối ớt SG Food gói 400g có phần thịt trắng mềm béo kết hợp với vị muối ớt đặc trưng làm tăng thêm vị thơm ngon, đến từ thương hiệu thực phẩm tẩm ướp SG Food. Loại thực phẩm làm sẵn này cung cấp nguồn dinh dưỡng dồi dào.",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "16",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1137",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8791/222393/bhx/sellingpoint.jpg",
    name: "Cá saba tiêu xanh SG Food 500g",
    reg_price: 76000,
    discount_percent: 0,
    discount_price: 76000,
    quantity: 90,
    unit: "gói",
    canonical: "500g",
    description:
      "Là sản phẩm thực phẩm chế biến sẵn vô cùng tiện lợi và thơm ngon đến từ thương hiệu thực phẩm tẩm ướp SG Food quen thuộc với người dùng. Cá saba tẩm tiêu xanh SG Food gói 500g được làm từ cá saba nguyên con được tẩm ướp tiêu xanh thơm nồng đậm đà, giúp người dùng chế biến nhanh chóng.\\r\\n",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "16",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1138",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8791/240006/bhx/sellingpoint.jpg",
    name: "Cá trứng tẩm gia vị SG Food 250g",
    reg_price: 51000,
    discount_percent: 0,
    discount_price: 51000,
    quantity: 72,
    unit: "gói",
    canonical: "250g",
    description:
      "Hải sản tẩm ướp chất lượng từ thực phẩm tẩm ướp SG Food. Cá trứng tẩm gia vị SG Food khay 250g từ nguồn nguyên liệu nhập khẩu chất lượng, với hương vị thơm ngọt, bùi béo và dinh dưỡng, được tẩm ướp sẵn cùng các loại gia vị thích hợp có thể chế biến ra nhiều món ăn thơm khó cưỡng",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "16",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1139",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8791/222894/bhx/ca-saba-tam-sa-te-sg-food-goi-600g-202210121044287081.jpg",
    name: "Cá saba tẩm sa tế SG Food gói 600g",
    reg_price: 92000,
    discount_percent: 30,
    discount_price: 64400,
    quantity: 86,
    unit: "gói",
    canonical: "",
    description:
      "Là sản phẩm thực phẩm chế biến sẵn vô cùng tiện lợi và thơm ngon đến từ thương hiệu thực phẩm làm sẵn SG Food quen thuộc với người dùng. Cá saba tẩm sa tế SG Food gói 600g được làm từ cá saba nguyên con được tẩm ướp sa tế cay thơm, đậm đà, giúp người dùng chế biến nhanh chóng.",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "16",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1140",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8400/212203/bhx/que-surimi-huong-vi-cua-akira-3n-foods-goi-250g-202203182245025430.jpg",
    name: "Thanh surimi vị cua 3N Akira 250g",
    reg_price: 60000,
    discount_percent: 30,
    discount_price: 42000,
    quantity: 13,
    unit: "gói",
    canonical: "250g",
    description:
      "Hải sản đông lạnh thương hiệu 3N Food gồm surimi, tinh bột khoai mì, lòng trắng trứng, chiết xuất cua, hương cua tổng hợp, dầu thực vật, chất điều vị, màu thực phẩm tổng hợp. Que surimi hương cua 3N Foods Arika gói 250g có thể dùng để làm món cơm chiên, mì xào, lẩu, sushi,...vô cùng thơm ngon",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "80",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "1140",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8400/212203/bhx/que-surimi-huong-vi-cua-akira-3n-foods-goi-250g-202203182245025430.jpg",
    name: "Thanh surimi vị cua 3N Akira 250g",
    reg_price: 60000,
    discount_percent: 30,
    discount_price: 42000,
    quantity: 13,
    unit: "gói",
    canonical: "250g",
    description:
      "Hải sản đông lạnh thương hiệu 3N Food gồm surimi, tinh bột khoai mì, lòng trắng trứng, chiết xuất cua, hương cua tổng hợp, dầu thực vật, chất điều vị, màu thực phẩm tổng hợp. Que surimi hương cua 3N Foods Arika gói 250g có thể dùng để làm món cơm chiên, mì xào, lẩu, sushi,...vô cùng thơm ngon",
    created_at: "2023-12-02T05:36:44.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "32",
    br_id: "80",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
];

export const dummyPoductDetail: productDetailInterface = {
  product_id: "123",
  thumbnail:
    "https://cdn.tgdd.vn/Products/Images/8790/305707/bhx/sun-uc-ga-cp-500g-202304081432374341.jpg",
  name: "Sụn ức gà C.P 500g",
  reg_price: 59000,
  discount_percent: 0,
  discount_price: 59000,
  quantity: 44,
  unit: "khay",
  canonical: "500g",
  description:
    "Sụn gà 500g được đóng gói và bảo quản theo những tiêu chuẩn nghiêm ngặt về vệ sinh và an toàn thực phẩm, đảm bảo về chất lượng, độ tươi và ngon của thực phẩm, xuất xứ rõ ràng. Sụn gà ăn có độ sựt, giòn còn thịt bám trên sụn thường dùng để chế biến món sụn gà lăn bột chiên giòn.",
  created_at: "2023-11-28T06:58:24.000Z",
  updated_at: "2024-07-03T09:41:15.436Z",
  deleted: false,
  rating: "5",
  c_id: "3",
  br_id: "2",
  event_percent: null,
  event_price: null,
  is_visible: "1",
  is_feature: "0",
  galleries: [
    {
      gallery_id: 1143,
      thumbnail_gallery:
        "https://cdn.tgdd.vn/Products/Images/8790/305707/bhx/sun-uc-ga-cp-500g-202304081432374341.jpg",
      prod_gall_id: "123",
      sort: 1143,
    },
    {
      gallery_id: 1144,
      thumbnail_gallery:
        "https://cdn.tgdd.vn/Products/Images/8790/305707/bhx/sun-uc-ga-cp-500g-202304081430448009.jpg",
      prod_gall_id: "123",
      sort: 1144,
    },
    {
      gallery_id: 1145,
      thumbnail_gallery:
        "https://cdn.tgdd.vn/Products/Images/8790/305707/bhx/sun-uc-ga-cp-500g-202304081430453997.jpg",
      prod_gall_id: "123",
      sort: 1145,
    },
    {
      gallery_id: 1146,
      thumbnail_gallery:
        "https://cdn.tgdd.vn/Products/Images/8790/305707/bhx/sun-uc-ga-cp-500g-202304081430469065.jpg",
      prod_gall_id: "123",
      sort: 1146,
    },
    {
      gallery_id: 1147,
      thumbnail_gallery:
        "https://cdn.tgdd.vn/Products/Images/8790/305707/bhx/sun-uc-ga-cp-500g-202304081430471759.jpg",
      prod_gall_id: "123",
      sort: 1147,
    },
  ],
};

export const dummyProductRelevant: productHomeBEInterface[] = [
  {
    product_id: "103",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8790/314819/bhx/bo-cau-nguyen-con-235g-202309091633201427.jpg",
    name: "Bồ câu nguyên con 235g",
    reg_price: 99000,
    discount_percent: 10,
    discount_price: 89100,
    quantity: 96,
    unit: "con",
    canonical: "235g",
    description:
      "Bồ câu nguyên con được làm sạch sẵn, khi mua về chỉ cần rửa sạch và mang đi chế biến thành nhiều món ăn ngon. Bồ câu là một trong những thực phẩm vô cùng dinh dưỡng, tốt cho sức khỏe,...",
    created_at: "2023-11-28T05:59:36.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "3",
    br_id: "1",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "113",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8790/312248/bhx/ma-dui-ga-cp-500g-xuong-que-heo-nhap-khau-dong-lanh-500g-202308010932272542.jpg",
    name: "Má đùi gà C.P 500g",
    reg_price: 39500,
    discount_percent: 0,
    discount_price: 39500,
    quantity: 75,
    unit: "khay",
    canonical: "500g",
    description:
      "Combo Má Đùi Gà CP 500G & xương que heo đông lạnh 500g là sản phẩm thích hợp cho mọi gia đình. Thịt gà, thịt heo là những nguyên liệu không thể thiếu trong mỗi bữa ăn, có thể chiên, kho, nấu súp,... giúp bữa ăn đa dạng và cung cấp đầy đủ dinh dưỡng cho cơ thể",
    created_at: "2023-11-28T06:58:24.000Z",
    updated_at: "2024-07-02T22:15:55.021Z",
    deleted: false,
    rating: "5",
    c_id: "3",
    br_id: "2",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "115",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8790/312259/bhx/dui-toi-ga-cp-500g-xuong-que-heo-nhap-khau-dong-lanh-500g-202308011009319424.jpg",
    name: "Đùi tỏi gà C.P 500g",
    reg_price: 58000,
    discount_percent: 0,
    discount_price: 58000,
    quantity: 70,
    unit: "khay",
    canonical: "500g",
    description:
      "Combo Đùi Tỏi Gà CP 500G & xương que heo đông lạnh 500g là nguyên liệu cần thiết cho mọi bữa ăn. Thịt gà, thịt heo cung cấp nhiều chất dinh dưỡng cho cơ thể. Có thể chế biến thịt theo nhiều cách như chiên, kho, nấu súp,.. giúp bữa ăn thêm đa dạng.",
    created_at: "2023-11-28T06:58:24.000Z",
    updated_at: "2024-07-03T09:45:57.555Z",
    deleted: false,
    rating: "5",
    c_id: "3",
    br_id: "2",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "117",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8790/239602/bhx/long-ga-cp-500g-202309231804393522.jpg",
    name: "Lòng gà C.P 500g",
    reg_price: 42500,
    discount_percent: 0,
    discount_price: 42500,
    quantity: 76,
    unit: "khay",
    canonical: "500g",
    description:
      "Lòng gà được sản xuất trên dây chuyền khép kín, an toàn vệ sinh thực phẩm. Lòng gà tươi sạch C.P khay 500g gồm gan, tim, mề là bộ phận ngon và nhiều chất dinh dưỡng của con gà. Sản phẩm có 2 mã QR để khách hàng có thể truy xuất nguồn gốc thịt, vô cùng an tâm",
    created_at: "2023-11-28T06:58:24.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "3",
    br_id: "2",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
  {
    product_id: "119",
    thumbnail:
      "https://cdn.tgdd.vn/Products/Images/8781/226835/bhx/chan-gio-heo-truoc-cp-khay-500g-1-3-mieng-202203251635367321.jpg",
    name: "Chân gà C.P 500g",
    reg_price: 38000,
    discount_percent: 0,
    discount_price: 38000,
    quantity: 88,
    unit: "khay",
    canonical: "500g",
    description:
      "Chân giò heo trước CP đạt các tiêu chuẩn về an toàn toàn thực phẩm. Giò heo (có móng hoặc không) săn chắc, thịt có sự kết hợp với gân mỡ nên ăn béo ngậy và thơm, thích hợp để hầm canh, nấu các món nước,... Có thể dùng điện thoại quét mã QR trên tem sản phẩm để kiểm tra nguồn gốc.",
    created_at: "2023-11-28T06:58:24.000Z",
    updated_at: "2023-12-23T08:23:54.000Z",
    deleted: false,
    rating: "5",
    c_id: "3",
    br_id: "2",
    event_percent: null,
    event_price: null,
    is_visible: "1",
    is_feature: "0",
  },
];

export const dummyProductReview: productReviewInterface[] = [
  {
    reviewId: 1,
    rating: "5",
    title: "Gà ngon",
    comment: "Gà ăn rất ngon, thịt chắc",
    created_at: "2024-05-17T03:21:42.700Z",

    userId: "f5d843e6-7a78-454e-a825-f3f2e26f25e5",
    productId: "999",
    user_name: "Thanh Linh",
    user_avater: null,
  },
  {
    reviewId: 2,
    rating: "4",
    title: "Gà rất tươi",
    comment: null,
    created_at: "2024-05-17T03:21:42.700Z",
    userId: "f5d843e6-7a78-454e-a825-f3f2e26f25e5",
    productId: "999",
    user_name: "Gia Kiệt",
    user_avater: null,
  },
  {
    reviewId: 3,
    rating: "1",
    title: "Gà hơi bé",
    comment: "Gà nhỏ, ít thật, chỉ toàn xương",
    created_at: "2024-05-17T03:21:42.700Z",
    userId: "f5d843e6-7a78-454e-a825-f3f2e26f25e5",
    productId: "999",
    user_name: "Đăng Khoa",
    user_avater: null,
  },
];

export const dummyCategoryGroup = [
  {
    categroup_id: 1,
    categroup_name: "THỊT, CÁ, TRỨNG, HẢI SẢN",
    thumbnail:
      "https://genk.mediacdn.vn/k:thumb_w/640/2016/protein-foods-1000-1471225685968/thitcatrungsualamthenaodechonduocnguonproteinlanhmanh.jpg",
  },
  {
    categroup_id: 2,
    categroup_name: "RAU, CỦ, NẤM, TRÁI CÂY",
    thumbnail:
      "https://pqm.vn/wp-content/uploads/2021/02/dong-nam-a-nhung-loai-trai-cay-va-rau-tuoi-ngon-hap-dan-151.jpg",
  },
  {
    categroup_id: 3,
    categroup_name: "DẦU ĂN, NƯỚC CHẤM, GIA VỊ",
    thumbnail:
      "https://www.tuongan.com.vn/public/themes/tuongan//img/sanpham-banner-4.png",
  },
  {
    categroup_id: 4,
    categroup_name: "KEM, THỰC PHẨM ĐÔNG MÁT",
    thumbnail:
      "https://www.pricechopper.com/wp-content/uploads/2023/02/r3_022623_FrozenFoodMonth_montage.png",
  },
];

export const dummyOrder: orderInterface = {
  order_id: "3353c163-aeea-426d-9711-f4fdeec552ae",
  address: "4 Cống Quỳnh, Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh",
  total: 1187900,
  note: "Gọi trước khi giao 15 phút",
  status: "Delivered",
  payment_method: "Cash",
  created_at: "2024-07-03T09:46:06.539Z",
  orderitems: [
    {
      orderitem_id: 33,
      price: 99000,
      quantity: 2,
      total: 198000,
      fromEvent: 1,
      IsReview: null,
      products: {
        product_id: "71",
        thumbnail:
          "https://cdn.tgdd.vn/Products/Images/8139/306146/bhx/bap-bo-uc-fohla-dong-lanh-250g-202305181319264984.jpg",
        name: "Bắp bò Fohla 250g",
        reg_price: 99000,
        discount_price: 99000,
      },
    },
    {
      orderitem_id: 34,
      price: 58900,
      quantity: 1,
      total: 58900,
      fromEvent: 0,
      IsReview: null,
      products: {
        product_id: "45",
        thumbnail:
          "https://cdn.tgdd.vn/Products/Images/8781/228330/bhx/chan-gio-heo-sau-cp-khay-500g-2-4-mieng-202203251619330789.jpg",
        name: "Dựng heo C.P 500g",
        reg_price: 62000,
        discount_price: 58900,
      },
    },
    {
      orderitem_id: 35,
      price: 18000,
      quantity: 3,
      total: 54000,
      fromEvent: 1,
      IsReview: null,
      products: {
        product_id: "331",
        thumbnail:
          "https://cdn.tgdd.vn/Products/Images/8788/316335/bhx/thanh-long-09-11kg-2-3-trai-202310041030340610.jpg",
        name: "Thanh long 0.9kg - 1.1kg",
        reg_price: 18000,
        discount_price: 18000,
      },
    },
    {
      orderitem_id: 36,
      price: 117000,
      quantity: 7,
      total: 819000,
      fromEvent: 0,
      IsReview: null,
      products: {
        product_id: "90",
        thumbnail:
          "https://cdn.tgdd.vn/Products/Images/8139/239162/bhx/bo-uc-mat-xao-pacow-khay-250g-202202111447535457.jpg",
        name: "Thịt bò Úc xào Pacow 250g",
        reg_price: 117000,
        discount_price: 117000,
      },
    },
    {
      orderitem_id: 37,
      price: 58000,
      quantity: 1,
      total: 58000,
      fromEvent: 0,
      IsReview: null,
      products: {
        product_id: "115",
        thumbnail:
          "https://cdn.tgdd.vn/Products/Images/8790/312259/bhx/dui-toi-ga-cp-500g-xuong-que-heo-nhap-khau-dong-lanh-500g-202308011009319424.jpg",
        name: "Đùi tỏi gà C.P 500g",
        reg_price: 58000,
        discount_price: 58000,
      },
    },
  ],
};
