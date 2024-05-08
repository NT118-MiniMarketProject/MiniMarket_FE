// Variables
export const tenmien: string = "http://192.168.1.8:8000";

// Intefaces
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

export interface categoryGroupInterface {
  id: number;
  name: string;
  thumbnail: string;
}

export interface productInfoInterface extends productHomeInterface {
  canonical?: string;
  quantity?: number;
  category_id?: number;
  description: string;
  article: string;
  galleries: {
    thumbnail: string;
    sort: number;
    product_id?: number;
  }[];
  brand: {
    id: number;
    name: string;
    // thumbnail: string,
  };
  category: {
    id: number;
    name: string;
  };
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
