import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FormContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledContainer,
  TextInputContainer,
  TextLink,
  Colors,
  StyledButton,
  StyledButtonText,
  Redirect,
  SubTitle,
  GradientButtonTextContainer,
  toastConfig,
  ErrorText,
} from "../../../components/styles";
import { StatusBar } from "expo-status-bar";
import { Formik, FormikProps } from "formik";
import {
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import MyTextInput, { ICON } from "../../../components/Common/MyTextInput";
import KeyboardAvoidingWrapper from "../../../components/Common/KeyboardAvoidingWrapper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../utils/types";
import axios from "axios";
import Toast, { ToastOptions } from "react-native-root-toast";
import * as Yup from "yup";

const domain = "https://minimarket-be.onrender.com";
const defaultErrMsg = "Ops! There's something wrong, try again later";

const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().required("Tên người dùng bắt buộc nhập"),
  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Sai định dạng email"
    )
    .test("is-lowercase", "Email không chứa chữ in hoa", (value) =>
      value ? value === value.toLowerCase() : true
    )
    .required("Email bắt buộc nhập"),
  phone: Yup.string()
    .matches(/^(0\d{9})$/, "Sai định dạng SĐT")
    .required("SĐT bắt buộc nhập"),
  password: Yup.string()
    .min(8, "Mật khẩu tối thiểu 8 và tối đa 32 kí tự")
    .max(32, "Mật khẩu tối thiểu 8 và tối đa 32 kí tự")
    .matches(
      /^[A-Za-z0-9@$!%*?&]+$/,
      "Mật khẩu chỉ chứa chữ thường, in hoa, số và các kí tự @ $ ! % * ? &"
    )
    .required("Mật khẩu bắt buộc nhập"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp")
    .required("Xác nhận mật khẩu bắt buộc nhập"),
});

