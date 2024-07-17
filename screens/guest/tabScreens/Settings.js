import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import IconButtonText from "../../../components/IconButtonText";
import { useNavigation } from "@react-navigation/native";
import MyText from "../../../components/MyText";
import { useAuth } from "../../../AuthContext";

export default function Settings() {
  const { navigate } = useNavigation();
  const { setIsGuest } = useAuth();
  const handleCloseSession = () => {
    setIsGuest(false);
  };
  return (
    <View style={styles.container}>
      <View></View>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <MyText
          text={
            "Para tener la aplicación completa mande un email a                                      lizeth.intel@gmail.com"
          }
          fontFamily={"Poppins"}
          textAlign={"center"}
        />
      </View>

      <IconButtonText
        label={"Salir de la sesión de invitado"}
        icon={"chevron-circle-left"}
        onPress={handleCloseSession}
        isEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  row: {
    padding: 10,
    flexDirection: "row",
    marginBottom: 5,
  },
});
