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

//Components
import CardRecomendationAndAction from "../../components/CardRecomendationAndAction";
import NormalText from "../../components/NormalText";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MyText from "../../components/MyText";

export default function RecomendationsAndActions() {
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
    }, [isChecked])
  );

  async function fetchRecomendationsAndActions() {
    try {
      const response = await fetch(
        `${BASE_URL}/analizedImage/solutions/${idAnalizedImage}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setRecomendationsAndActions(data);
      }
    } catch (error) {
      this.toastAlert.show(`Hubo un error ${error}`, 800);
    }
  }

  //Aqui me quede, hay que validar la respuesta del backend
  async function changeStatus() {
    try {
      if (isChecked == true) {
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
        if (response.status === 200) {
          this.toastSuccess.show("\u2713 Estado actualizado con éxito ", 800);
        }
      } else if (isChecked == false) {
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
        if (response.status === 200) {
          this.toastSuccess.show("\u2713 Estado actualizado con éxito ", 800);
        }
      }
    } catch (error) {
      this.toastAlert.show(`Hubo un error ${error}`, 800);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 20 }}>
          <MyText
            fontFamily={"PoppinsBold"}
            text={"Recomendaciones y acciones"}
            fontSize={20}
            color={"#C62426"}
            textAlign={"center"}
          />
        </View>

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
            {!isChecked && <NormalText text={"Marcar como tratada:"} />}

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
