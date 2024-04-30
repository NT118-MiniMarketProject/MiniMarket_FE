import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    toastConfig
} from '../../../components/styles';
import { StatusBar } from 'expo-status-bar';
import { Formik, FormikProps } from 'formik';
import { TouchableOpacity, Text, ScrollView, View, Keyboard, ActivityIndicator} from 'react-native';
import MyTextInput, { ICON } from '../../../components/Common/MyTextInput';
import KeyboardAvoidingWrapper from '../../../components/Common/KeyboardAvoidingWrapper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../utils/types';
import axios from 'axios';
import Toast, { ToastOptions } from 'react-native-root-toast';

const domain = "https://minimarket-be.onrender.com";
const defaultErrMsg = "Ops! There's something wrong, try again later";

const SignUpScreen = ({navigation} : any) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginBtnDisable, setLoginBtnDisable] = useState(true);
    
    const formikRef = useRef<FormikProps<any>>(null);
    useFocusEffect(useCallback(() => {
        formikRef.current?.resetForm();
        // console.log('sign up form is reset')
    }, []));

    const setPasswordVisibleHandler = () => {
        setPasswordVisible(!passwordVisible);
    };

    // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const handleSignUp = async ({name, email, phone, password} : {name: string, email: string, phone: string, password: string}, 
    setSubmitting: (isSubmitting: boolean) => void) => {
        // url: https://minimarket-be.onrender.com/api/v1/auth/register
        const url = domain + '/api/v1/auth/register';
        try {
            const response = await axios.post(url, {name, email, phone, password});
            // console.log('>>> Response: ', response);
            const user = response.data?.user;
            if(user) {
                Toast.show("Sign up successfully", toastConfig as ToastOptions);
                navigation.navigate('AccountLoginScreen', {email});
            }else {
                Toast.show(defaultErrMsg, toastConfig as ToastOptions);
            }
        }catch(err) {
            // console.error('>>> Error: ', err);
            let msg = (err as any).response.data.msg ?? defaultErrMsg;
            Toast.show(msg, toastConfig as ToastOptions);
        }finally {
            setSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style='auto'/>
                <InnerContainer>
                    <PageLogo source={
                            require('../../../assets/images/brand-logo.png')}
                            resizeMode='contain'/>
                    <PageTitle>Đăng ký</PageTitle>
                    <SubTitle>Chào mừng bạn đến với GreenMart!</SubTitle>
                    <FormContainer>
                        <Formik
                            initialValues={{name: '', email: '', phone: '', password: ''}}
                            onSubmit={(values, {setSubmitting, setFieldValue}) => {
                                if(!values.name.trim() || !values.email.trim() || !values.phone.trim() || !values.password.trim()) {
                                    values.name.trim() || setFieldValue('name', '');
                                    values.email.trim() || setFieldValue('email', '');
                                    values.phone.trim() || setFieldValue('phone', '');
                                    values.password.trim() || setFieldValue('password', '');
                                    Toast.show("Please fill all fields", toastConfig as ToastOptions);
                                    setSubmitting(false);
                                    return;
                                }
                                handleSignUp(values, setSubmitting);
                            }}
                            innerRef={formikRef}
                        >

                            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, isSubmitting}) => {
                                useEffect(() => {
                                    // update loginBtnDisabled whenever values.email or values.password changes
                                    setLoginBtnDisable(!(values.name && values.email && values.phone && values.password) || isSubmitting);
                                }, [values.name, values.email, values.phone, values.password, isSubmitting]);
                                return (
                                    <>
                                    <View>
                                    <ScrollView keyboardShouldPersistTaps="always">
                                        <TextInputContainer>
                                            <MyTextInput
                                                name='name' 
                                                headIcons={[ICON.user]}
                                                placeholder='Tên của bạn'
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                value={values.name}
                                                setFieldValue={setFieldValue}/>
                                        </TextInputContainer>
                                        <TextInputContainer>
                                            <MyTextInput
                                                name='email' 
                                                headIcons={[ICON.mail]}
                                                placeholder='Email'
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                setFieldValue={setFieldValue}
                                                keyboardType='email-address'/>
                                        </TextInputContainer>
                                        <TextInputContainer>
                                            <MyTextInput
                                                name='phone' 
                                                headIcons={[ICON.phone]}
                                                placeholder='Số điện thoại'
                                                onChangeText={handleChange('phone')}
                                                onBlur={handleBlur('phone')}
                                                value={values.phone}
                                                setFieldValue={setFieldValue}
                                                keyboardType='phone-pad'/>
                                        </TextInputContainer>
                                        <TextInputContainer>
                                            <MyTextInput
                                                name='password' 
                                                headIcons={[ICON.password]}
                                                tailIcons={[(passwordVisible?ICON.passwordVisibility[1]:ICON.passwordVisibility[0])]}
                                                tailHandlers={[setPasswordVisibleHandler]} 
                                                placeholder='Thiết lập mật khẩu'
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                secureTextEntry={!passwordVisible}
                                                setFieldValue={setFieldValue}/>
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
                                                Đăng ký
                                            </StyledButtonText>
                                        </GradientButtonTextContainer>
                                    </StyledButton>
                                    </>
                                )}
                            }

                        </Formik>
                        <Redirect>
                            <Text style={{marginRight: 5, color: Colors.black}}>Bạn đã có tài khoản?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("AccountLoginScreen")}>
                                <TextLink>Đăng nhập</TextLink>
                            </TouchableOpacity>
                        </Redirect>
                    </FormContainer>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

export default SignUpScreen;