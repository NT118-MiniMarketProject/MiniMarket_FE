import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native";

const KeyboardAvoidingWrapper = ({children}: {children: React.ReactNode}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}} >
            <ScrollView contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps="always">
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default KeyboardAvoidingWrapper;