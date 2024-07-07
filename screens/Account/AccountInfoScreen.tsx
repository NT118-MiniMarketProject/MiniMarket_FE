import { FontAwesome6, Fontisto } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast, { ToastOptions } from "react-native-root-toast";
import * as Yup from "yup";
import Breadcrumb from "../../components/Common/Breadcrumb";
import CustomInput from "../../components/Common/CustomInput";
import LoadingModal from "../../components/Common/LoadingModal";
import {
  Colors,
  ErrorText,
  GradientButtonTextContainer,
  StyledButton,
  StyledButtonText,
  toastConfig,
} from "../../components/styles";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateUser } from "../../store/features/Auth/userSlice";
import { tenmien } from "../../utils";
import { defaultAvt } from "../../utils/functions";

const errorMsg = "Uiii, có lỗi rồi. Vui lòng thử lại sau";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập Họ và tên"),
  phone: Yup.string()
    .matches(/^(0\d{9})$/, "Sai định dạng SĐT")
    .required("SĐT bắt buộc nhập"),
});

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const cityData = [
  { label: "TP Hồ Chí Minh", value: "TP Hồ Chí Minh" },
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
  { label: "Hải Phòng", value: "Hải Phòng" },
  { label: "Nha Trang", value: "Nha Trang" },
  { label: "Vũng Tàu", value: "Vũng Tàu" },
  { label: "Đà Lạt", value: "Đà Lạt" },
  { label: "Bến Tre", value: "Bến Tre" },
];

const districtData = [
  { label: "Quận 1", value: "Quận 1" },
  { label: "Quận 2", value: "Quận 2" },
  { label: "Quận 3", value: "Quận 3" },
  { label: "Quận 4", value: "Quận 4" },
  { label: "Quận 5", value: "Quận 5" },
  { label: "Quận 6", value: "Quận 6" },
  { label: "Quận 7", value: "Quận 7" },
  { label: "Quận 8", value: "Quận 8" },
];

const wardData = [
  { label: "Phường Bến Nghé", value: "Phường Bến Nghé" },
  { label: "Phường Bến Thành", value: "Phường Bến Thành" },
  { label: "Phường Cô Giang", value: "Phường Cô Giang" },
  { label: "Phường Cầu Kho", value: "Phường Cầu Kho" },
  { label: "Phường Cầu Ông Lãnh", value: "Phường Cầu Ông Lãnh" },
  { label: "Phường Nguyễn Cư Trinh", value: "Phường Nguyễn Cư Trinh" },
  { label: "Phường Nguyễn Thái Bình", value: "Phường Nguyễn Thái Bình" },
  { label: "Phường Phạm Ngũ Lão", value: "Phường Phạm Ngũ Lão" },
  { label: "Phường Tân Định", value: "Phường Tân Định" },
  { label: "Phường Đa Kao", value: "Phường Đa Kao" },
];

// const FormData = global.FormData;

const PANEL_WIDTH = 364.8;
const PANEL_HEIGHT = 626.5;

