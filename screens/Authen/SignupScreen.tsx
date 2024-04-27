import React, { useState } from 'react';
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
    GradientButtonTextContainer
} from '../../components/styles';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { TouchableOpacity, Text, ScrollView, View} from 'react-native';
import MyTextInput, { ICON } from '../../components/Common/MyTextInput';
import KeyboardAvoidingWrapper from '../../components/Common/KeyboardAvoidingWrapper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';

const SignUpScreen = () => {
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
                            resizeMode='contain'/>
                    {/* <PageTitle>Đăng ký</PageTitle> */}
                    <SubTitle>Chào mừng bạn đến với GreenMart!</SubTitle>
                    <FormContainer>
                        <Formik
                            initialValues={{name: '', mail: '', phone: '', password: ''}}
                            onSubmit={values => alert(JSON.stringify(values, null, 2))} >

                            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue}) => {
                                const isFormFilled = () => {
                                    return (values.name && values.mail && values.phone && values.password);
                                };
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
                                                name='mail' 
                                                headIcons={[ICON.mail]}
                                                placeholder='Email'
                                                onChangeText={handleChange('mail')}
                                                onBlur={handleBlur('mail')}
                                                value={values.mail}
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
                                    <StyledButton onPress={() => handleSubmit()} disabled={!isFormFilled()}>
                                        <GradientButtonTextContainer
                                            colors={ !isFormFilled() ? ['transparent', 'transparent'] : ['#11998e', '#38ef7d'] }
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
                                            <StyledButtonText disabled={!isFormFilled()}>
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
                            <TouchableOpacity onPress={() => navigation.navigate("Đăng nhập")}>
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