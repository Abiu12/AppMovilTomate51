import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function NormalText({
  text,
  textColor,
  fontWeigthText,
  align,
  textDecorationLine,
  onPress,
  fontSize,
}) {
  if (!fontSize) {
    fontSize = 15;
  }
  return (
    <Text
      style={[
        styles.text,
        {
          color: textColor,
          fontWeight: fontWeigthText,
          textAlign: align,
          textDecorationLine: textDecorationLine,
          fontSize: fontSize,
        },
      ]}
      onPress={onPress}
    >
      {text}
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    marginBottom: 5,
  },
});
