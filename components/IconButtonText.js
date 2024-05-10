import { Pressable, StyleSheet, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MyText from "./MyText";

export default function IconButtonText({ icon, label, onPress, isEnabled }) {
  return (
    <Pressable
      style={[styles.iconButton, !isEnabled && styles.disabledButton]}
      onPress={onPress}
      disabled={!isEnabled}
    >
      <FontAwesome5 name={icon} size={28} color="#C62426" />
      <MyText fontFamily={"Poppins"} text={label} fontSize={12} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderWidth: 3, // Agregar un borde alrededor del botón
    borderRadius: 5, // Opcional: agregar bordes redondeados
    borderColor: "#C62426", // Color del borde
  },
  disabledButton: {
    opacity: 0.2, // Cambiar la opacidad para indicar que está deshabilitado
  },
});
