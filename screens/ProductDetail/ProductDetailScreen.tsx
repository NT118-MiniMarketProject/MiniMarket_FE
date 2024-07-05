import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Breadcrumb from "../../components/Common/Breadcrumb";
import GradientButton from "../../components/Common/GradientButton";
import Product from "../../components/Common/Product";
import Start from "../../components/Common/Start";
import { Colors } from "../../components/styles";
import { useAppDispatch, useAppSelector } from "../../store";
import { SCREEN_WIDTH, formatDateTime, priceFormatter } from "../../utils";
import LineSeparator from "../../components/Common/LineSeparator";
import { defaultAvt } from "../../utils/functions";
import productDetailSlice, {
  fetchProductDetail,
  productDetailActions,
} from "../../store/features/Product/productDetailSlice";
import {
  fetchProductRelevant,
  productRelevantActions,
} from "../../store/features/Product/productRelevantSlice";
import { Skeleton } from "moti/skeleton";
import ProductSkeleton from "../../components/Common/ProductSkeleton";
import {
  fetchProductReview,
  productReviewActions,
} from "../../store/features/Product/productReviewSlice";

const IMAGE_WIDTH = SCREEN_WIDTH;
const IMAGE_HEIGHT = (3 / 4) * SCREEN_WIDTH;

