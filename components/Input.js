import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function Input({
  value,
  onChangeText,
  keyboardType,
  placeholder,
  paddingVertical,
  fontSize,
  borderColor,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.card,
        {
          paddingVertical: paddingVertical,
          borderColor: isFocused ? "#C62426" : borderColor,
        },
      ]}
    >
      <TextInput
        style={[styles.input, { fontSize: fontSize }]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 5,
    elevation: 2,
    borderWidth: 1,
  },
  input: {
    fontFamily: "Poppins",
    marginLeft: 10,
  },
});
