import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Colors, SubTitle } from "../styles";

const CodeInput = ({
  maxDigits,
  code,
  setCode,
  onSubmitEditing,
  ...props
}: {
  maxDigits: number;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  onSubmitEditing: () => Promise<void>;
}) => {
  const textInputRef = useRef(null);

  const CodeInputHandler = (newCode: string) => {
    const inp = parseInt(newCode);
    if (isNaN(inp) || inp < 0) {
      setCode("");
    } else {
      const str = inp.toString();
      setCode(str.substring(0, maxDigits));
    }
  };

  return (
    <View
      className="items-center justify-center self-stretch my-3"
      style={{ ...props }}
    >
      <View className="flex-row items-center justify-between w-9/12">
        {Array.from({ length: maxDigits }).map((_, index) => (
          <View
            key={index}
            className="border-b-2 border-b-zinc-300 justify-end items-center p-2 pb-0"
            style={
              index === code.length ||
              (index === maxDigits - 1 && code.length === maxDigits)
                ? { borderBottomColor: Colors.black, minWidth: "15%" }
                : { minWidth: "15%" }
            }
          >
            <SubTitle className="text-4xl text-center">
              {code.length > index ? code[index] : " "}
            </SubTitle>
          </View>
        ))}
      </View>
      {/* Hidden TextInput */}
      <TextInput
        style={{ fontSize: 1 }}
        className="w-9/12 absolute opacity-0 h-full"
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        returnKeyType="done"
        maxLength={maxDigits}
        ref={textInputRef}
        value={code}
        onChangeText={CodeInputHandler}
        autoFocus={true}
        caretHidden={true}
        onSubmitEditing={() => {
          if (code.length < maxDigits) {
            Keyboard.dismiss;
          } else {
            onSubmitEditing();
          }
        }}
      />
    </View>
  );
};

export default CodeInput;

const styles = StyleSheet.create({});
