import { StyleSheet, View, Platform } from "react-native";
import Input from "../../components/Input";
import MyText from "../../components/MyText";
import InputIcon from "../../components/InputIcon";
import { useState } from "react";
import Button from "../../components/Button";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../AuthContext";
import { BASE_URL } from "../../utils/config";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export default function Login() {
  const { navigate } = useNavigation();
  const { setIsAuthenticated, setIsGuest, setCurrentUser } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSecurity, setPasswordSecurity] = useState(true);
  const [alertCredentials, setAlertCredentials] = useState(false);
  const [activeLoaderButton, setActiveLoaderButton] = useState(false);
  const handleLogin = async () => {
    try {
      setActiveLoaderButton(true);
      setTimeout(async () => {
        const userSession = await login();

        if (userSession) {
          if (userSession.message == "Error en las credenciales") {
            setAlertCredentials(true);
            setActiveLoaderButton(false);
          } else {
            setAlertCredentials(false);
            if (await handleRegisterForPushNotificationsAsync()) {
              const userData = await getDataUser(userSession.rol);

              if (userSession.rol === "farmer") {
                setCurrentUser({
                  idFarmer: userData.id_agricultor,
                  role: userData.rol,
                  idUser: userData.id_usuario,
                });
              }
              if (userSession.rol === "worker") {
                setCurrentUser({
                  idFarmer: userData.id_agricultor,
                  idWorker: userData.id_trabajador,
                  role: userData.rol,
                  idUser: userData.id_usuario,
                });
              }
              setIsAuthenticated(true);
            } else {
              setActiveLoaderButton(false);
            }
          }
        }
        setAlertCredentials(true);
        setActiveLoaderButton(false);
      }, 500); //
    } catch (error) {
      this.toastAlert.show("Hubo un error", 800);
    }
  };

  const handleLoginGuest = () => {
    setIsGuest(true);
  };

  async function handleRegisterForPushNotificationsAsync() {
    try {
      const token = await registerForPushNotificationsAsync();
      const body = {
        userName: userName,
        token: token,
      };
      const response = await fetch(
        `${BASE_URL}/login/registerTokenNotification`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      this.toastAlert.show("Hubo un error", 800);
    }
  }

  const handleChangeSecurity = () => {
    if (passwordSecurity) {
      setPasswordSecurity(false);
    } else {
      setPasswordSecurity(true);
    }
  };

  async function registerForPushNotificationsAsync() {
    try {
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
      } else {
        alert("Must use physical device for Push Notifications");
      }
      return token.data;
    } catch (error) {
      this.toastAlert.show(
        "Hubo un error al obtener el token del dispositivo",
        800
      );
    }
  }

  const login = async () => {
    try {
      const body = {
        username: userName,
        password: password,
      };
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 400) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      this.toastAlert.show(`Hubo un error ${error}`, 800);
    }
  };

  const getDataUser = async (role) => {
    try {
      const body = {
        username: userName,
        password: password,
        role: role,
      };
      const response = await fetch(`${BASE_URL}/login/getDataByUsername`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Datos del usuario: ", data);
        return data;
      } else {
        return null;
      }
    } catch (error) {
      this.toastAlert.show(`Hubo un error ${error}`, 800);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: "5%" }}>
        <MyText
          fontFamily={"PoppinsBold"}
          text={"Tomi-Plagas y Enfermedades"}
          fontSize={20}
          color={"white"}
          textAlign={"center"}
        />
      </View>
      <View style={styles.card}>
        <View
          style={{
            marginTop: "5%",
            marginBottom: "5%",
            alignSelf: "flex-start",
          }}
        >
          <MyText fontFamily={"Poppins"} text={"Bienvenido"} fontSize={20} />
        </View>

        <View style={{ alignSelf: "flex-start" }}>
          <MyText text={"Iniciar"} fontFamily={"PoppinsBold"} fontSize={30} />
          <MyText text={"sesión"} fontFamily={"PoppinsBold"} fontSize={30} />
        </View>

        <View style={{ marginTop: "5%" }}>
          <View style={{ alignSelf: "flex-start", marginBottom: "5%" }}>
            {alertCredentials && (
              <MyText
                text={"*Credenciales incorrectas"}
                fontFamily={"Poppins"}
                fontSize={14}
                textAlign={"left"}
                color={"#C62426"}
              />
            )}
            <MyText
              text={"Ingresa tu nombre de usuario"}
              fontFamily={"Poppins"}
              fontSize={14}
              textAlign={"left"}
            />
          </View>
          <View>
            <Input
              placeholder={"Nombre de usuario"}
              paddingVertical={15}
              fontSize={15}
              borderColor={"#ADADAD"}
              onChangeText={(text) => {
                setUserName(text);
                setAlertCredentials(false);
              }}
            />
          </View>
        </View>

        <View style={{ marginTop: "5%", marginBottom: "5%" }}>
          <View style={{ alignSelf: "flex-start", marginBottom: 10 }}>
            <MyText
              text={"Ingresa tu contraseña"}
              fontFamily={"Poppins"}
              fontSize={14}
              textAlign={"left"}
            />
          </View>

          <View>
            <InputIcon
              placeholder={"Contraseña"}
              paddingVertical={15}
              fontSize={15}
              borderColor={"#ADADAD"}
              icon={passwordSecurity ? "eye" : "eye-slash"}
              sizeIcon={25}
              secureTextEntry={passwordSecurity}
              onPress={() => handleChangeSecurity()}
              onChangeText={(text) => {
                setPassword(text);
                setAlertCredentials(false);
              }}
            />
          </View>
        </View>

        <View style={{ alignSelf: "flex-end", marginBottom: "5%" }}>
          <MyText
            text={"Olvidé mi contraseña"}
            fontFamily={"Poppins"}
            fontSize={12}
            color={"#C62426"}
            onPress={() => navigate("RecoveryPassword", {})}
            textDecorationLine={"underline"}
          />
        </View>

        {/* View para el boton y lo de abajo */}

        <Button
          text={"Iniciar sesión"}
          onPress={() => handleLogin()}
          activeLoader={activeLoaderButton}
        />
        <View style={{ alignSelf: "center" }}>
          <MyText
            text={"o"}
            fontFamily={"Poppins"}
            fontSize={15}
            color={"#ADADAD"}
            textAlign={"center"}
          />

          <MyText
            text={"¿Sin una cuenta?"}
            fontFamily={"Poppins"}
            fontSize={15}
            color={"#ADADAD"}
            textAlign={"center"}
          />

          <MyText
            text={"Iniciar como invitado"}
            fontFamily={"Poppins"}
            fontSize={15}
            color={"#C62426"}
            textAlign={"center"}
            onPress={() => handleLoginGuest()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#C62426",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    margin: 20,
  },
});
