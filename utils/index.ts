import { Dimensions } from "react-native";

// Variables
export const tenmien: string = "https://minimarket-be.onrender.com/api/v1";
// export const tenmien: string = "localhost";
export const ngrok: string = "https://b004-171-243-48-12.ngrok-free.app" //cai nay de chay cai php backend, url thay doi moi lan start ngrok

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

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
  if (price){
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
export const dummyProduct:productHomeBEInterface[] = [
  {
    "product_id": "1127",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8400/240445/bhx/sellingpoint.jpg",
    "name": "Nghêu lụa đông lạnh Mama Food 200g",
    "reg_price": 37000,
    "discount_percent": 0,
    "discount_price": 37000,
    "quantity": 15,
    "unit": "gói",
    "canonical": "200g",
    "description": "Hải sản đông lạnh Mama Food thương hiệu hải sản đông lạnh có giá trị dinh dưỡng cao, thơm ngon, hỗ trợ chữa được nhiều bệnh như tiểu đường, suy tinh, ho đàm, nóng nhiệt. Nghêu lụa đông lạnh Mama Food gói 200g tiện lợi chế biến thành các món hấp dẫn như hấp sả, canh nghêu, xào tỏi, dồn thịt sốt cà",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "14",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1128",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8400/239251/bhx/ngheu-lua-dong-lanh-tran-gia-khay-200g-202202170937065928.jpg",
    "name": "Nghêu lụa đông lạnh Trần Gia 200g",
    "reg_price": 40000,
    "discount_percent": 0,
    "discount_price": 40000,
    "quantity": 14,
    "unit": "khay",
    "canonical": "200g",
    "description": "Hải sản đông lạnh chất lượng từ hải sản đông lạnh Trần Gia. Giá trị dinh dưỡng cao, thơm ngon và được nhiều người ưa thích, ngoài ra còn có công dụng hỗ trợ một số bệnh, tốt cho sức khỏe. Nghêu lụa Trần Gia 200g tiện lợi chế biến thành các món hấp dẫn như hấp sả, canh nghêu, dồn thịt sốt cà,...",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "15",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1129",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8400/239254/bhx/sellingpoint.jpg",
    "name": "Càng ghẹ đông lạnh Trần Gia 200g",
    "reg_price": 136000,
    "discount_percent": 0,
    "discount_price": 136000,
    "quantity": 27,
    "unit": "khay",
    "canonical": "200g",
    "description": "Hải sản đông lạnh chất lượng từ hải sản đông lại Trần Gia. Là loại thực phẩm có hàm hàm lượng protein cao hơn nhiều so với thịt heo hay cá, dồi dào canxi, photpho, sắt và các vitamin A, B1, B2, C,…Càng ghẹ đông lạnh Trần Gia khay 200g tươi ngon chứa một lượng lớn omega 3, rất tốt cho tim mạch",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "15",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1130",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8400/239247/bhx/sellingpoint.jpg",
    "name": "Lườn cá hồi đông lạnh Trần Gia 500g",
    "reg_price": 70000,
    "discount_percent": 0,
    "discount_price": 70000,
    "quantity": 90,
    "unit": "khay",
    "canonical": "500g",
    "description": "Hải sản đông lạnh chất lượng từ hải sản đông lạnh Trần Gia. Lườn cá hồi đông lạnh Trần Gia khay 500g với thành phần lườn cá hồi 100% tươi ngon, giàu omega 3 tốt cho sức khỏe, không chất bảo quản được làm sạch và đóng gói kín đáo, an toàn tiện lợi chế biến thành nhiều món ăn ngon",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "15",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1131",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8400/239256/bhx/ca-trung-dong-lanh-tran-gia-khay-200g-202304050914190689.jpg",
    "name": "Cá trứng đông lạnh Trần Gia 200g",
    "reg_price": 44000,
    "discount_percent": 0,
    "discount_price": 44000,
    "quantity": 70,
    "unit": "khay",
    "canonical": "",
    "description": "Cá đông lạnh chất lượng từ cá đông lạnh Trần Gia. Cá trứng đông lạnh Trần Gia khay 200g từ nguồn nguyên liệu nhập khẩu châu Âu thơm ngon và giàu dinh dưỡng, có thể chế biến ra nhiều món ăn thơm khó cưỡng như chiên giòn, nướng muối ớt hay sốt cà chua,...",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "15",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1132",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8400/200150/bhx/hai-san-ngu-sac-sg-food-goi-300g-202209070906590945.jpg",
    "name": "Hải sản ngũ sắc đông lạnh SG Food 300g",
    "reg_price": 48000,
    "discount_percent": 0,
    "discount_price": 48000,
    "quantity": 78,
    "unit": "gói",
    "canonical": "",
    "description": "Thịt cá đông lạnh chất lượng từ thương hiệu thịt cá đông lạnh SG Food. Với thành phần gồm tôm, mực/bạch tuộc, cá/cồi điệp cùng gói gia vị cô đặc và các loại rau củ. Hải sản ngũ sắc SG Food gói 300g tiện lợi chế biến thành những món ngon hấp dẫn nhiều dinh dưỡng như xào, chiên cơm,...",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "16",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1133",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8400/244643/bhx/ca-hoi-phi-le-sg-food-khay-200g-202302081034475715.jpg",
    "name": "Cá hồi phi lê đông lạnh SG Food 200g",
    "reg_price": 110000,
    "discount_percent": 0,
    "discount_price": 110000,
    "quantity": 79,
    "unit": "khay",
    "canonical": "",
    "description": "Được tuyển chọn từ những con cá hồi nhập khẩu từ Nhật Bản giữ nguyên vị tươi ngon chắc thịt, Cá hồi phi lê SG Food khay 200g là một trong những lựa chọn tuyệt vời cho khách hàng đến từ cá đông lạnh SG Food. Đây là loại cá đông lạnh mang đến hương vị thơm ngon và cung cấp dinh dưỡng dồi dào.",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "16",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1134",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8400/240011/bhx/sellingpoint.jpg",
    "name": "Cá trứng một nắng đông lạnh SG Food 410g",
    "reg_price": 100000,
    "discount_percent": 0,
    "discount_price": 100000,
    "quantity": 62,
    "unit": "khay",
    "canonical": "410g",
    "description": "Cá đông lạnh chất lượng từ cá đông lạnh SG Food mang đến cho bạn những bữa ăn ngon mỗi ngày. Sản phẩm cá trứng không tẩm SG Food khay 250g từ nguồn nguyên liệu cá trứng tươi ngon, bên trong chứa đầy ắp trứng có hương vị thơm ngọt, bùi béo và dinh dưỡng chất lượng.",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "16",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1135",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8791/244636/bhx/sellingpoint.jpg",
    "name": "Cá hồi phi lê tiêu xanh SG Food 300g",
    "reg_price": 117000,
    "discount_percent": 0,
    "discount_price": 117000,
    "quantity": 69,
    "unit": "khay",
    "canonical": "300g",
    "description": "Được tuyển chọn từ những con cá hồi nhập khẩu từ Nhật Bản kết hợp với xốt tiêu xanh, cá hồi phi lê xốt tiêu xanh SG Food khay 300g là một trong những lựa chọn tuyệt vời cho khách hàng đến từ thực phẩm tẩm ướp SG Food. Đây là loại thực phẩm làm sẵn mang đến hương vị thơm ngon và cung cấp dinh dưỡng dồi dào.",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "16",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1136",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8791/244644/bhx/-202210121054325504.jpg",
    "name": "Cá saba na uy tẩm muối ớt SG Food 400g",
    "reg_price": 83500,
    "discount_percent": 0,
    "discount_price": 83500,
    "quantity": 60,
    "unit": "gói",
    "canonical": "",
    "description": "Với nguồn nguyên liệu được đánh bắt từ vùng biển lạnh Na Uy, cá saba Na Uy tẩm muối ớt SG Food gói 400g có phần thịt trắng mềm béo kết hợp với vị muối ớt đặc trưng làm tăng thêm vị thơm ngon, đến từ thương hiệu thực phẩm tẩm ướp SG Food. Loại thực phẩm làm sẵn này cung cấp nguồn dinh dưỡng dồi dào.",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "16",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1137",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8791/222393/bhx/sellingpoint.jpg",
    "name": "Cá saba tiêu xanh SG Food 500g",
    "reg_price": 76000,
    "discount_percent": 0,
    "discount_price": 76000,
    "quantity": 90,
    "unit": "gói",
    "canonical": "500g",
    "description": "Là sản phẩm thực phẩm chế biến sẵn vô cùng tiện lợi và thơm ngon đến từ thương hiệu thực phẩm tẩm ướp SG Food quen thuộc với người dùng. Cá saba tẩm tiêu xanh SG Food gói 500g được làm từ cá saba nguyên con được tẩm ướp tiêu xanh thơm nồng đậm đà, giúp người dùng chế biến nhanh chóng.\\r\\n",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "16",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1138",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8791/240006/bhx/sellingpoint.jpg",
    "name": "Cá trứng tẩm gia vị SG Food 250g",
    "reg_price": 51000,
    "discount_percent": 0,
    "discount_price": 51000,
    "quantity": 72,
    "unit": "gói",
    "canonical": "250g",
    "description": "Hải sản tẩm ướp chất lượng từ thực phẩm tẩm ướp SG Food. Cá trứng tẩm gia vị SG Food khay 250g từ nguồn nguyên liệu nhập khẩu chất lượng, với hương vị thơm ngọt, bùi béo và dinh dưỡng, được tẩm ướp sẵn cùng các loại gia vị thích hợp có thể chế biến ra nhiều món ăn thơm khó cưỡng",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "16",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1139",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8791/222894/bhx/ca-saba-tam-sa-te-sg-food-goi-600g-202210121044287081.jpg",
    "name": "Cá saba tẩm sa tế SG Food gói 600g",
    "reg_price": 92000,
    "discount_percent": 30,
    "discount_price": 64400,
    "quantity": 86,
    "unit": "gói",
    "canonical": "",
    "description": "Là sản phẩm thực phẩm chế biến sẵn vô cùng tiện lợi và thơm ngon đến từ thương hiệu thực phẩm làm sẵn SG Food quen thuộc với người dùng. Cá saba tẩm sa tế SG Food gói 600g được làm từ cá saba nguyên con được tẩm ướp sa tế cay thơm, đậm đà, giúp người dùng chế biến nhanh chóng.",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "16",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  },
  {
    "product_id": "1140",
    "thumbnail": "https://cdn.tgdd.vn/Products/Images/8400/212203/bhx/que-surimi-huong-vi-cua-akira-3n-foods-goi-250g-202203182245025430.jpg",
    "name": "Thanh surimi vị cua 3N Akira 250g",
    "reg_price": 60000,
    "discount_percent": 30,
    "discount_price": 42000,
    "quantity": 13,
    "unit": "gói",
    "canonical": "250g",
    "description": "Hải sản đông lạnh thương hiệu 3N Food gồm surimi, tinh bột khoai mì, lòng trắng trứng, chiết xuất cua, hương cua tổng hợp, dầu thực vật, chất điều vị, màu thực phẩm tổng hợp. Que surimi hương cua 3N Foods Arika gói 250g có thể dùng để làm món cơm chiên, mì xào, lẩu, sushi,...vô cùng thơm ngon",
    "created_at": "2023-12-02T05:36:44.000Z",
    "updated_at": "2023-12-23T08:23:54.000Z",
    "deleted": false,
    "rating": "5",
    "c_id": "32",
    "br_id": "80",
    "event_percent": null,
    "event_price": null,
    "is_visible": "1",
    "is_feature": "0"
  }
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

