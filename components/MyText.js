import React from "react";
import { Text, StyleSheet } from "react-native";

export default function MyText({
  text,
  color,
  fontSize,
  fontWeight,
  fontFamily,
  onPress,
  textAlign,
  textDecorationLine,
}) {
  return (
    <Text
      style={[
        styles.text,
        {
          color: color,
          fontSize: fontSize,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
          textAlign: textAlign,
          textDecorationLine: textDecorationLine,
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
    textAlign: "center",
  },
});
