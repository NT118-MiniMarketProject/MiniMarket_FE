import React, { memo } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import {
  Colors,
  GradientButtonTextContainer,
  StyledButton,
  StyledButtonText,
} from "../styles";

const GradientButton = ({
  onPress,
  disabled = false,
  title,
  submitting = false,
  style = {},
  textStyle = {},
}: {
  onPress: () => void;
  disabled?: boolean;
  title: string;
  submitting?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <GradientButtonTextContainer
        colors={
          disabled ? ["transparent", "transparent"] : ["#11998e", "#38ef7d"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={style}
      >
        <StyledButtonText disabled={disabled} style={textStyle}>
          {title}
        </StyledButtonText>
        {submitting && (
          <ActivityIndicator
            color={Colors.disabledText}
            className="absolute right-24"
          />
        )}
      </GradientButtonTextContainer>
    </TouchableOpacity>
  );
};

export default memo(GradientButton);

const styles = StyleSheet.create({});