const ProductDetailScreen = ({ navigation, route }: any) => {
  const product_id = route.params.id;

  // console.log(product_id);

  const [currentIdx, setCurrIdx] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const sliderRef = useRef<ICarouselInstance>(null);

  const dispatch = useAppDispatch();

  const productState = useAppSelector((state) => state.productDetail);
  const relevantState = useAppSelector((state) => state.productRelevant);
  const reviewState = useAppSelector((state) => state.productReview);

  const product = productState.data;

  const isSale = product.event_percent && product.event_price;
  const isDiscount = product.discount_percent && product.discount_price;
  let current_price = product.reg_price,
    current_percent = 0;
  if (isSale) {
    current_price = product.event_price ?? 0;
    current_percent = product.event_percent ?? 0;
  } else if (isDiscount) {
    current_price = product.discount_price;
    current_percent = product.discount_percent;
  }

  const buyHandler = () => {};

  useEffect(() => {
    dispatch(fetchProductDetail(product_id));
    dispatch(fetchProductRelevant(product_id));
    dispatch(fetchProductReview(product_id));
    return () => {
      dispatch(productDetailActions.clearState(""));
      dispatch(productRelevantActions.clearState(""));
      dispatch(productReviewActions.clearState(""));
      // console.log("hello");
    };
  }, []);

  const refreshHandler = async () => {
    setIsRefreshing(true);
    await Promise.all([
      dispatch(productDetailActions.clearState("")),
      dispatch(productReviewActions.clearState("")),
    ]);
    await Promise.all([
      dispatch(fetchProductDetail(product_id)),
      dispatch(fetchProductReview(product_id)),
    ]);
    setIsRefreshing(false);
  };

  return (
    <View className="flex-1">
      <Breadcrumb navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshHandler}
            colors={[Colors.greenBackground, Colors.primary]}
          />
        }
      >
        <View className="bg-txtwhite py-3">
          {/* {productState.loading && (
            <View className="items-center">
              <ActivityIndicator size="large" color={Colors.greenBackground} />
            </View>
          )} */}
          {/* Ảnh SP */}
          <ImageBackground
            source={require("../../assets/images/product_placeholder.png")}
            resizeMode="cover"
          >
            <Carousel
              ref={sliderRef}
              loop={false}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              data={product.galleries}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <Image
                      source={{ uri: item.thumbnail_gallery }}
                      style={{
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                );
              }}
              onSnapToItem={(index) => setCurrIdx(index + 1)}
            />
            {!productState.loading && (
              <>
                {/* image index */}
                <View
                  className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md"
                  style={{ backgroundColor: "rgba(92, 89, 91, 0.85)" }}
                >
                  <Text className="text-txtwhite text-xs">
                    {`${currentIdx}/${product.galleries.length}`}
                  </Text>
                </View>
                {/* button next */}
                <TouchableOpacity
                  className="absolute rounded-tl-md rounded-bl-md py-9 px-0.5"
                  style={{
                    right: 0,
                    top: IMAGE_HEIGHT / 2 - 65,
                    backgroundColor: "rgba(92, 89, 91, 0.7)",
                    display:
                      currentIdx === product.galleries.length ? "none" : "flex",
                  }}
                  onPress={() => sliderRef.current?.next()}
                >
                  <Feather name="chevron-right" size={24} color="white" />
                </TouchableOpacity>
                {/* button prev */}
                <TouchableOpacity
                  className="absolute rounded-tr-md rounded-br-md py-9 px-0.5"
                  style={{
                    left: 0,
                    top: IMAGE_HEIGHT / 2 - 65,
                    backgroundColor: "rgba(92, 89, 91, 0.7)",
                    display: currentIdx === 1 ? "none" : "flex",
                  }}
                  onPress={() => sliderRef.current?.prev()}
                >
                  <Feather name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
              </>
            )}
          </ImageBackground>

          <View className="p-3">
            {/* Tên SP */}
            <Skeleton
              colorMode="light"
              width={"80%"}
              height={28}
              disableExitAnimation={true}
            >
              {!productState.loading ? (
                <Text className="font-bold text-lg">{product.name}</Text>
              ) : null}
            </Skeleton>

            <View className="flex-row justify-between items-start mt-2">
              <View className="flex-1">
                <Skeleton
                  colorMode="light"
                  width={"70%"}
                  height={28}
                  disableExitAnimation={true}
                >
                  {!productState.loading ? (
                    <View className="flex-row items-end">
                      {/* Giá SP */}
                      <Text className="text-lg font-extrabold">{`${priceFormatter(
                        current_price
                      )}đ`}</Text>
                      {/* Canonical */}
                      {product.canonical && (
                        <Text className="font-sans text-sm text-txtgray self-end pl-1">
                          /{product.canonical}
                        </Text>
                      )}
                    </View>
                  ) : null}
                </Skeleton>
                <Skeleton
                  show={productState.loading}
                  colorMode="light"
                  width={"50%"}
                  height={28}
                  disableExitAnimation={true}
                >
                  {!productState.loading &&
                  current_price < product.reg_price ? (
                    <View className="flex-row items-center mt-1">
                      <Text
                        className="line-through"
                        style={{ color: Colors.disabledText }}
                      >{`${priceFormatter(product.reg_price)}đ`}</Text>
                      <View className="bg-red-500 px-1 py-0.5 rounded-md ml-2">
                        <Text className="text-white font-bold text-center text-xs">
                          -{current_percent}%
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </Skeleton>
              </View>

              {!productState.loading ? (
                <GradientButton
                  style={{ paddingHorizontal: 60, height: 57 }}
                  textStyle={{ fontWeight: "600", fontSize: 20 }}
                  title="MUA"
                  onPress={buyHandler}
                />
              ) : (
                <Skeleton
                  colorMode="light"
                  height={59}
                  width={178}
                  disableExitAnimation={true}
                />
              )}
            </View>
            <View className="my-3">
              <Text className="text-base">Thông tin sản phẩm</Text>
              {productState.loading ? (
                <View className="mt-1.5">
                  <Skeleton
                    colorMode="light"
                    width={"100%"}
                    height={24}
                    boxHeight={28}
                    disableExitAnimation={true}
                  />
                  <Skeleton
                    colorMode="light"
                    width={"100%"}
                    height={24}
                    boxHeight={28}
                    disableExitAnimation={true}
                  />
                  <Skeleton
                    colorMode="light"
                    width={"70%"}
                    height={20}
                    boxHeight={28}
                    disableExitAnimation={true}
                  />
                </View>
              ) : (
                <Text className="mt-1.5 text-justify leading-6 text-black">
                  {product.description}
                </Text>
              )}
            </View>
          </View>
          {/* <View className="p-3 bg-orange-100"></View> */}
        </View>

        <View className="mt-2 bg-txtwhite pb-5">
          <Text className="p-3 font-bold">Sản phẩm liên quan</Text>
          {/* {relevantState.loading && (
            <View className="items-center">
              <ActivityIndicator size="large" color={Colors.greenBackground} />
            </View>
          )} */}
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 6 }}
          >
            {relevantState.loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <View
                    style={{
                      width: (1 / 3) * (SCREEN_WIDTH - 12),
                      marginHorizontal: 2,
                    }}
                    key={index}
                  >
                    <ProductSkeleton />
                  </View>
                ))
              : relevantState.data.map((item) => (
                  <View
                    key={item.product_id}
                    style={{
                      width: (1 / 3) * (SCREEN_WIDTH - 12),
                      marginHorizontal: 2,
                    }}
                  >
                    <Product
                      {...item}
                      onPress={() =>
                        navigation.replace("ProductDetailScreen", {
                          id: item.product_id,
                        })
                      }
                    />
                  </View>
                ))}
          </ScrollView>
        </View>

        {/* Đánh giá SP */}
        <View className="mt-2 bg-txtwhite py-5">
          <View className="px-3">
            <Text className="font-bold text-base">Đánh giá sản phẩm</Text>
            {reviewState.loading && (
              <View className="items-center p-3">
                <ActivityIndicator
                  size="large"
                  color={Colors.greenBackground}
                />
              </View>
            )}
            <View className="flex-row items-baseline">
              {/* Sao của SP */}
              <Start rating={product.rating} />
              <Text className="text-trieugreen text-base ml-3 font-bold">{`${product.rating}/5`}</Text>
              <Text className="text-xs text-black ml-1">{`(${reviewState.data.length} đánh giá)`}</Text>
            </View>
          </View>
          <LineSeparator />
          <View>
            {reviewState.data.map((review) => (
              <View key={review.reviewId}>
                <View className="flex-row px-3">
                  {/* Avater user */}
                  <View className="pt-1">
                    <ImageBackground
                      source={require("../../assets/images/user_placeholder.png")}
                      imageStyle={{ borderRadius: 999 }}
                    >
                      <Image
                        src={review.user_avater ?? defaultAvt(review.user_name)}
                        style={{ width: 32, height: 32 }}
                        className="rounded-full"
                      />
                    </ImageBackground>
                  </View>
                  <View className="ml-1.5">
                    {/* Tên user */}
                    <Text className="font-bold">{review.user_name}</Text>
                    {/* User Rating */}
                    <Start
                      rating={review.rating}
                      size="small"
                      style={{ marginTop: 4 }}
                    />
                    <View className="my-2.5">
                      {/* Title */}
                      <View className="flex-row">
                        <Text style={{ color: Colors.disabledText }}>
                          Tiêu đề:{" "}
                        </Text>
                        <Text>{review.title}</Text>
                      </View>
                      {/* Comment */}
                      {review.comment && (
                        <View className="flex-row">
                          <Text style={{ color: Colors.disabledText }}>
                            Nội dung:{" "}
                          </Text>
                          <Text className="leading-6 text-justify">
                            {review.comment}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-black text-xs font-medium">
                      {formatDateTime(review.created_at)}
                    </Text>
                  </View>
                </View>
                <LineSeparator />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
