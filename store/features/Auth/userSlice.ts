import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { tenmien } from "../../../utils";
import { defaultAvt, logout } from "../../../utils/functions";
import { Colors } from "../../../components/styles";

interface userState {
  loading: boolean;
  error: string;
  data: {
    address?: string;
    avater?: string;
    email: string;
    name: string;
    phone: string;
  };
}

// Thunk functions
export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${tenmien}/auth/login`, {
        email,
        password,
      });
      return response.data.user;
    } catch (err) {
      throw err;
    }
  }
);
export const checkLogin = createAsyncThunk("userSlice/checkLogin", async () => {
  try {
    const userId = getUserIdFromCookie();
    // if( userId==="-1") throw new Error();
    const response = await axios.get(
      `${tenmien}/api/taikhoan/${userId}/thongtin`
    );
    return response.data;
    // return Promise.resolve({
    //   id: 1,
    //   cartId: 23,
    //   email: "haidu@gmail.com",
    //   fullname: "Nguyễn B",
    //   phone: "02932854",
    //   address: "Tran Hung Dao",
    //   isLoggedIn: true,
    // });
  } catch (err) {
    throw err;
  }
});

export const signupUser = createAsyncThunk(
  "userSlice/signupUser",
  async ({
    email,
    password,
    fullname,
  }: {
    email: string;
    password: string;
    fullname: string;
  }) => {
    try {
      const response = await axios.post(`${tenmien}/api/dangky`, {
        email,
        password,
        fullname,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const updateUser = createAsyncThunk(
  "userSlice/updateUser",
  async ({
    name,
    address,
    avater,
    phone,
  }: {
    name: string;
    address?: string | null;
    avater?: string | null;
    phone?: string;
  }) => {
    try {
      const data = phone
        ? { name, address, avater, phone }
        : { name, address, avater };
      const response = await axios
        .post(`${tenmien}/user`, data)
        .then((res) => res.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "userSlice/getUserInfo",
  async () => {
    try {
      // {{URL}}/user/showMe
      const res = await axios
        .get(`${tenmien}/user/showMe`)
        .then((res) => res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

// Functions

function getUserIdFromCookie(): string {
  var name = "userId=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return "-1"; // Return null if the cookie is not found
}

const initialState: userState = {
  loading: false,
  error: "",
  data: {
    address: undefined,
    avater: undefined,
    email: "",
    name: "Khách hàng",
    phone: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      // document.cookie = `userId=${action.payload?.id}`;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "Sai tên tài khoản hoặc mật khẩu";
    });

    // Check Login
    builder.addCase(checkLogin.pending, (state) => {
      state.loading = true;
      state.error = "";
      // state.data = initialState.data;
    });
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(checkLogin.rejected, (state, action) => {
      state.loading = false;
      state.data = initialState.data;
      state.error = "Vui lòng đăng nhập lại!";
      document.cookie =
        "userId" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
    // Sign up
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      document.cookie = `userId=${action.payload?.id}`;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "Lỗi đăng ký";
    });

    // Update user info (*)
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = { ...state.data, ...action.payload };
      if (!state.data.avater) state.data.avater = defaultAvt(state.data.name);
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "Cập nhật không thành công";
    });

    // Get user info (*)
    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      if (!state.data.avater) state.data.avater = defaultAvt(state.data.name);
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = "Lấy thông tin người dùng thất bại!";
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice;
