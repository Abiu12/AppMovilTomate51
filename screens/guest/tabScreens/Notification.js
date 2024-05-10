import { useState, useEffect } from "react";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "¡Las plagas atacan tus tomates🥺!",
    body: "Picale acá para ver que se encontró en tu imagen",
    data: { someData: "Por fin" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
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
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

export default function Notification() {
  const { navigate } = useNavigation();
  const [toggleValue, setToggleValue] = useState("Sin ver"); // Estado para almacenar la opción seleccionada
  const [notifications, setNotifications] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  let idFarmer = 8;
  useEffect(() => {
    fetchNotifications();
  }, [toggleValue]);

  useFocusEffect(() => {
    if (!isLoaded) {
      console.log("Entre para cargar una vez la paginas");
      fetchNotifications();
    }
  });

  async function fetchNotifications() {
    const response = await fetch(
      `${BASE_URL}/farmer/getnotifications/${idFarmer}/${toggleValue}`
    );
    const data = await response.json();
    setNotifications(data);
    setIsLoaded(true);
    // console.log("Notificaciones ", data)
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
