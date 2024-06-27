import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 14,
    color: "#888",
  },
  radioIndicator: {
    marginRight: 8,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  radioIndicatorSelected: {
    backgroundColor: "blue",
  },
});

const RadioItem = ({
  item,
  selected,
  onSelect,
}: {
  item: any;
  selected: any;
  onSelect: any;
}) => {
  return (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.container}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imgUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
      <View
        style={[
          styles.radioIndicator,
          selected === item.id && styles.radioIndicatorSelected,
        ]}
      />
    </TouchableOpacity>
  );
};

export default RadioItem;
