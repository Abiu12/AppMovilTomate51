import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import IconButton from "./IconButton";

export default function InputIcon({
  value,
  onChangeText,
  keyboardType,
  placeholder,
  paddingVertical,
  fontSize,
  borderColor,
  icon,
  sizeIcon,
  onPress,
  secureTextEntry,
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
      <View style={styles.row}>
        <View style={{ width: "85%" }}>
          <TextInput
            style={[styles.input, { fontSize: fontSize }]}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={secureTextEntry}
          />
        </View>

        <View style={styles.iconContainer}>
          <IconButton icon={icon} size={sizeIcon} onPress={onPress} />
        </View>
      </View>
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
  row: {
    flexDirection: "row",
  },
  iconContainer: {
    marginLeft: 10,
    alignSelf: "center",
  },
});
