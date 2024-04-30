import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import {
    FormContainer,
    InputVerticalSeparator,
    InnerContainer,
    PageLogo,
    PageTitle,
    StyledContainer,
    TextInputContainer,
    TextLink,
    Colors,
    StyledButton,
    StyledButtonText,
    ThirdPartyLogo,
    ThirdPartyLogoContainer,
    Redirect,
    SubTitle,
    GradientButtonTextContainer,
    toastConfig
} from '../../../components/styles';
import { StatusBar } from 'expo-status-bar';
import { Formik, FormikProps } from 'formik';
import { View, TouchableOpacity, Text, ScrollView, Keyboard, ActivityIndicator} from 'react-native';
import Separator from '../../../components/Common/Separator';
import MyTextInput, { ICON } from '../../../components/Common/MyTextInput';
import KeyboardAvoidingWrapper from '../../../components/Common/KeyboardAvoidingWrapper';
import axios from 'axios';
import Toast, { ToastOptions } from 'react-native-root-toast';
import { useFocusEffect } from '@react-navigation/native';
import { CredentialContext } from '../../../contexts/CredentialContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const domain = "https://minimarket-be.onrender.com";
const defaultErrMsg = "Ops! There's something wrong, try again later";

const LoginScreen = ({navigation, route} : any) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginBtnDisable, setLoginBtnDisable] = useState(true);
    const {setCredential} = useContext(CredentialContext);
    
    const formikRef = useRef<FormikProps<any>>(null);
    useFocusEffect(useCallback(() => {
        formikRef.current?.resetForm();
        // console.log('sign up form is reset')
    }, []));

    const setPasswordVisibleHandler = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async ({email, password} : {email: string, password: string}, setSubmitting: (isSubmitting: boolean) => void) => {
        // url: https://minimarket-be.onrender.com/api/v1/auth/login
        const url = domain + '/api/v1/auth/login';
        // email="test@gmail.com"; password="test123456";
        try {
            const response = await axios.post(url, {email, password});
            // console.log('>>> Response: ', response);
            const user = response.data?.user;
            if(user) {
                Toast.show("Login successfully!", toastConfig as ToastOptions);
                // navigation.navigate('AccountScreen'); không cần navigate manual v nx vì stack được tạo lại tự động nên sẽ mặc định vào trang này
                await persistLogin(user);
            }else {
                Toast.show(defaultErrMsg, toastConfig as ToastOptions);
            }
        }catch(err) {
            // console.error('>>> Error: ', err);
            let msg = (err as any).response?.data?.msg ?? defaultErrMsg;
            Toast.show(msg, toastConfig as ToastOptions);
        }finally {
            setSubmitting(false);
        }
    };

    const persistLogin = async (credential : any) => {
        try {
            await AsyncStorage.setItem('credential', JSON.stringify(credential));
            setCredential(credential);
        }catch(e) {
            console.error('Persist login failed: ', e);
        }   
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                {/* <StatusBar style='auto'/> Lỗi <Header/> bị đẩy xuống sau khi vào trang login rồi quay lại*/} 
                <InnerContainer>
                        <PageLogo source={
                            require('../../../assets/images/brand-logo.png')}
                            resizeMode='contain'
                            />
                        <PageTitle>Đăng nhập</PageTitle>
                        <SubTitle>GreenMart mừng bạn trở lại!</SubTitle>
                    <FormContainer>
                        <Formik
                            initialValues={{email: route.params?.email || '', password: ''}}
                            onSubmit={(values, {setSubmitting, setFieldValue}) => {
                                if(!values.email.trim() || !values.password.trim()) {
                                    values.email.trim() || setFieldValue('email', '');
                                    values.password.trim() || setFieldValue('password', '');
                                    Toast.show("Please fill all fields", toastConfig as ToastOptions);
                                    setSubmitting(false);
                                    return;
                                }
                                handleLogin(values, setSubmitting);
                            }}
                            innerRef={formikRef}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, isSubmitting}) => {
                                useEffect(() => {
                                    // update loginBtnDisabled whenever values.email or values.password changes
                                    setLoginBtnDisable(!(values.email && values.password) || isSubmitting);
                                }, [values.email, values.password, isSubmitting]);
                                return (
                                    <>
                                    <View>
                                    <ScrollView keyboardShouldPersistTaps="always">
                                        <TextInputContainer>
                                            <MyTextInput
                                                name='email' 
                                                headIcons={[ICON.user]}
                                                placeholder='Email'
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                keyboardType="email-address"
                                                setFieldValue={setFieldValue}/>
                                        </TextInputContainer>
                                        <TextInputContainer>
                                            <MyTextInput
                                                name='password' 
                                                headIcons={[ICON.password]}
                                                tailIcons={[(passwordVisible?ICON.passwordVisibility[1]:ICON.passwordVisibility[0])]}
                                                tailHandlers={[setPasswordVisibleHandler]} 
                                                placeholder='Mật khẩu'
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                secureTextEntry={!passwordVisible}
                                                setFieldValue={setFieldValue}/>
                                            <InputVerticalSeparator/>
                                            <TouchableOpacity>
                                                <TextLink>Quên?</TextLink>
                                            </TouchableOpacity>
                                        </TextInputContainer>
                                    </ScrollView>
                                    </View>
                                    <StyledButton onPress={() => {
                                        Keyboard.dismiss();
                                        handleSubmit();
                                    }} 
                                    disabled={loginBtnDisable}>
                                        <GradientButtonTextContainer
                                            colors={ loginBtnDisable ? ['transparent', 'transparent'] : ['#11998e', '#38ef7d'] }
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
                                            {isSubmitting && <ActivityIndicator color="#8e8e8e"/>}
                                            <StyledButtonText disabled={loginBtnDisable}>
                                                Đăng nhập
                                            </StyledButtonText>
                                        </GradientButtonTextContainer>
                                    </StyledButton>
                                    </>
                                );
                            }}
                        </Formik>
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity>
                                <TextLink>Đăng nhập bằng SMS</TextLink>
                            </TouchableOpacity>
                        </View>

                        <Separator label='HOẶC'/> 

                        <StyledButton thirdparty>
                            <ThirdPartyLogoContainer>
                                <ThirdPartyLogo source={require('../../../assets/images/google.png')} />
                            </ThirdPartyLogoContainer>
                            <StyledButtonText thirdparty>Đăng nhập với Google</StyledButtonText>
                        </StyledButton>

                        <StyledButton thirdparty>
                            <ThirdPartyLogoContainer>
                                <ThirdPartyLogo source={require('../../../assets/images/facebook.png')} />
                            </ThirdPartyLogoContainer>
                            <StyledButtonText thirdparty>Đăng nhập với Facebook</StyledButtonText>
                        </StyledButton>

                        <Redirect>
                            <Text style={{marginRight: 5, color: Colors.black}}>Bạn chưa có tài khoản?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("AccountSignUpScreen")}>
                                <TextLink>Đăng ký</TextLink>
                            </TouchableOpacity>
                        </Redirect>
                    </FormContainer>
                    
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

export default LoginScreen;