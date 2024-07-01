import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

const KeyboardAvoidingWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="always"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
