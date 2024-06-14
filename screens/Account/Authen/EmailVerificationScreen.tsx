import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import KeyboardAvoidingWrapper from "../../../components/Common/KeyboardAvoidingWrapper";
import {
  InnerContainer,
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledButton,
  GradientButtonTextContainer,
  StyledButtonText,
  Colors,
  TextLink,
  toastConfig,
} from "../../../components/styles";
import CodeInput from "../../../components/Common/CodeInput";
import { number } from "yup";
import { TouchableOpacity } from "react-native-gesture-handler";
import { roundToNearestPixel } from "nativewind";
import Toast, { ToastOptions } from "react-native-root-toast";

const errorMsg = "Uiii, có lỗi rồi. Vui lòng thử lại sau";

const EmailVerificationScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const COUNT_DOWN = 60;
  const [timer, setTimer] = useState(COUNT_DOWN);
  const [code, setCode] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCode, setResendCode] = useState(false);
  const { email, maxDigits = 4 } = route.params;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (true) {
        navigation.replace("AccountNewPasswordScreen", { email });
      } else {
        Toast.show("Mã không hợp lệ", toastConfig as ToastOptions);
      }
    } catch (err) {
      Toast.show(errorMsg, toastConfig as ToastOptions);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setBtnDisable(code.length < maxDigits || isSubmitting);
  }, [code, isSubmitting]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendCode(true);
    }
  }, [timer]);

  const TriggerTimer = () => {
    setTimer(COUNT_DOWN);
    setResendCode(false);
  };

  const HandleResendCode = () => {
    TriggerTimer();

    // call backend
  };

  useEffect(() => TriggerTimer(), []);

  return (
    <KeyboardAvoidingWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <StyledContainer>
          <InnerContainer>
            <PageLogo
              source={require("../../../assets/images/brand-logo.png")}
              resizeMode="contain"
            />
            <PageTitle className="text-2xl">Nhập mã xác minh</PageTitle>
            <SubTitle className="text-sm mt-2">
              Mã xác thực (OTP) đã được gửi qua{" "}
              <Text className="font-semibold">Email</Text>
            </SubTitle>
            <SubTitle className="mt-2 font-semibold text-base">
              {email}
            </SubTitle>
            <CodeInput
              maxDigits={maxDigits}
              code={code}
              setCode={setCode}
              onSubmitEditing={handleSubmit}
            />
            <StyledButton
              className="w-11/12"
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

            {resendCode ? (
              <View className="flex-row">
                <SubTitle className="text-sm">
                  Bạn vẫn chưa nhận được mã xác thực?{" "}
                </SubTitle>
                <TouchableOpacity
                  className="ml-1"
                  onPress={HandleResendCode}
                  disabled={isSubmitting}
                >
                  <TextLink className="font-medium" disabled={isSubmitting}>
                    Gửi lại
                  </TextLink>
                </TouchableOpacity>
              </View>
            ) : (
              <SubTitle className="text-sm">
                Vui lòng chờ{" "}
                <Text
                  className="font-semibold"
                  style={{ color: Colors.primary }}
                >
                  {timer}
                </Text>{" "}
                giây để gửi lại mã xác thực
              </SubTitle>
            )}
          </InnerContainer>
        </StyledContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingWrapper>
  );
};

export default EmailVerificationScreen;

const styles = StyleSheet.create({
  test: {
    backgroundColor: "red",
    flex: 1,
  },
});
