import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Formik, FormikProps } from "formik";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast, { ToastOptions } from "react-native-root-toast";
import * as Yup from "yup";
import KeyboardAvoidingWrapper from "../../../components/Common/KeyboardAvoidingWrapper";
import MyTextInput, { ICON } from "../../../components/Common/MyTextInput";
import Separator from "../../../components/Common/Separator";
import {
  Colors,
  ErrorText,
  FormContainer,
  GradientButtonTextContainer,
  Icon,
  InnerContainer,
  InputVerticalSeparator,
  PageLogo,
  PageTitle,
  Redirect,
  StyledButton,
  StyledButtonText,
  StyledContainer,
  SubTitle,
  TextInputContainer,
  TextLink,
  ThirdPartyLogo,
  ThirdPartyLogoContainer,
  toastConfig,
} from "../../../components/styles";
import { CredentialContext } from "../../../contexts/CredentialContext";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getUserInfo } from "../../../store/features/Auth/userSlice";

const domain = "https://minimarket-be.onrender.com";
const defaultErrMsg = "Ops! There's something wrong, try again later";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Sai định dạng email"
    )
    .test("is-lowercase", "Email không chứa chữ in hoa", (value) =>
      value ? value === value.toLowerCase() : true
    )
    .required("Email bắt buộc nhập"),
  password: Yup.string()
    .min(8, "Mật khẩu tối thiểu 8 và tối đa 32 kí tự")
    .max(32, "Mật khẩu tối thiểu 8 và tối đa 32 kí tự")
    .matches(
      /^[A-Za-z0-9@$!%*?&]+$/,
      "Mật khẩu chỉ chứa chữ thường, in hoa, số và các kí tự @ $ ! % * ? &"
    )
    .required("Mật khẩu bắt buộc nhập"),
});

