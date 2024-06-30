import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialIcons";

interface ResultModalProps {
  isVisible: boolean;
  status: "success" | "error" | "warning";
  text: string;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isVisible,
  status,
  text,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getIconName = () => {
    switch (status) {
      case "success":
        return "check-circle";
      case "error":
        return "error";
      case "warning":
        return "warning";
      default:
        return "info";
    }
  };

  const iconColor = () => {
    switch (status) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "warning":
        return "yellow";
      default:
        return "white";
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={onClose}
      backdropColor="transparent"
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
    >
      <View style={styles.modalContent}>
        <Icon name={getIconName()} size={50} color={"white"} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
  },
  text: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  },
});

export default ResultModal;
