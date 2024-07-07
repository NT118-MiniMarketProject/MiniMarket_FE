import { FontAwesome } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Formik, FormikProps } from "formik";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast, { ToastOptions } from "react-native-root-toast";
import * as Yup from "yup";
import Breadcrumb from "../../components/Common/Breadcrumb";
import CustomBottomSheetTextInput from "../../components/Common/CustomBottomSheetTextInput";
import LineSeparator from "../../components/Common/LineSeparator";
import OrderStatusTag from "../../components/Order/OrderStatusTag";
import { Colors, ErrorText, toastConfig } from "../../components/styles";
import { useAppDispatch, useAppSelector } from "../../store";
import { orderListActions } from "../../store/features/Orders/orderListSlice";
import {
  fetchOrder,
  orderActions,
} from "../../store/features/Orders/orderSlice";
import {
  orderItemInterface,
  paymentMethodConvert,
  priceFormatter,
  tenmien,
} from "../../utils";
import { convertDateTime } from "../../utils/functions";

const reviewState = [
  "Tệ",
  "Không hài lòng",
  "Bình thường",
  "Hài lòng",
  "Tuyệt vời",
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Bạn vui lòng nhập tiêu đề cho đánh giá"),
});

const errorMsg = "Uiii, có lỗi rồi. Vui lòng thử lại sau";

