import React from "react";
import { View, TouchableOpacity, Keyboard } from "react-native";
import { 
    Colors, 
    InputVerticalSeparator, 
    StyledTextInput, 
    Icon 
} from "../styles";

export const   ICON = {
    passwordVisibility: ['eye-off-outline', 'eye-outline'],
    password: "lock-closed-outline",
    clearText: "close-outline",
    mail: "mail-outline",
    user: "person-outline",
    phone: "call-outline",
}

const MyTextInput = ({headIcons, tailIcons, tailHandlers, setFieldValue, name, ...props} : 
    {headIcons?: string[], tailIcons?: string[], tailHandlers?: (()=>void)[], name: string, [key: string]: any}) => {
    return (
    <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}} >
        {headIcons?.map((icon: string, index: number) => (
            <React.Fragment key={`head-${index}`}>
                <View>
                    <Icon name={icon} size={25} color={Colors.black}/>
                </View>
                { index > 0 &&  <InputVerticalSeparator/>}
            </React.Fragment>
        ))}

        <StyledTextInput placeholderTextColor={Colors.placeholder} {...props} />

        {props.value?.length > 0 && 
            <TouchableOpacity onPressIn={()=> setFieldValue(name, '')} >
                <Icon name={ICON.clearText} size={25} color={Colors.black}/>
            </TouchableOpacity>
        }

        {tailIcons?.map((icon: string, index: number) => (
            <React.Fragment key={`tail-${index}`}>
                <TouchableOpacity onPressIn={tailHandlers ? tailHandlers[index] : undefined}>
                    <Icon name={icon} size={25} color={Colors.black}/>
                </TouchableOpacity>
                    { index < tailIcons.length - 1   &&  <InputVerticalSeparator/>}
            </React.Fragment>
        ))}
    </View>
    );
}

export default MyTextInput;