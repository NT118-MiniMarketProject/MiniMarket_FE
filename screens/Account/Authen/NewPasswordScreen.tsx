import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, View } from "react-native";
import Toast, { ToastOptions } from "react-native-root-toast";
import * as Yup from "yup";
import KeyboardAvoidingWrapper from "../../../components/Common/KeyboardAvoidingWrapper";
import MyTextInput, { ICON } from "../../../components/Common/MyTextInput";
import {
  Colors,
  ErrorText,
  FormContainer,
  GradientButtonTextContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledButton,
  StyledButtonText,
  StyledContainer,
  SubTitle,
  TextInputContainer,
  toastConfig,
} from "../../../components/styles";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Mật khẩu tối thiểu 8 và tối đa 32 kí tự")
    .max(32, "Mật khẩu tối thiểu 8 và tối đa 32 kí tự")
    .matches(
      /^[A-Za-z0-9@$!%*?&]+$/,
      "Mật khẩu chỉ chứa chữ thường, in hoa, số và các kí tự @ $ ! % * ? &"
    )
    .required("Mật khẩu bắt buộc nhập"),
});

const errorMsg = "Uiii, có lỗi rồi. Vui lòng thử lại sau";

const NewPasswordScreen = ({ navigation, route }: any) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { email } = route.params;
  console.log(">>> NewPassword: " + email);

  const setPasswordVisibleHandler = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleNewPassword = async ({ password }: { password: string }) => {
    setSubmitting(true);
    try {
      // call backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Toast.show(
        "Mật khẩu đã được thiết lập lại thành công",
        toastConfig as ToastOptions
      );
      navigation.navigate("AccountLoginScreen", { email });
    } catch (error) {
      Toast.show(errorMsg, toastConfig as ToastOptions);
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
          <PageTitle>Thiết Lập Mật Khẩu</PageTitle>
          <FormContainer>
            <Formik
              initialValues={{ password: "" }}
              onSubmit={(values, { setFieldValue }) => {
                setSubmitting(true);
                if (!values.password.trim()) {
                  values.password.trim() || setFieldValue("password", "");
                  Toast.show(
                    "Please fill all fields",
                    toastConfig as ToastOptions
                  );
                  setSubmitting(false);
                  return;
                }
                handleNewPassword(values);
              }}
              validationSchema={validationSchema}
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
                  setBtnDisable(!values.password || isSubmitting);
                }, [values.password, isSubmitting]);
                return (
                  <>
                    <View>
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
                          autoFocus={true}
                          onSubmitEditing={handleSubmit}
                        />
                      </TextInputContainer>
                      <ErrorText
                        error={
                          errors.password && touched.password ? true : false
                        }
                      >
                        {errors.password?.toString()}
                      </ErrorText>
                      <SubTitle className="text-13m mt-1">
                        Mật khẩu phải dài từ 8-32 kí tự, chỉ bao gồm chữ hoa,
                        chữ thường, số và các kí tự (@ $ ! % * ? &).
                      </SubTitle>
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
                          Tiếp theo
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
          </FormContainer>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default NewPasswordScreen;
