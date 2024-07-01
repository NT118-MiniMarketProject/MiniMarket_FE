import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Formik, FormikProps } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast, { ToastOptions } from "react-native-root-toast";
import * as Yup from "yup";
import Breadcrumb from "../../components/Common/Breadcrumb";
import CustomInput from "../../components/Common/CustomInput";
import RadioButton from "../../components/Common/RadioButton";
import {
  Colors,
  ErrorText,
  GradientButtonTextContainer,
  StyledButton,
  StyledButtonText,
  toastConfig,
} from "../../components/styles";

const errorMsg = "Uiii, có lỗi rồi. Vui lòng thử lại sau";

const validationSchema = Yup.object().shape({
  feedback: Yup.string().required("Bạn vui lòng nhập nội dung"),
  name: Yup.string().required("Vui lòng nhập Họ và tên"),
  phone: Yup.string()
    .matches(/^(0\d{9})$/, "Số điện thoại không đúng định dạng!")
    .required("Vui lòng nhập số điện thoại"),
  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Sai định dạng email"
    )
    .test("is-lowercase", "Email không chứa chữ in hoa", (value) =>
      value ? value === value.toLowerCase() : true
    ),
  gender: Yup.string()
    .oneOf(["Anh", "Chị"], "Lựa chọn không hợp lệ")
    .required("Vui lòng chọn cách xưng hô"),
});

const FeedbackFormScreen = ({ navigation, route }: any) => {
  const [btnDisable, setBtnDisable] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  const formikRef = useRef<FormikProps<any>>(null);
  useFocusEffect(
    useCallback(() => {
      formikRef.current?.resetForm();
    }, [formikRef])
  );

  const handleSubmit = async ({
    feedback,
    gender,
    name,
    phone,
    email,
  }: {
    feedback: string;
    gender: string;
    name: string;
    phone: string;
    email: string;
  }) => {
    setSubmitting(true);
    const date = new Date();
    const datetime = date.toLocaleString();
    const data = {
      datetime,
      gender,
      name,
      phone,
      email,
      feedback,
    };
    console.log(data);
    axios
      .post(
        "https://sheet.best/api/sheets/b8768918-909c-40f0-a0ad-3a81e22be776",
        data
      )
      .then((response) => {
        // console.log(response);
        Toast.show(
          `Góp ý đã được gửi thành công. Cám ơn ${gender} đã đóng góp ý kiến`,
          toastConfig as ToastOptions
        );
        formikRef.current?.resetForm();
      })
      .catch((err) => {
        console.log(">>> FeedbackFormScreen ERR:", err);
        Toast.show(errorMsg, toastConfig as ToastOptions);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <View className="flex-1">
      <Formik
        initialValues={{
          feedback: "",
          gender: "Anh",
          name: "",
          phone: "",
          email: "",
        }}
        onSubmit={(values, { setFieldValue }) => {
          setSubmitting(true);
          if (
            !values.feedback.trim() ||
            !values.phone.trim() ||
            !values.name.trim()
          ) {
            values.feedback.trim() || setFieldValue("feedback", "");
            values.name.trim() || setFieldValue("name", "");
            values.phone.trim() || setFieldValue("phone", "");
            values.gender.trim() || setFieldValue("gender", "Anh");
            Toast.show(
              "Điền đầy đủ các thông tin bắt buộc",
              toastConfig as ToastOptions
            );
            setSubmitting(false);
            return;
          }
          handleSubmit(values);
        }}
        validationSchema={validationSchema}
        innerRef={formikRef}
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
            setBtnDisable(
              !(values.feedback && values.name && values.phone) || isSubmitting
            );
          }, [values.feedback, values.name, values.phone, isSubmitting]);

          return (
            <KeyboardAvoidingView className="flex-1">
              <Breadcrumb navigation={navigation} title="Góp ý / Liên hệ" />
              <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View className="bg-txtwhite mt-2 pt-3 px-2 pb-14">
                  <Text className="font-semibold text-center mt-2 mb-1 text-base">
                    GreenMart hân hạnh được hỗ trợ quý khách
                  </Text>

                  {/* nội dung feedback */}
                  <View style={styles.inputContainer}>
                    <CustomInput
                      label="Nội dung (xin quý khách mô tả chi tiết)"
                      value={values.feedback}
                      onChangeText={handleChange("feedback")}
                      onBlur={handleBlur("feedback")}
                      require
                      icon="edit-3"
                      error={errors.feedback && touched.feedback ? true : false}
                      multiline
                      labelColor={Colors.placeholder}
                      styledContainer="h-24"
                    />
                    <ErrorText
                      style={styles.errorText}
                      error={errors.feedback && touched.feedback ? true : false}
                    >
                      {errors.feedback?.toString()}
                    </ErrorText>
                  </View>

                  {/* Anh/Chị */}
                  <View style={styles.inputContainer}>
                    {/* Radio group */}
                    <View className="flex-row justify-between w-2/5">
                      <RadioButton
                        groupValue={values.gender}
                        label="Anh"
                        value="Anh"
                        radioGroup="gender"
                        setFieldValue={setFieldValue}
                      />
                      <RadioButton
                        groupValue={values.gender}
                        label="Chị"
                        value="Chị"
                        radioGroup="gender"
                        setFieldValue={setFieldValue}
                      />
                    </View>
                    <ErrorText
                      style={styles.errorText}
                      error={errors.gender && touched.gender ? true : false}
                    >
                      {errors.gender?.toString()}
                    </ErrorText>
                  </View>

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
                      error={errors.phone && touched.phone ? true : false}
                      styledContainer="h-14"
                    />
                    <ErrorText
                      style={styles.errorText}
                      error={errors.phone && touched.phone ? true : false}
                    >
                      {errors.phone?.toString()}
                    </ErrorText>
                  </View>

                  {/* email */}
                  <View style={styles.inputContainer}>
                    <CustomInput
                      label="Email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      icon="mail"
                      error={errors.email && touched.email ? true : false}
                      styledContainer="h-14"
                    />
                    <ErrorText
                      style={styles.errorText}
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
                        Gửi góp ý
                      </StyledButtonText>
                      {isSubmitting && (
                        <ActivityIndicator
                          color={Colors.disabledText}
                          className="absolute right-24"
                        />
                      )}
                    </GradientButtonTextContainer>
                  </StyledButton>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          );
        }}
      </Formik>
    </View>
  );
};

export default FeedbackFormScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  errorText: {
    marginLeft: 5,
  },
});
