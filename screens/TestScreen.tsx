import { View, Text } from "react-native";
import React from "react";
import Panel from "../components/Account/Panel";

const arr = [
  "Hỗ trợ khách hàng",
  "Tổng đài tư vấn",
  "Góp ý / Liên hệ",
  "Tìm kiếm siêu thị",
  "Các chính sách khác",
];

const TestScreen = () => {
  return (
    <View>
      <Panel>
        {arr.map((item, index) => (
          <View key={index}>
            <Text>{item}</Text>
          </View>
        ))}
      </Panel>
    </View>
  );
};

export default TestScreen;
