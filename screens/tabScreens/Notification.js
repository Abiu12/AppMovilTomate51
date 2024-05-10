import React, { useState, useEffect } from "react";
import {
  View,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { BASE_URL } from "../../utils/config";

import CardNotifications from "../../components/CardNotifications";
// import TopText from '../../components/TopText';
import NormalText from "../../components/NormalText";

import { ToggleSelector } from "../../components/ToggleSelector";
import SearchInput from "../../components/SearchInput";
import MyText from "../../components/MyText";
import { useAuth } from "../../AuthContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Notification() {
  const { navigate } = useNavigation();
  const [toggleValue, setToggleValue] = useState("Sin ver"); // Estado para almacenar la opción seleccionada
  const [notifications, setNotifications] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const { currentUser } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      fetchNotifications();
    }, [toggleValue])
  );

  async function fetchNotifications() {
    try {
      let id;
      if (currentUser.role === "farmer") {
        id = currentUser.idFarmer;
      } else if (currentUser.role === "worker") {
        id = currentUser.idWorker;
      }
      console.log(id);
      const response = await fetch(
        `${BASE_URL}/${currentUser.role}/getnotifications/${id}/${toggleValue}`
      );
      console.log(
        `${BASE_URL}/${currentUser.role}/getnotifications/${id}/${toggleValue}`
      );
      const data = await response.json();
      setNotifications(data);
      setIsLoaded(true);
    } catch (error) {
      this.toastAlert.show(`Hubo un error`, 800);
    }
  }
  const handleTogglePress = () => {
    setToggleValue(toggleValue === "Sin ver" ? "Tratada" : "Sin ver");
  };

  const filteredNotifications = notifications.filter((notification) => {
    const { numero_cama, fecha, nombres_detectados } = notification;
    const lowerSearchText = searchText.toLowerCase();
    return (
      numero_cama.toLowerCase().includes(lowerSearchText) ||
      fecha.toLowerCase().includes(lowerSearchText) ||
      nombres_detectados.toLowerCase().includes(lowerSearchText)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 1, alignItems: "center" }}>
          <MyText
            fontFamily={"PoppinsBold"}
            text={"¡Estas son las notificaciones que tienes!"}
            fontSize={20}
            textAlign={"center"}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <SearchInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginBottom: 10,
          }}
        >
          <View style={{ marginRight: 10, alignSelf: "center" }}>
            <MyText
              fontFamily={"Poppins"}
              text={"¡Escoge el estado de las notificaciones!"}
              fontSize={12}
            />
          </View>
          <View>
            <ToggleSelector onPress={handleTogglePress} />
          </View>
        </View>
        {filteredNotifications.map((notification, index) => (
          <CardNotifications
            key={index}
            notification={notification}
            onPress={() => {
              setIsLoaded(false);
              navigate("RecomendationsAndActionsNotifications", {
                idAnalizedImage: notification.id_imagenanalizada,
                urlImage: notification.imagen,
                date: notification.fecha,
                status: notification.estado,
              });
            }}
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
});
