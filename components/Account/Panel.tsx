import React, { Children } from "react";
import { StyleSheet, Text, View } from "react-native";

const Panel = ({ title, children }: { title?: string; children: any }) => {
  const childrenCount = Children.count(children);
  return (
    <View className="bg-zinc-50 m-3 b-2 rounded-md" style={{ elevation: 5 }}>
      {title && (
        <Text className="font-bold border-b-1.2 p-2 border-slate-200 text-base">
          {title}
        </Text>
      )}
      {Children.map(children, (child, index) => (
        <View
          className={
            index < childrenCount - 1 ? "border-b-1.2 border-slate-200" : ""
          }
        >
          {child}
        </View>
      ))}
    </View>
  );
};

export default Panel;

const styles = StyleSheet.create({});