const AccountInfoScreen = ({ navigation, route }: any) => {
  // const {
  //   name = "",
  //   userId = "",
  //   uid = "",
  //   role = "",
  //   displayName = "",
  //   email = "",
  //   phoneNumber = "",
  // } = credential?.user ?? {};
  // const {
  //   photoURL = `https://eu.ui-avatars.com/api/?name=${
  //     name || displayName
  //   }&size=250`,
  // } = credential?.user ?? {};
  // auth().currentUser?.displayName
  // auth().currentUser?.email
  // auth().currentUser?.phoneNumber
  // auth().currentUser?.photoURL
  // auth().currentUser?.uid
  // auth().currentUser?.toJSON()

  // const [panelWidth, setPanelWidth] = useState(0);
  // const [panelHeight, setPanelHeight] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const userAddress =
    userState.data.address?.split(", ") ?? Array(4).fill(null);

  const handleSubmit = async ({
    name,
    city,
    district,
    ward,
    street,
    avater,
    phone,
  }: {
    name: string;
    city?: string | null;
    district?: string | null;
    ward?: string | null;
    street?: string | null;
    avater?: string | null;
    phone: string;
  }) => {
    try {
      let address = null;
      if (city && district && ward && street) {
        address = [street, ward, district, city].join(", ");
      }
      // console.log("Values: ", { name, address, avater });
      const data = userState.data.phone
        ? { name, address, avater }
        : { name, address, avater, phone };
      dispatch(updateUser({ name, address, avater, phone }));
    } catch (err) {
      console.log(">>> UpdateUserInfo ERR:", err);
      Toast.show(errorMsg, toastConfig as ToastOptions);
    }
  };

  const sheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%", "35%"], []);
  const handlePresentModalPress = useCallback(() => {
    sheetModalRef.current?.present();
  }, []);
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

  // console.log(userState.data);

  return (
    <View className="flex-1 bg-slate-200">
      {isUploadingImage && <LoadingModal />}
      <Formik
        initialValues={{
          name: userState.data.name,
          street: userAddress[0],
          ward: userAddress[1],
          district: userAddress[2],
          city: userAddress[3],
          avater: userState.data.avater,
          phone: userState.data.phone,
        }}
        onSubmit={(values, { setFieldValue }) => {
          if (!values.name.trim() || !values.phone.trim()) {
            values.name.trim() || setFieldValue("name", "");
            values.street?.trim() || setFieldValue("streetAddress", "");
            Toast.show(
              "Điền đầy đủ các thông tin bắt buộc",
              toastConfig as ToastOptions
            );
            return;
          }
          handleSubmit(values);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          useEffect(() => {
            setBtnDisable(!values.name || userState.loading);
          }, [values.name, userState.loading]);

          const placeholderAvt = defaultAvt(userState.data.name);

          // Pick from gallery
          const pickImage = async (mode: "gallery" | "camera") => {
            try {
              let result;
              if (mode === "gallery") {
                // No permissions request is necessary for launching the image library
                result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 1,
                });

                // console.log(">>> Image Picker Gallery:", result);
              } else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                  cameraType: ImagePicker.CameraType.front,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 1,
                });

                // console.log(">>> Image Picker Camera:", result);
              }

              if (!result.canceled) {
                // setFieldValue("avater", result.assets[0].uri);
                uploadImage(result.assets[0].uri);
              }
            } catch (err: any) {
              Toast.show(errorMsg, toastConfig as ToastOptions);
              console.log(">>> Image Picker Error:", err.message);
            }
          };

          // upload image to backend
          const uploadImage = async (imageUri: string) => {
            setIsUploadingImage(true);
            try {
              const formData = new FormData();
              formData.append("image", {
                uri: imageUri,
                type: "image/jpeg",
                name: "avater-image",
              });
              const res = await axios.post(`${tenmien}/user/showMe`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              const imageUrl = res.data.avater;
              // console.log(res.data);
              setFieldValue("avater", imageUri);
            } catch (err: any) {
              console.log(">>> upload image to BE Error:", err.message);
              Toast.show(errorMsg, toastConfig as ToastOptions);
            } finally {
              setIsUploadingImage(false);
            }
          };

          return (
            <>
              <KeyboardAvoidingView className="flex-1">
                <Breadcrumb
                  navigation={navigation}
                  title="Thông tin tài khoản"
                />
                <View className="flex-1">
                  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {/* head banner */}
                    <View
                      style={{
                        backgroundColor: "#B2C6AC",
                        height: 0.25 * SCREEN_HEIGHT,
                      }}
                    >
                      <ImageBackground
                        source={require("../../assets/images/profile_background.jpg")}
                        resizeMode="cover"
                        imageStyle={{}}
                        style={{
                          flex: 1,
                          width: "100%",
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </View>
                    <View style={{ height: PANEL_HEIGHT }}>
                      {/* Panel */}
                      <View
                        className="bg-slate-50 rounded-xl absolute p-2 pb-3"
                        style={{
                          width: 0.95 * SCREEN_WIDTH,
                          top: -50,
                          left: "50%",
                          transform: [{ translateX: -0.5 * PANEL_WIDTH }],
                          paddingTop: 85,
                          elevation: 6,
                        }}
                        // onLayout={(event) => {
                        //   setPanelWidth(event.nativeEvent.layout.width);
                        //   setPanelHeight(event.nativeEvent.layout.height);
                        // }}
                      >
                        {/* Avatar */}
                        <TouchableOpacity
                          onPress={handlePresentModalPress}
                          style={{
                            position: "absolute",
                            top: -165,
                            left: (PANEL_WIDTH - 150) / 2,
                            borderWidth: 2.5,
                            borderColor: "#cbd5e1",
                          }}
                          className="rounded-full"
                        >
                          <Image
                            source={{ uri: values.avater ?? placeholderAvt }}
                            style={{
                              width: 150,
                              height: 150,
                            }}
                            className="rounded-full"
                            resizeMode="cover"
                          />
                          <View className="bg-gray-300 rounded-full absolute w-9 h-9 items-center justify-center border-2 border-slate-300 bottom-2 right-2 opacity-95">
                            <FontAwesome6
                              name="edit"
                              size={19}
                              color="#2C3333"
                            />
                          </View>
                        </TouchableOpacity>
                        {/* Họ và tên */}
                        <View style={styles.inputContainer}>
                          <CustomInput
                            label="Họ và tên"
                            value={values.name}
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            autoCapitalize="words"
                            require
                            icon="user"
                            error={errors.name && touched.name ? true : false}
                            styledContainer="h-14"
                          />
                          <ErrorText
                            style={styles.errorText}
                            error={errors.name && touched.name ? true : false}
                          >
                            {errors.name?.toString()}
                          </ErrorText>
                        </View>

                        {/* Số điện thoại */}
                        <View style={styles.inputContainer}>
                          <CustomInput
                            label="Số điện thoại"
                            value={values.phone}
                            onChangeText={handleChange("phone")}
                            onBlur={handleBlur("phone")}
                            require
                            maxLength={10}
                            keyboardType="numeric"
                            icon="phone"
                            editable={userState.data.phone ? false : true}
                            styledContainer="h-14"
                          />
                          <ErrorText
                            error={errors.phone && touched.phone ? true : false}
                          >
                            {errors.phone?.toString()}
                          </ErrorText>
                        </View>

                        {/* email */}
                        <View style={styles.inputContainer}>
                          <CustomInput
                            label="Email"
                            value={userState.data.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            icon="mail"
                            editable={false}
                            styledContainer="h-14"
                          />
                          <ErrorText></ErrorText>
                        </View>

                        {/* Địa chỉ */}
                        <View
                          className="flex-row justify-between"
                          style={styles.inputContainer}
                        >
                          <View style={{ width: "49%" }}>
                            <Text style={styles.dropdownLabel}>
                              Tỉnh/ Thành phố
                            </Text>
                            <Dropdown
                              mode="modal"
                              style={[styles.dropdown]}
                              containerStyle={styles.dropdownContainer}
                              itemContainerStyle={styles.dropdownItemContainer}
                              itemTextStyle={styles.dropdownItemText}
                              placeholderStyle={styles.placeholderStyle}
                              selectedTextStyle={styles.selectedTextStyle}
                              inputSearchStyle={styles.inputSearchStyle}
                              iconStyle={styles.iconStyle}
                              data={cityData}
                              search
                              maxHeight={300}
                              labelField="label"
                              valueField="value"
                              activeColor="#70cda3"
                              placeholder="Chọn tỉnh/ thành"
                              searchPlaceholder="Tìm nhanh thành phố"
                              value={values.city}
                              onChange={(item) => {
                                setFieldValue("city", item.value);
                              }}
                              renderRightIcon={() => (
                                <FontAwesome6
                                  name="caret-down"
                                  size={20}
                                  color={Colors.greenBackground}
                                />
                              )}
                            />
                          </View>

                          <View style={{ width: "49%" }}>
                            <Text style={styles.dropdownLabel}>
                              Quận/ Huyện
                            </Text>
                            <Dropdown
                              mode="modal"
                              style={[styles.dropdown]}
                              containerStyle={styles.dropdownContainer}
                              itemContainerStyle={styles.dropdownItemContainer}
                              itemTextStyle={styles.dropdownItemText}
                              placeholderStyle={styles.placeholderStyle}
                              selectedTextStyle={styles.selectedTextStyle}
                              inputSearchStyle={styles.inputSearchStyle}
                              iconStyle={styles.iconStyle}
                              data={districtData}
                              search
                              maxHeight={300}
                              labelField="label"
                              valueField="value"
                              activeColor="#70cda3"
                              placeholder="Chọn quận/ huyện"
                              searchPlaceholder="Tìm nhanh quận huyện"
                              value={values.district}
                              onChange={(item) => {
                                setFieldValue("district", item.value);
                              }}
                              renderRightIcon={() => (
                                <FontAwesome6
                                  name="caret-down"
                                  size={20}
                                  color={Colors.greenBackground}
                                />
                              )}
                            />
                          </View>
                          <ErrorText></ErrorText>
                        </View>

                        <View className="mt-3">
                          <Text style={styles.dropdownLabel}>Phường/ Xã</Text>
                          <Dropdown
                            mode="modal"
                            style={[styles.dropdown]}
                            containerStyle={styles.dropdownContainer}
                            itemContainerStyle={styles.dropdownItemContainer}
                            itemTextStyle={styles.dropdownItemText}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={wardData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            activeColor="#70cda3"
                            placeholder="Chọn phường/ xã"
                            searchPlaceholder="Tìm nhanh phường xã"
                            value={values.ward}
                            onChange={(item) => {
                              setFieldValue("ward", item.value);
                            }}
                            renderRightIcon={() => (
                              <FontAwesome6
                                name="caret-down"
                                size={20}
                                color={Colors.greenBackground}
                              />
                            )}
                          />
                          <ErrorText></ErrorText>
                        </View>

                        <View>
                          <CustomInput
                            label="Số nhà, tên đường"
                            value={values.street}
                            onChangeText={handleChange("street")}
                            onBlur={handleBlur("street")}
                            autoCapitalize="words"
                            icon="map"
                            styledContainer="h-14"
                            labelColor={Colors.placeholder}
                          />
                          <ErrorText></ErrorText>
                        </View>

                        <StyledButton
                          onPress={() => {
                            Keyboard.dismiss();
                            handleSubmit();
                          }}
                          disabled={btnDisable}
                        >
                          <GradientButtonTextContainer
                            colors={
                              btnDisable
                                ? ["transparent", "transparent"]
                                : ["#11998e", "#38ef7d"]
                            }
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                          >
                            <StyledButtonText disabled={btnDisable}>
                              Lưu chỉnh sửa
                            </StyledButtonText>
                            {userState.loading && (
                              <ActivityIndicator
                                color={Colors.disabledText}
                                className="absolute right-20"
                              />
                            )}
                          </GradientButtonTextContainer>
                        </StyledButton>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </KeyboardAvoidingView>
              <BottomSheetModal
                ref={sheetModalRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                handleIndicatorStyle={{
                  backgroundColor: Colors.greenBackground,
                }}
              >
                <BottomSheetView className="flex-1">
                  <TouchableOpacity
                    onPress={() => {
                      pickImage("gallery");
                      dismissAll();
                    }}
                  >
                    <View className="flex-row p-2 items-center">
                      <View className="items-center justify-center bg-trieugreen p-3 rounded-full ">
                        <Fontisto name="photograph" size={24} color="#2C3333" />
                      </View>
                      <Text className="text-base ml-4">
                        Chọn từ thư viện ảnh
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      pickImage("camera");
                      dismissAll();
                    }}
                  >
                    <View className="flex-row p-2 items-center">
                      <View className="items-center justify-center bg-trieugreen p-3 rounded-full ">
                        <Fontisto name="camera" size={24} color="#2C3333" />
                      </View>
                      <Text className="text-base ml-4">Camera</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setFieldValue("avater", null);
                      dismissAll();
                    }}
                  >
                    <View className="flex-row p-2 items-center">
                      <View className="items-center justify-center bg-trieugreen p-3 rounded-full ">
                        <Fontisto name="trash" size={24} color="#2C3333" />
                      </View>
                      <Text className="text-base ml-4">Xoá ảnh</Text>
                    </View>
                  </TouchableOpacity>
                </BottomSheetView>
              </BottomSheetModal>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default AccountInfoScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  errorText: {
    marginLeft: 5,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.placeholder,
    borderWidth: 1.2,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  placeholderStyle: {
    fontSize: 13,
    color: Colors.placeholder,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    borderRadius: 8,
  },
  dropdownContainer: {
    borderRadius: 12,
    paddingTop: 5,
    paddingBottom: 35,
    width: 0.85 * SCREEN_WIDTH,
  },
  dropdownItemContainer: {
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
  },
  dropdownItemText: {
    fontSize: 14,
  },
  dropdownLabel: {
    position: "absolute",
    backgroundColor: "#f8fafc",
    color: Colors.black,
    left: 12,
    top: -10,
    zIndex: 999,
    fontSize: 13,
  },
});
