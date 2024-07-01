import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const RadioButton = ({
  radioGroup,
  groupValue,
  label,
  value,
  setFieldValue,
  ...props
}: any) => {
  const [isSelected, setSelected] = useState(
    groupValue === value ? true : false
  );

  useEffect(() => {
    if (groupValue !== value) setSelected(false);
  }, [groupValue]);

  const handleSelected = () => {
    setSelected(true);
    setFieldValue(radioGroup, value);
  };

  return (
    <TouchableOpacity className="flex-row" onPress={handleSelected}>
      <View className="w-5 h-5 rounded-full border-primary border-1.2 p-0.5 mr-2">
        {isSelected && (
          <View className="bg-gree flex-1 rounded-full bg-trieugreen"></View>
        )}
      </View>
      <Text {...props}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
