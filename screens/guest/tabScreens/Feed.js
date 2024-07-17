import React, { useState } from "react";
import { View, StyleSheet, Platform, Image, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

//utils
import { BASE_URL } from "../../../utils/config";
import MyText from "../../../components/MyText";
import IconButtonText from "../../../components/IconButtonText";
import { useAuth } from "../../../AuthContext";
//Animations
import * as Animatable from "react-native-animatable";

import * as ImagePicker from "expo-image-picker";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import Loader from "../../../components/Loader";
import CardRecomendationAndAction from "../../../components/CardRecomendationAndAction";

export default function Feed() {
  const { navigate } = useNavigation();
  const { setIsGuest } = useAuth();
  const [urlImageDetected, setUrlImageDetected] = useState();
  const [token, setToken] = useState("");
  const [recomendationsActions, setRecomendationsActions] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      registerForPushNotificationsAsync();
      console.log(urlImageDetected);
    }, [urlImageDetected])
  );

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      sendImageToBackend(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      sendImageToBackend(result.assets[0].uri);
    }
  };

  const sendImageToBackend = async (uriImagen) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: uriImagen,
        name: "image.jpg",
        type: "image/jpeg",
      });

      console.log(token);
      const response = await fetch(`${BASE_URL}/analyzeimage/${token}`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        const dataResponse = await response.json();
        //Saco la url
        setUrlImageDetected(dataResponse.body.urlImage);
        //Ya tengo los nombres detectados
        console.log("Nombres detectados", dataResponse.body.detected.names);

        const responseActionsRecomendations = await fetch(
          `${BASE_URL}/analizedImage/solutionsGuests`,
          {
            method: "POST",
            body: JSON.stringify({
              detected: dataResponse.body.detected.names,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const dataResponseActionsRecomendations =
          await responseActionsRecomendations.json();
        setRecomendationsActions(dataResponseActionsRecomendations);
      } else if (response.status === 404) {
        this.toastSuccess.show(
          `No se ha detectado alguna enfermedad o plaga en la imagen`,
          800
        );
      }
    } catch (error) {
      this.toastAlert.show(`Hubo un error, intente mas tarde ${error}`, 800);
      console.log(error);
    }
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      // console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
    setToken(token.data);
  };

  if (!token) {
    return <Loader></Loader>;
  } else {
    if (urlImageDetected && recomendationsActions) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={{ marginBottom: "5%" }}>
              <MyText
                fontFamily={"PoppinsBold"}
                text={"¡Alerta!"}
                fontSize={20}
                textAlign={"center"}
                color={"#C62426"}
              />

              <MyText
                fontFamily={"Poppins"}
                text={"Se ha detectado lo siguiente en tu imagen:"}
                fontSize={15}
                textAlign={"left"}
              />
            </View>
            {urlImageDetected && recomendationsActions && (
              <View>
                <View style={styles.cardImage}>
                  <Image
                    source={{ uri: urlImageDetected }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  {recomendationsActions.map(
                    (recomendationAndAction, index) => (
                      <CardRecomendationAndAction
                        key={index}
                        recomendationAndAction={recomendationAndAction}
                      />
                    )
                  )}
                </View>
              </View>
            )}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Animatable.View
                animation="swing"
                iterationDelay={1000}
                iterationCount="infinite"
              >
                <MyText
                  fontFamily={"Poppins"}
                  text={"¡Analiza una imagen!"}
                  fontSize={15}
                  textAlign={"center"}
                />
              </Animatable.View>
              <Animatable.View
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
              >
                <View style={{ flexDirection: "row" }}>
                  <IconButtonText
                    label={"Toma una foto"}
                    icon={"camera-retro"}
                    onPress={handleTakePhoto}
                    isEnabled={true}
                  />
                  <IconButtonText
                    label={"Selecciona una foto"}
                    icon={"file-image"}
                    onPress={handlePickImage}
                    isEnabled={true}
                  />
                </View>
              </Animatable.View>
            </View>

            <MyText
              fontFamily={"Poppins"}
              text={
                "¡Usted está en una sesión de invitado, cualquier imagen que suba no será guardada!"
              }
              fontSize={15}
              textAlign={"left"}
            />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.container}>
          <View>
            <MyText
              fontFamily={"PoppinsBold"}
              text={"Bienvenido a la app"}
              fontSize={20}
              textAlign={"center"}
            />

            <MyText
              fontFamily={"Poppins"}
              text={
                "¡Usted está en una sesión de invitado, cualquier imagen que suba no será guardada!"
              }
              fontSize={15}
              textAlign={"left"}
            />
          </View>
          {urlImageDetected && recomendationsActions && (
            <View>
              <View style={styles.cardImage}>
                <Image
                  source={{ uri: urlImageDetected }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View>
                {recomendationsActions.map((recomendationAndAction, index) => (
                  <CardRecomendationAndAction
                    key={index}
                    recomendationAndAction={recomendationAndAction}
                  />
                ))}
              </View>
            </View>
          )}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Animatable.View
              animation="swing"
              iterationDelay={1000}
              iterationCount="infinite"
            >
              <MyText
                fontFamily={"Poppins"}
                text={"¡Analiza una imagen!"}
                fontSize={15}
                textAlign={"center"}
              />
            </Animatable.View>
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
            >
              <View style={{ flexDirection: "row" }}>
                <IconButtonText
                  label={"Toma una foto"}
                  icon={"camera-retro"}
                  onPress={handleTakePhoto}
                  isEnabled={true}
                />
                <IconButtonText
                  label={"Selecciona una foto"}
                  icon={"file-image"}
                  onPress={handlePickImage}
                  isEnabled={true}
                />
              </View>
            </Animatable.View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
  },
  cardImage: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  image: {
    width: 270, // Ancho de la imagen
    height: 270, // Alto de la imagen
    borderRadius: 8, // Borde redondeado
    marginBottom: 15,
    // margin: 5,
  },
});
