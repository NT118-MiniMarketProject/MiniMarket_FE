import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';

export const Colors = {
    primary: "#33B87C",
    greenBackground: "#46A679",
    white: "#EFFFFB",
    black: "#5C595B",
    placeholder: "#adacad",
    blue: "#2F89FC",
    yellow: "#F6EC72",
    disabledBtn: '#ccc',
    disabledText: '#8e8e8e',
    error: '#cc0000',
    
};

const btnBorderRadius = 7;
const titleSize = 30;
const subTitleSize = 16;
const btnTextSize = 17;
const inputTextSize = 14;
const linkTextSize = 14;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 35px 13px;
    padding-top: ${Constants.statusBarHeight + 10}px;
    background-color: ${Colors.greenBackground}; 
`;
export const InnerContainer = styled.View` 
    flex: 1;
    background-color: ${Colors.white};
    align-items: center;
    border-radius: 10px;
    padding-top: 30px;
    padding-bottom: 15px;
    padding-horizontal: 3px;
`;

export const PageLogo = styled.Image`
    width: 125px;
    height: 125px;
`;

export const PageTitle = styled.Text`
    font-size: ${titleSize}px;
    color: ${Colors.black};
    padding: 5px;
    letter-spacing: 1px;

`;

export const SubTitle = styled.Text`
    font-size: ${subTitleSize}px;
    color: ${Colors.black};
`;

export const FormContainer = styled.View`
    width: 96%;
    padding: 15px 3px 10px;
    align-items: 'stretch';
    flex: 1;
`;

interface TextInputContainerProps {
    error?: boolean;
};
export const TextInputContainer = styled.View<TextInputContainerProps>`
    flex-direction: row;
    align-items: center;
    padding: 8px 5px;
    margin: 5px 0;
    border-bottom-width: 0.4px;
    border-bottom-color: ${Colors.placeholder};
    ${props => props.error && `border-bottom-color: ${Colors.error};`}
`;

export const StyledTextInput = styled.TextInput`
    font-size: ${inputTextSize}px;
    flex: 1;
    padding: 0 5px;
`;

export const Icon = styled(Ionicons)`
    padding: 0 5px
`;

export const InputVerticalSeparator = styled.View`
    height: 60%;
    width: 0;
    border-left-width: 0.6px;
    border-left-color: ${Colors.placeholder};
    margin-left: 10px;
    margin-right: 10px;
`;

export const TextLink = styled.Text`
    color: ${Colors.blue};
    font-size: ${linkTextSize}px;
    ${props => props.disabled == true && `
        color: #8e8e8e;
    `}

`;

interface StyledButtonProps {
    thirdparty?: boolean;
}

export const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
    flex-direction: row;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin: 10px 5px;
    border-radius: ${btnBorderRadius}px;
    background-color: ${Colors.primary};
    
    ${props => props.disabled == true && `
        background-color: #ccc;
    `}

    ${props => props.thirdparty && `
        border-width: 1px;
        border-color: ${Colors.placeholder};
        position: relative;
        margin: 5px;
        background-color: transparent;
    `}
`;

export const GradientButtonTextContainer = styled(LinearGradient)`
    flex: 1;
    flex-direction: row;
    align-self: stretch;
    border-radius: ${btnBorderRadius}px;
    justify-content: center;
    align-items: center;
`;

interface StyledButtonTextProps {
    thirdparty?: boolean;
}

export const StyledButtonText = styled.Text<StyledButtonTextProps>`
    font-size: ${btnTextSize}px;
    color: ${Colors.white};
    padding: 5px;

    ${props => props.disabled == true && `
        color: #8e8e8e;
    `}

    ${props => props.thirdparty && `
        color: ${Colors.black};
    `}
`;

export const ThirdPartyLogo = styled.Image`
    width: 30px;
    height: 30px;
`;

export const ThirdPartyLogoContainer = styled.View`
    width: 50px;
    height: auto;
    position: absolute;
    left: 0;
    top:0;
    bottom: 0;
    justify-content: center;
    align-items: center;
`;

export const Redirect = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: auto;
`;

export const toastConfig = {
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    opacity: 0.7,
    textStyle: {
        fontSize: 14,
    },
    containerStyle: {
        width: 230,
        minHeight: 75,
        paddingHorizontal: 3,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
    }
}

interface ErrorTextProps {
    error?: boolean;
}

export const ErrorText = styled.Text<ErrorTextProps>`
    color: ${Colors.error};
    opacity: 0;
    font-size: 11px;
    ${props => props.error && `opacity: 1;`}
`