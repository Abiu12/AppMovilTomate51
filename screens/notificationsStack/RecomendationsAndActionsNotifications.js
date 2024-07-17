import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  View,
} from "react-native";

//Utils
import { BASE_URL } from "../../utils/config";

import CardRecomendationAndAction from "../../components/CardRecomendationAndAction";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MyText from "../../components/MyText";

export default function RecomendationsAndActionsNotifications() {
  const [recomendationsAndActions, setRecomendationsAndActions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    params: { idAnalizedImage, urlImage, date, status },
  } = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      fetchRecomendationsAndActions();
      if (status && status === "Tratada" && !isLoaded) {
        setIsChecked(true);
        setIsLoaded(true);
      }
      console.log(isChecked);
    }, [isChecked])
  );

  async function fetchRecomendationsAndActions() {
    const response = await fetch(
      `${BASE_URL}/analizedImage/solutions/${idAnalizedImage}`
    );
    if (response.status == 200) {
      const data = await response.json();
      setRecomendationsAndActions(data);
    }
  }

  async function changeStatus() {
    try {
      if (isChecked == true) {
        console.log("Cambio a no vista");
        setIsChecked(false);
        const response = await fetch(
          `${BASE_URL}/analizedImage/${idAnalizedImage}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Sin ver",
            }),
          }
        );
      } else if (isChecked == false) {
        console.log("Cambio a vista");
        setIsChecked(true);
        const response = await fetch(
          `${BASE_URL}/analizedImage/${idAnalizedImage}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Tratada",
            }),
          }
        );
      }
      this.toastSuccess.show("Estado actualizado con éxito \u2713", 800);
    } catch (error) {}
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyText
          fontFamily={"PoppinsBold"}
          text={"Recomendaciones y acciones"}
          fontSize={20}
          color={"#C62426"}
          textAlign={"center"}
        />

        <View style={styles.cardImage}>
          <Image
            source={{ uri: urlImage }}
            style={styles.image}
            resizeMode="cover"
          />
          <MyText
            fontFamily={"Poppins"}
            text={"Fecha: " + date}
            fontSize={15}
          />
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              alignItems: "center",
            }}
          >
            {!isChecked && (
              <MyText
                fontFamily={"Poppins"}
                text={"Marcar como tratada:"}
                fontSize={15}
              />
            )}

            <BouncyCheckbox
              size={35}
              fillColor="green"
              isChecked={isChecked}
              onPress={changeStatus}
              style={{
                marginLeft: 10,
              }}
            />
          </View>
        </View>

        {recomendationsAndActions.map((recomendationAndAction, index) => (
          <CardRecomendationAndAction
            key={index}
            recomendationAndAction={recomendationAndAction}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  footerContainer: {
    flexDirection: "row",
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 270, // Ancho de la imagen
    height: 270, // Alto de la imagen
    borderRadius: 8, // Borde redondeado
    marginBottom: 15,
    // margin: 5,
  },
  cardImage: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
});
