import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FormContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledContainer,
  TextInputContainer,
  Colors,
  StyledButton,
  StyledButtonText,
  GradientButtonTextContainer,
  toastConfig,
  ErrorText,
} from "../../../components/styles";
import { Formik, FormikProps } from "formik";
import { View, Keyboard, ActivityIndicator } from "react-native";
import MyTextInput, { ICON } from "../../../components/Common/MyTextInput";
import KeyboardAvoidingWrapper from "../../../components/Common/KeyboardAvoidingWrapper";
import axios from "axios";
import Toast, { ToastOptions } from "react-native-root-toast";
import { useFocusEffect } from "@react-navigation/native";
import * as Yup from "yup";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Sai định dạng email"
    )
    .test("is-lowercase", "Email không chứa chữ in hoa", (value) =>
      value ? value === value.toLowerCase() : true
    )
    .required("Email bắt buộc nhập"),
});

const ForgotPasswordScreen = ({ navigation, route }: any) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);

  const handleForgotPassword = async ({ email }: { email: string }) => {
    setSubmitting(true);
    try {
      // call backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigation.navigate("AccountEmailVerificationScreen", {
        email,
      });
    } catch (error) {
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
          <PageTitle>Gửi lại mật khẩu</PageTitle>
          <FormContainer>
            <Formik
              initialValues={{ email: route.params?.email || "" }}
              onSubmit={(values, { setFieldValue }) => {
                setSubmitting(true);
                if (!values.email.trim()) {
                  values.email.trim() || setFieldValue("email", "");
                  Toast.show(
                    "Please fill all fields",
                    toastConfig as ToastOptions
                  );
                  setSubmitting(false);
                  return;
                }
                handleForgotPassword(values);
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
                  setBtnDisable(!values.email || isSubmitting);
                }, [values.email, isSubmitting]);
                return (
                  <>
                    <View>
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
                          autoFocus={true}
                          onSubmitEditing={handleSubmit}
                        />
                      </TextInputContainer>
                      <ErrorText
                        error={errors.email && touched.email ? true : false}
                      >
                        {errors.email?.toString()}
                      </ErrorText>
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

export default ForgotPasswordScreen;