const LoginScreen = ({ navigation, route }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginBtnDisable, setLoginBtnDisable] = useState(true);
  const { credential, setCredential } = useContext(CredentialContext);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSigningInGoogle, setIsSigningInGoogle] = useState(false);
  const [isSigningInFacebook, setIsSigningInFacebook] = useState(false);
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  const formikRef = useRef<FormikProps<any>>(null);

  useFocusEffect(
    useCallback(() => {
      formikRef.current?.resetForm();
      formikRef.current?.setFieldValue("email", route.params?.email);
    }, [formikRef, route.params?.email])
  );

  const setPasswordVisibleHandler = () => {
    setPasswordVisible(!passwordVisible);
  };

  // START Google Sign in
  const handleGoogleSignIn = async () => {
    try {
      //Phải chạy GoogleSigin.signOut() trước GoogleSignin.SignIn() mới xuất hiện cửa sổ chọn tk Google
      // await GoogleSignin.signOut();

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get the users ID toke
      const { idToken } = await GoogleSignin.signIn();
      // console.log(idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      throw e;
    }
  };

  const onGoogleBtnPress = async () => {
    setIsSigningInGoogle(true);
    try {
      const user = await handleGoogleSignIn();
      // setCredential({provider: "google", user: user.user}); // set trong onAuthStateChanged rồi
      // console.log(">>> USER ON PRESS: ", user);
      Toast.show("Sign in successfully!", toastConfig as ToastOptions);
    } catch (e: any) {
      console.warn(e);
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        Toast.show("Sign in was cancelled", toastConfig as ToastOptions);
      } else {
        Toast.show(defaultErrMsg, toastConfig as ToastOptions);
      }
    } finally {
      setIsSigningInGoogle(false);
    }
  };
  // END Google sign in

  // START email/password sign in
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // url: https://minimarket-be.onrender.com/api/v1/auth/login
    const url = domain + "/api/v1/auth/login";
    // email="test@gmail.com"; password="test123456";
    try {
      const response = await axios.post(url, { email, password });
      // console.log(">>> Response: ", { response });
      const user = response.data?.user;
      // console.log(">>> USER: ", { user });
      if (user) {
        Toast.show("Login successfully!", toastConfig as ToastOptions);
        // navigation.navigate('AccountScreen'); không cần navigate manual v nx vì stack được tạo lại tự động nên sẽ mặc định vào trang này
        setCredential({ provider: "password", user: user });
      } else {
        Toast.show(defaultErrMsg, toastConfig as ToastOptions);
      }
    } catch (err) {
      // console.warn(">>> Error: ", err);
      let msg = (err as any).response?.data?.msg ?? defaultErrMsg;
      Toast.show(msg, toastConfig as ToastOptions);
    } finally {
      setSubmitting(false);
    }
  };
  // END email/password sign in

  // useEffect(() => console.log(">>> UserState: ", userState), [userState]);
  useEffect(() => {
    if (credential) dispatch(getUserInfo());
  }, [credential]);

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        {/* <StatusBar style='auto'/> Lỗi <Header/> bị đẩy xuống sau khi vào trang login rồi quay lại*/}
        <InnerContainer>
          <PageLogo
            source={require("../../../assets/images/brand-logo.png")}
            resizeMode="contain"
          />
          <PageTitle>Đăng nhập</PageTitle>
          <SubTitle>GreenMart mừng bạn trở lại!</SubTitle>
          <FormContainer>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, { setFieldValue }) => {
                setSubmitting(true);
                if (!values.email.trim() || !values.password.trim()) {
                  values.email.trim() || setFieldValue("email", "");
                  values.password.trim() || setFieldValue("password", "");
                  Toast.show(
                    "Please fill all fields",
                    toastConfig as ToastOptions
                  );
                  setSubmitting(false);
                  return;
                }
                handleLogin(values);
              }}
              innerRef={formikRef}
              validationSchema={loginValidationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setFieldValue,
                errors,
                touched,
              }) => {
                useEffect(() => {
                  // update loginBtnDisabled whenever values.email or values.password changes
                  setLoginBtnDisable(
                    !(values.email && values.password) ||
                      isSubmitting ||
                      isSigningInGoogle ||
                      isSigningInFacebook
                  );
                }, [
                  values.email,
                  values.password,
                  isSubmitting,
                  isSigningInGoogle,
                  isSigningInFacebook,
                ]);
                return (
                  <>
                    <View>
                      <ScrollView keyboardShouldPersistTaps="always">
                        <TextInputContainer
                          error={errors.email && touched.email ? true : false}
                        >
                          <MyTextInput
                            name="email"
                            headIcons={[ICON.user]}
                            placeholder="Email"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            keyboardType="email-address"
                            setFieldValue={setFieldValue}
                            error={errors.email && touched.email ? true : false}
                          />
                        </TextInputContainer>
                        <ErrorText
                          error={errors.email && touched.email ? true : false}
                        >
                          {errors.email?.toString()}
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
                            tailHandlers={[setPasswordVisibleHandler]}
                            placeholder="Mật khẩu"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry={!passwordVisible}
                            setFieldValue={setFieldValue}
                            error={
                              errors.password && touched.password ? true : false
                            }
                          />
                          <InputVerticalSeparator />
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate(
                                "AccountForgotPasswordScreen",
                                { email: values.email }
                              )
                            }
                          >
                            <TextLink>Quên?</TextLink>
                          </TouchableOpacity>
                        </TextInputContainer>
                        <ErrorText
                          error={
                            errors.password && touched.password ? true : false
                          }
                        >
                          {errors.password?.toString()}
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
                        <StyledButtonText disabled={loginBtnDisable}>
                          Đăng nhập
                        </StyledButtonText>
                        {isSubmitting && (
                          <ActivityIndicator
                            color={Colors.disabledText}
                            className="absolute right-24"
                          />
                        )}
                      </GradientButtonTextContainer>
                    </StyledButton>
                  </>
                );
              }}
            </Formik>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity>
                <TextLink>Đăng nhập bằng SMS</TextLink>
              </TouchableOpacity>
            </View>

            <Separator label="HOẶC" />

            <StyledButton
              thirdparty
              onPress={onGoogleBtnPress}
              disabled={
                isSigningInGoogle || isSigningInFacebook || isSubmitting
              }
            >
              <ThirdPartyLogoContainer>
                {isSigningInGoogle || isSigningInFacebook || isSubmitting ? (
                  <Icon
                    size={30}
                    name="logo-google"
                    color={Colors.disabledText}
                  />
                ) : (
                  <ThirdPartyLogo
                    source={require("../../../assets/images/google.png")}
                  />
                )}
              </ThirdPartyLogoContainer>
              <StyledButtonText
                thirdparty
                disabled={
                  isSigningInGoogle || isSigningInFacebook || isSubmitting
                }
              >
                Đăng nhập với Google
              </StyledButtonText>
              {isSigningInGoogle && (
                <ActivityIndicator
                  color={Colors.disabledText}
                  className="absolute right-11"
                />
              )}
            </StyledButton>

            <StyledButton
              thirdparty
              disabled={
                isSigningInGoogle || isSigningInFacebook || isSubmitting
              }
            >
              <ThirdPartyLogoContainer>
                {isSigningInGoogle || isSigningInFacebook || isSubmitting ? (
                  <Icon
                    size={30}
                    name="logo-facebook"
                    color={Colors.disabledText}
                  />
                ) : (
                  <ThirdPartyLogo
                    source={require("../../../assets/images/facebook.png")}
                  />
                )}
              </ThirdPartyLogoContainer>
              <StyledButtonText
                thirdparty
                disabled={
                  isSigningInGoogle || isSigningInFacebook || isSubmitting
                }
              >
                Đăng nhập với Facebook
              </StyledButtonText>
              {isSigningInFacebook && (
                <ActivityIndicator
                  color={Colors.disabledText}
                  className="absolute right-8"
                />
              )}
            </StyledButton>

            <Redirect>
              <Text style={{ marginRight: 5, color: Colors.black }}>
                Bạn chưa có tài khoản?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AccountSignUpScreen")}
              >
                <TextLink>Đăng ký</TextLink>
              </TouchableOpacity>
            </Redirect>
          </FormContainer>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default LoginScreen;