const OrderDetailScreen = ({ navigation, route }: any) => {
  const { order_id = "", maHD = "" } = route?.params ?? {};

  const [isFetching, setIsFetching] = useState(false);
  const [reviewItem, setReviewItem] = useState<orderItemInterface | null>(null);
  const [reviewStar, setReviewStar] = useState<number>(5);
  const [reviewSubmitting, setReviewSubmitting] = useState<boolean>(false);
  const [isReviewSubmitBtnDisable, setReviewSubmitBtnDisable] =
    useState<boolean>(true);
  const reviewFormRef = useRef<FormikProps<any>>(null);

  const dispatch = useAppDispatch();
  const orderState = useAppSelector((state) => state.order);
  const order = orderState.data;

  // Gọi API BE, Dùng useFocusEffect thì phải gọi api trong useCallback không thì sẽ bị gọi nhiều lần
  useFocusEffect(
    useCallback(() => {
      getOrder();
    }, [])
  );

  const getOrder = async () => {
    setIsFetching(true);
    await dispatch(fetchOrder(order_id));
    // console.log({ orderState }); //Lấy thành công data từ BE
    dispatch(orderListActions.updateOrder(orderState.data)); // Cập nhật lại OrderListSlice khi mới fetch mới một order
    setIsFetching(false);
  };

  const sheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%", "65%"], []);
  const openModalReview = useCallback(() => {
    sheetModalRef.current?.present();
  }, [sheetModalRef]);
  const { dismissAll } = useBottomSheetModal();
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const reviewHandler = (orderItem: orderItemInterface) => {
    if (orderItem.IsReview) return;
    setReviewItem(orderItem);
    setReviewStar(5);
    reviewFormRef.current?.resetForm();
    openModalReview();
  };

  const handleReviewSubmit = async (values: any) => {
    setReviewSubmitting(true);

    const title = values.title.trim();
    const comment = values.comment.trim() === "" ? null : values.comment.trim();
    const data = {
      rating: reviewStar,
      title,
      comment,
    };

    try {
      const res = await axios.post(
        `${tenmien}/reviews/${reviewItem?.orderitem_id}`,
        data
      );
      // console.log(res);
      dispatch(orderActions.updatIsReview(reviewItem?.orderitem_id));
      Toast.show(
        "Cảm ơn bạn đã đánh giá sản phẩm",
        toastConfig as ToastOptions
      );
      dismissAll();
    } catch (err: any) {
      console.log(">>> ReviewSubmit ERR:", err.message);
      Toast.show(errorMsg, toastConfig as ToastOptions);
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <View className="flex-1">
      <Breadcrumb
        navigation={navigation}
        title={`Chi tiết đơn hàng #${maHD}`}
      />
      {isFetching ? (
        <View className="items-center mt-1">
          <ActivityIndicator size="large" color={Colors?.primary} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="pb-5">
            <View className="flex-1 mt-1.5 bg-txtwhite pt-5 pb-10 px-2">
              <View style={styles.row}>
                <View style={styles.textGroup}>
                  <Text style={styles.text}>Ngày đặt: </Text>

                  {/* Thời điểm đặt hàng */}
                  <Text
                    style={[styles.text, { color: "black" }]}
                    className="font-bold"
                  >
                    {order.created_at !== ""
                      ? convertDateTime(new Date(order.created_at))
                      : ""}
                  </Text>
                </View>

                {/* Trạng thái đơn hàng */}
                <OrderStatusTag value={order.status} />
              </View>

              <View className="bg-gray-200 rounded-md my-3 py-2">
                {/* Địa chỉ giao hàng */}
                <View style={styles.row2}>
                  <View style={styles.leftCol}>
                    <Text style={styles.text}>Địa chỉ giao:</Text>
                  </View>
                  <View style={styles.rightCol}>
                    <Text>{order.address}</Text>
                  </View>
                </View>

                {/* Ghi chú */}
                <View style={styles.row2}>
                  <View style={styles.leftCol}>
                    <Text style={styles.text}>Ghi chú:</Text>
                  </View>
                  <View style={styles.rightCol}>
                    {order.note ? (
                      <Text>{order.note}</Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 13,
                          color: Colors.placeholder,
                          fontStyle: "italic",
                        }}
                      >
                        Đơn hàng không có ghi chú
                      </Text>
                    )}
                  </View>
                </View>

                {/* Phương thức thanh toán */}
                <View style={styles.row2}>
                  <View style={styles.leftCol}>
                    <Text style={styles.text}>Thanh toán:</Text>
                  </View>
                  <View style={styles.rightCol}>
                    <Text>{paymentMethodConvert(order.payment_method)}</Text>
                  </View>
                </View>

                {/* Tổng đơn hàng */}
                <View style={styles.row2}>
                  <View style={styles.leftCol}>
                    <Text style={styles.text}>Tổng đơn hàng:</Text>
                  </View>
                  <View style={styles.rightCol}>
                    <Text>{`${priceFormatter(order.total)}đ`}</Text>
                  </View>
                </View>
              </View>

              <View className="mt-3">
                <Text>Danh sách sản phẩm</Text>
                <View className="mt-1.5">
                  {order.orderitems.map((item) => (
                    <View key={item.orderitem_id}>
                      <View className="py-2">
                        <TouchableOpacity
                          style={[styles.row, { alignItems: "flex-start" }]}
                          onPress={() =>
                            navigation.navigate("ProductDetailScreen", {
                              id: item.products.product_id,
                            })
                          }
                        >
                          {/* Ảnh SP */}
                          <ImageBackground
                            source={require("../../assets/images/product_placeholder.png")}
                            resizeMode="cover"
                          >
                            <Image
                              source={{ uri: item.products.thumbnail }}
                              style={{ width: 68, height: 68 }}
                              resizeMode="cover"
                            />
                          </ImageBackground>
                          <View className="flex-1 ml-2">
                            <View className="flex-1 justify-between">
                              <View
                                style={[styles.row, { alignItems: "flex-end" }]}
                              >
                                {/* Tên SP */}
                                <Text
                                  style={[
                                    styles.text,
                                    {
                                      color: "black",
                                      marginRight: 8,
                                      flex: 8,
                                    },
                                  ]}
                                >
                                  {item.products.name}
                                </Text>
                                <View
                                  className="flex-row justify-end"
                                  style={{ flex: 5 }}
                                >
                                  {/* Giá bình thường */}
                                  <Text
                                    className="line-through mr-1"
                                    style={[
                                      styles.text,
                                      {
                                        opacity:
                                          item.products.reg_price >
                                          item.products.discount_price
                                            ? 1
                                            : 0,
                                      },
                                    ]}
                                  >
                                    {`${priceFormatter(
                                      item.products.reg_price
                                    )}đ`}
                                  </Text>

                                  {/* Giá Khuyến mãi */}
                                  <Text
                                    style={[styles.text, { color: "black" }]}
                                  >{`${priceFormatter(
                                    item.products.discount_price
                                  )}đ`}</Text>
                                </View>
                              </View>

                              <View style={styles.row}>
                                <Text
                                  style={[
                                    styles.text,
                                    { color: Colors.placeholder },
                                  ]}
                                >{`Đơn giá: ${priceFormatter(
                                  item.price
                                )}đ`}</Text>

                                {/* Số lượng */}
                                <Text
                                  style={styles.text}
                                >{`Số lượng: ${item.quantity}`}</Text>
                              </View>

                              <View style={styles.row}>
                                {/* Có khuyển mãi ? */}
                                <View
                                  className="px-1"
                                  style={{
                                    borderWidth: 0.85,
                                    borderColor: "#FF1700",
                                    opacity: item.fromEvent === 1 ? 1 : 0,
                                  }}
                                >
                                  <Text
                                    className="font-light"
                                    style={{ fontSize: 12, color: "#FF1700" }}
                                  >
                                    Sự kiện khuyến mãi
                                  </Text>
                                </View>
                                <Text
                                  style={{ color: Colors?.primary }}
                                >{`${priceFormatter(item.total)}đ`}</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>

                        {/* Đánh giá sản phẩm */}
                        {order.status === "Delivered" && (
                          <TouchableOpacity
                            className="pt-1.5 self-start"
                            onPress={() => reviewHandler(item)}
                            disabled={item.IsReview ? item.IsReview : false} //đã đánh giá thì true
                          >
                            <Text
                              style={{
                                fontSize: 13,
                                color: item.IsReview
                                  ? Colors.disabledText
                                  : "#f59e0b",
                              }}
                            >
                              {item.IsReview
                                ? "Đã đánh giá"
                                : "Đánh giá sản phẩm"}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      <View className="border-b-1.2 border-slate-200"></View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Tổng giá trị đơn hàng */}
              <View style={styles.row} className="mt-4">
                <Text>Tổng đơn hàng</Text>
                <Text
                  style={{ color: Colors?.primary, fontSize: 16 }}
                >{`${priceFormatter(order.total)}đ`}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      <BottomSheetModal
        ref={sheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: Colors.greenBackground,
        }}
      >
        <Formik
          initialValues={{
            title: "",
            comment: "",
          }}
          onSubmit={(values, { setFieldValue }) => {
            if (!values.title.trim()) {
              setFieldValue("title", values.title.trim());
              setFieldValue("comment", values.comment.trim());
              Toast.show(
                "Điền đầy đủ các thông tin bắt buộc",
                toastConfig as ToastOptions
              );
              return;
            }
            handleReviewSubmit(values);
          }}
          validationSchema={validationSchema}
          innerRef={reviewFormRef}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => {
            useEffect(() => {
              setReviewSubmitBtnDisable(!values.title || reviewSubmitting);
            }, [values.title, reviewSubmitting]);
            return (
              <BottomSheetScrollView contentContainerStyle={{ flex: 1 }}>
                <View className="flex-row justify-between px-5">
                  <TouchableOpacity className="" onPress={dismissAll}>
                    <Text className="text-trieugreen2 text-base">Đóng</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-row"
                    onPress={() => {
                      Keyboard.dismiss();
                      handleSubmit();
                    }}
                    disabled={isReviewSubmitBtnDisable}
                  >
                    {reviewSubmitting && (
                      <ActivityIndicator
                        color={Colors.disabledBtn}
                        className="mr-1"
                      />
                    )}
                    <Text
                      className="text-base"
                      style={{
                        color: isReviewSubmitBtnDisable
                          ? Colors.disabledBtn
                          : Colors.greenBackground,
                      }}
                    >
                      Gửi
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-row p-3">
                  <ImageBackground
                    source={require("../../assets/images/product_placeholder.png")}
                    resizeMode="cover"
                  >
                    <Image
                      source={{ uri: reviewItem?.products.thumbnail }}
                      style={{ width: 68, height: 68 }}
                      resizeMode="cover"
                    />
                  </ImageBackground>
                  <View className="flex-1 ml-2">
                    <Text>{reviewItem?.products.name}</Text>
                    <Text
                      style={{ fontSize: 13, color: Colors.disabledText }}
                    >{`Mã đơn hàng: #${maHD}`}</Text>
                  </View>
                </View>
                <LineSeparator />
                <View className="px-3">
                  <View className="flex-row">
                    <View style={{ flex: 4, alignItems: "flex-start" }}>
                      <Text>Chất lượng sản phẩm</Text>
                    </View>
                    <View className="flex-row items-center" style={{ flex: 9 }}>
                      <View
                        style={{ flex: 5 }}
                        className="flex-row items-center justify-between ml-1"
                      >
                        {Array.from({ length: 5 }).map((_, idx) => {
                          const start =
                            idx <= reviewStar - 1 ? (
                              <FontAwesome
                                name="star"
                                size={24}
                                color="rgb(234 179 8)"
                              />
                            ) : (
                              <FontAwesome
                                name="star-o"
                                size={24}
                                color="rgb(234 179 8)"
                              />
                            );
                          return (
                            <Pressable
                              key={idx}
                              className="flex-1"
                              onPress={() => setReviewStar(idx + 1)}
                            >
                              {start}
                            </Pressable>
                          );
                        })}
                      </View>
                      <View style={{ flex: 4 }} className="ml-2">
                        <Text className="text-trieugreen">
                          {reviewState[reviewStar - 1]}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <>
                    {/* Review title */}
                    <View>
                      <CustomBottomSheetTextInput
                        label="Tiêu đề đánh giá"
                        value={values.title}
                        onChangeText={handleChange("title")}
                        onBlur={handleBlur("title")}
                        require
                        labelColor={Colors.placeholder}
                        styledContainer={{ height: 56, marginTop: 16 }}
                        error={errors.title && touched.title ? true : false}
                      />
                      <ErrorText
                        style={{ marginLeft: 5 }}
                        error={errors.title && touched.title ? true : false}
                      >
                        {errors.title?.toString()}
                      </ErrorText>
                    </View>

                    <CustomBottomSheetTextInput
                      label=""
                      value={values.comment}
                      onChangeText={handleChange("comment")}
                      onBlur={handleBlur("comment")}
                      multiline
                      labelColor={Colors.placeholder}
                      styledContainer={{ height: 160, marginTop: 8 }}
                      placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
                    />
                  </>
                </View>
              </BottomSheetScrollView>
            );
          }}
        </Formik>
      </BottomSheetModal>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: Colors.black,
  },

  textGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row2: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  leftCol: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 8,
  },
  rightCol: {
    flex: 2,
    alignItems: "flex-start",
    paddingLeft: 8,
  },
});
