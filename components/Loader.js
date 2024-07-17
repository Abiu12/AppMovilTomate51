import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import MyText from "./MyText";
export default function Loader() {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#C62426" />
      <MyText fontFamily={"Poppins"} text={"Cargando ...."} color={"black"} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
