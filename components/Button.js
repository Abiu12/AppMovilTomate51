import React from "react";
import { Pressable, StyleSheet } from "react-native";
import MyText from "./MyText";
import LoaderButton from "./LoaderButton";

export default function Button({ onPress, text, disabled, activeLoader }) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.buttonDisabled]} // Aplicar estilo condicional para opacidad
      onPress={onPress}
      disabled={disabled}
    >
      {activeLoader ? (
        <LoaderButton></LoaderButton>
      ) : (
        <MyText
          text={text}
          fontFamily={"Arial"}
          fontWeight={"bold"}
          fontSize={15}
          color={"white"}
          textAlign={"center"}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#C62426",
    borderRadius: 10,
    padding: 20,
    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.4, // Opacidad reducida cuando está deshabilitado
  },
});
