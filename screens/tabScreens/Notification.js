import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import * as Notifications from "expo-notifications";
import { BASE_URL } from "../../utils/config";

import CardNotifications from "../../components/CardNotifications";
// import TopText from '../../components/TopText';

import { ToggleSelector } from "../../components/ToggleSelector";
import SearchInput from "../../components/SearchInput";
import MyText from "../../components/MyText";
import { useAuth } from "../../AuthContext";

import Loader from "../../components/Loader";
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
  const [isLoading, setIsLoading] = useState(true);

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
      const response = await fetch(
        `${BASE_URL}/${currentUser.role}/getnotifications/${id}/${toggleValue}`
      );
      console.log(
        `${BASE_URL}/${currentUser.role}/getnotifications/${id}/${toggleValue}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setNotifications(data);
      } else if (response.status === 404) {
        setNotifications([]);
      }
      setIsLoading(false);
    } catch (error) {
      this.toastAlert.show(`Hubo un error ${error}`, 800);
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

  if (isLoading) {
    return <Loader></Loader>;
  } else {
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
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <CardNotifications
                key={index}
                notification={notification}
                onPress={() => {
                  navigate("RecomendationsAndActionsNotifications", {
                    idAnalizedImage: notification.id_imagenanalizada,
                    urlImage: notification.imagen,
                    date: notification.fecha,
                    status: notification.estado,
                  });
                }}
              />
            ))
          ) : (
            <View style={{ marginTop: "15%" }}>
              <MyText
                fontFamily={"PoppinsBold"}
                text={`No tienes notificaciones con el estado "${toggleValue}"`}
                fontSize={15}
                textAlign={"center"}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
