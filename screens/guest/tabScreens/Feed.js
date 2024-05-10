import { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// "react-native-reanimated": "3.6.2",

//utils
import { BASE_URL } from "../../../utils/config";
import SearchInput from "../../../components/SearchInput";
import MyText from "../../../components/MyText";
import IconButtonText from "../../../components/IconButtonText";
import { useAuth } from "../../../AuthContext";

export default function Feed() {
  const { navigate } = useNavigation();

  const { setIsGuest } = useAuth();

  let idFarmer = 8;

  useEffect(() => {
    // fetchFarmer();
    // fetchGreenhouses();
  }, []);
  function handleCloseSession() {
    // console.log("Entre a cerrar sesion");

    setIsGuest(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <MyText
            fontFamily={"PoppinsBold"}
            text={"Bienvenido a la app"}
            fontSize={20}
          />
          {/* <TopText text={farmer.nombre + " " + farmer.primer_apellido + " " + farmer.segundo_apellido} textColor={"#C62426"} /> */}

          <MyText
            fontFamily={"Poppins"}
            text={"¡Analiza una imagen!"}
            fontSize={15}
          />

          <IconButtonText
            label={"Cerrar sesión"}
            icon={"chevron-circle-left"}
            onPress={handleCloseSession}
            isEnabled={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