const SignUpScreen = ({ navigation }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loginBtnDisable, setLoginBtnDisable] = useState(true);

  const formikRef = useRef<FormikProps<any>>(null);
  useFocusEffect(
    useCallback(() => {
      formikRef.current?.resetForm();
      // console.log('sign up form is reset')
    }, [])
  );

  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleSignUp = async (
    {
      name,
      email,
      phone,
      password,
    }: { name: string; email: string; phone: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    // url: https://minimarket-be.onrender.com/api/v1/auth/register
    const url = domain + "/api/v1/auth/register";
    try {
      const response = await axios.post(url, { name, email, phone, password });
      // console.log('>>> Response: ', response);
      const user = response.data?.user;
      if (user) {
        Toast.show("Sign up successfully", toastConfig as ToastOptions);
        navigation.navigate("AccountLoginScreen", { email });
      } else {
        Toast.show(defaultErrMsg, toastConfig as ToastOptions);
      }
    } catch (err) {
      // console.error('>>> Error: ', err);
      let msg = (err as any).response.data.msg ?? defaultErrMsg;
      Toast.show(msg, toastConfig as ToastOptions);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        {/* <StatusBar style='auto'/> Lỗi <Header/> bị đẩy xuống sau khi vào trang login rồi quay lại*/}
        <InnerContainer>
          <PageLogo
            source={require("../../../assets/images/brand-logo.png")}
            resizeMode="contain"
          />
          <PageTitle>Đăng ký</PageTitle>
          <SubTitle>Chào mừng bạn đến với GreenMart!</SubTitle>
          <FormContainer>
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                password: "",
                confirm_password: "",
              }}
              onSubmit={(values, { setSubmitting, setFieldValue }) => {
                if (
                  !values.name.trim() ||
                  !values.email.trim() ||
                  !values.phone.trim() ||
                  !values.password.trim() ||
                  !values.confirm_password.trim()
                ) {
                  values.name.trim() || setFieldValue("name", "");
                  values.email.trim() || setFieldValue("email", "");
                  values.phone.trim() || setFieldValue("phone", "");
                  values.password.trim() || setFieldValue("password", "");
                  values.confirm_password.trim() ||
                    setFieldValue("confirm_password", "");
                  Toast.show(
                    "Please fill all fields",
                    toastConfig as ToastOptions
                  );
                  setSubmitting(false);
                  return;
                }
                handleSignUp(values, setSubmitting);
              }}
              innerRef={formikRef}
              validationSchema={signUpValidationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setFieldValue,
                isSubmitting,
                errors,
                touched,
              }) => {
                useEffect(() => {
                  // update loginBtnDisabled whenever values.email or values.password changes
                  setLoginBtnDisable(
                    !(
                      values.name &&
                      values.email &&
                      values.phone &&
                      values.password &&
                      values.confirm_password
                    ) || isSubmitting
                  );
                }, [
                  values.name,
                  values.email,
                  values.phone,
                  values.password,
                  values.confirm_password,
                  isSubmitting,
                ]);
                return (
                  <>
                    <View>
                      <ScrollView keyboardShouldPersistTaps="always">
                        <TextInputContainer
                          error={errors.name && touched.name ? true : false}
                        >
                          <MyTextInput
                            name="name"
                            headIcons={[ICON.user]}
                            placeholder="Tên của bạn"
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                            setFieldValue={setFieldValue}
                            error={errors.name && touched.name ? true : false}
                          />
                        </TextInputContainer>
                        <ErrorText
                          error={errors.name && touched.name ? true : false}
                        >
                          {errors.name?.toString()}
                        </ErrorText>
                        <TextInputContainer
                          error={errors.email && touched.email ? true : false}
                        >
                          <MyTextInput
                            name="email"
                            headIcons={[ICON.mail]}
                            placeholder="Email"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            setFieldValue={setFieldValue}
                            keyboardType="email-address"
                            error={errors.email && touched.email ? true : false}
                          />
                        </TextInputContainer>
                        <ErrorText
                          error={errors.email && touched.email ? true : false}
                        >
                          {errors.email?.toString()}
                        </ErrorText>
                        <TextInputContainer
                          error={errors.phone && touched.phone ? true : false}
                        >
                          <MyTextInput
                            name="phone"
                            headIcons={[ICON.phone]}
                            placeholder="Số điện thoại"
                            onChangeText={handleChange("phone")}
                            onBlur={handleBlur("phone")}
                            value={values.phone}
                            setFieldValue={setFieldValue}
                            keyboardType="phone-pad"
                            error={errors.phone && touched.phone ? true : false}
                          />
                        </TextInputContainer>
                        <ErrorText
                          error={errors.phone && touched.phone ? true : false}
                        >
                          {errors.phone?.toString()}
                        </ErrorText>
                        <TextInputContainer
                          error={
                            errors.password && touched.password ? true : false
                          }
                        >
                          <MyTextInput
                            name="password"
                            headIcons={[ICON.password]}
                            tailIcons={[
                              passwordVisible
                                ? ICON.passwordVisibility[1]
                                : ICON.passwordVisibility[0],
                            ]}
                            tailHandlers={[
                              () => setPasswordVisible(!passwordVisible),
                            ]}
                            placeholder="Thiết lập mật khẩu"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry={!passwordVisible}
                            setFieldValue={setFieldValue}
                            error={
                              errors.password && touched.password ? true : false
                            }
                          />
                        </TextInputContainer>
                        <ErrorText
                          error={
                            errors.password && touched.password ? true : false
                          }
                        >
                          {errors.password?.toString()}
                        </ErrorText>
                        <TextInputContainer
                          error={
                            errors.confirm_password && touched.confirm_password
                              ? true
                              : false
                          }
                        >
                          <MyTextInput
                            name="confirm_password"
                            headIcons={[ICON.password]}
                            tailIcons={[
                              confirmPasswordVisible
                                ? ICON.passwordVisibility[1]
                                : ICON.passwordVisibility[0],
                            ]}
                            tailHandlers={[
                              () =>
                                setConfirmPasswordVisible(
                                  !confirmPasswordVisible
                                ),
                            ]}
                            placeholder="Xác nhận lại mật khẩu"
                            onChangeText={handleChange("confirm_password")}
                            onBlur={handleBlur("confirm_password")}
                            value={values.confirm_password}
                            secureTextEntry={!confirmPasswordVisible}
                            setFieldValue={setFieldValue}
                            error={
                              errors.confirm_password &&
                              touched.confirm_password
                                ? true
                                : false
                            }
                          />
                        </TextInputContainer>
                        <ErrorText
                          error={
                            errors.confirm_password && touched.confirm_password
                              ? true
                              : false
                          }
                        >
                          {errors.confirm_password?.toString()}
                        </ErrorText>
                      </ScrollView>
                    </View>
                    <StyledButton
                      onPress={() => {
                        Keyboard.dismiss();
                        handleSubmit();
                      }}
                      disabled={loginBtnDisable}
                    >
                      <GradientButtonTextContainer
                        colors={
                          loginBtnDisable
                            ? ["transparent", "transparent"]
                            : ["#11998e", "#38ef7d"]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      >
                        {isSubmitting && <ActivityIndicator color="#8e8e8e" />}
                        <StyledButtonText disabled={loginBtnDisable}>
                          Đăng ký
                        </StyledButtonText>
                      </GradientButtonTextContainer>
                    </StyledButton>
                  </>
                );
              }}
            </Formik>
            <Redirect>
              <Text style={{ marginRight: 5, color: Colors.black }}>
                Bạn đã có tài khoản?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AccountLoginScreen")}
              >
                <TextLink>Đăng nhập</TextLink>
              </TouchableOpacity>
            </Redirect>
          </FormContainer>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default SignUpScreen;
