import { Pressable, StyleSheet, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function IconButton({ icon, onPress, size }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <FontAwesome5 name={icon} size={size} color="#C62426" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});
