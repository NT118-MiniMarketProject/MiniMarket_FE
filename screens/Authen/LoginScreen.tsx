import React, { useState } from 'react';
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
    GradientButtonTextContainer
} from '../../components/styles';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, TouchableOpacity, Text, ScrollView} from 'react-native';
import Separator from '../../components/Common/Separator';
import MyTextInput, { ICON } from '../../components/Common/MyTextInput';
import KeyboardAvoidingWrapper from '../../components/Common/KeyboardAvoidingWrapper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';

const LoginScreen = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const setPasswordVisibleHandler = () => {
        setPasswordVisible(!passwordVisible);
    };

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style='auto'/>
                <InnerContainer>
                        <PageLogo source={
                            require('../../assets/images/brand-logo.png')}
                            resizeMode='contain'
                            />
                        {/* <PageTitle>Đăng nhập</PageTitle> */}
                        <SubTitle>GreenMart mừng bạn trở lại!</SubTitle>
                    <FormContainer>
                        <Formik
                            initialValues={{mail: '', password: ''}}
                            onSubmit={values => alert(JSON.stringify(values, null, 2))}
                            >
                            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue}) => {
                                const isFormFilled = () => {
                                    return (values.mail && values.password);
                                };
                                return (
                                    <>
                                    <View>
                                    <ScrollView keyboardShouldPersistTaps="always">
                                        <TextInputContainer>
                                            <MyTextInput
                                                name='mail' 
                                                headIcons={[ICON.user]}
                                                placeholder='Email'
                                                onChangeText={handleChange('mail')}
                                                onBlur={handleBlur('mail')}
                                                value={values.mail}
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
                                    <StyledButton onPress={() => handleSubmit()} disabled={!isFormFilled()}>
                                        <GradientButtonTextContainer
                                            colors={ !isFormFilled() ? ['transparent', 'transparent'] : ['#11998e', '#38ef7d'] }
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
                                            <StyledButtonText disabled={!isFormFilled()}>
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
                                <ThirdPartyLogo source={require('../../assets/images/google.png')} />
                            </ThirdPartyLogoContainer>
                            <StyledButtonText thirdparty>Đăng nhập với Google</StyledButtonText>
                        </StyledButton>

                        <StyledButton thirdparty>
                            <ThirdPartyLogoContainer>
                                <ThirdPartyLogo source={require('../../assets/images/facebook.png')} />
                            </ThirdPartyLogoContainer>
                            <StyledButtonText thirdparty>Đăng nhập với Facebook</StyledButtonText>
                        </StyledButton>

                        <Redirect>
                            <Text style={{marginRight: 5, color: Colors.black}}>Bạn chưa có tài khoản?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Đăng ký")}>
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