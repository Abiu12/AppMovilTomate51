import { StyleSheet, ActivityIndicator, StatusBar, View } from "react-native";
import MyText from "./MyText";
export default function LoaderButton() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#F5F5F5" />
    </View>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
