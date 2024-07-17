import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "../../utils/config";
import Input from "../../components/Input";
import IconButtonText from "../../components/IconButtonText";
import { useNavigation } from "@react-navigation/native";
import MyText from "../../components/MyText";
import { useAuth } from "../../AuthContext";
import Loader from "../../components/Loader";

export default function Settings() {
  const { navigate } = useNavigation();
  const { setIsAuthenticated, currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState();
  const [data, setData] = useState({
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    telefono: "",
    correo_electronico: "",
    nombre_usuario: "",
    contrasenia: "",
  });
  const [enableButton, setEnableButton] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [userNameExists, setUserNameExists] = useState(false);
  const [emailEntry, setEmailEntry] = useState("");
  const [userNameEntry, setuserNameEntry] = useState("");
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (currentUser.role === "farmer") {
        setId(currentUser.idFarmer);
      } else if (currentUser.role === "worker") {
        setId(currentUser.idWorker);
      }
      fetchData();
    }, [isLoaded])
  );
  // Validar telefono y correo
  useFocusEffect(
    React.useCallback(() => {
      const isValidPhone = verifyPhone(data.telefono);
      setCheckPhone(isValidPhone);
      const isValidEmail = verifyEmail(data.correo_electronico);
      setCheckEmail(isValidEmail);
    }, [data.telefono, data.correo_electronico])
  );

  const handleChangeText = (key, value) => {
    setData({ ...data, [key]: value });
    setEnableButton(true);
    if (key == "correo_electronico") {
      setEmailExists(false);
    }
    if (key == "nombre_usuario") {
      setUserNameExists(false);
    }
  };

  async function handleUpdateData() {
    try {
      const body = {
        name: data.nombre,
        surname: data.primer_apellido,
        secondSurname: data.segundo_apellido,
        phone: data.telefono,
        email: data.correo_electronico,
        nameUser: data.nombre_usuario,
        password: data.contrasenia,
      };

      if ((data.correo_electronico === emailEntry) == false) {
        const responseEmailExist = await fetch(
          `${BASE_URL}/login/check_email_existence`,
          {
            method: "POST",
            body: JSON.stringify({ email: data.correo_electronico }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (responseEmailExist.ok) {
          const data = await responseEmailExist.json();
          if (data.exists == true) {
            setEmailExists(true);
            return;
          }
        }
      }
      if ((data.nombre_usuario === userNameEntry) == false) {
        const responseUserNameExist = await fetch(
          `${BASE_URL}/login/userNameExistence`,
          {
            method: "POST",
            body: JSON.stringify({ userName: data.nombre_usuario }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (responseUserNameExist.ok) {
          const data = await responseUserNameExist.json();
          if (data.exists == true) {
            setUserNameExists(true);
            return;
          }
        }
      }
      const response = await fetch(`${BASE_URL}/${currentUser.role}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataResponse = await response.json();
      if (response.ok) {
        this.toastSuccess.show(`${dataResponse.message}`, 800);
        setIsLoaded(false);
        setEnableButton(false);
      }
      setIsLoaded(false);
    } catch (error) {
      this.toastAlert.show("Ha ocurrido un problema", 800);
    }
  }

  function handleCloseSession() {
    setIsAuthenticated(false);
  }

  async function fetchData() {
    try {
      const response = await fetch(`${BASE_URL}/${currentUser.role}/${id}`);
      const data = await response.json();
      setData(data);
      setEmailEntry(data.correo_electronico);
      setuserNameEntry(data.nombre_usuario);
      setIsLoaded(true);
      setIsLoading(false);
    } catch (error) {}
  }

  const verifyPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };
  const verifyEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  if (isLoading && userNameEntry == "" && emailEntry == "") {
    return <Loader></Loader>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                marginBottom: "15%",
              }}
            >
              <MyText
                fontFamily={"PoppinsBold"}
                text={"Información personal "}
                fontSize={20}
                color={"#C62426"}
                textAlign={"center"}
              />
            </View>

            <View style={{ marginBottom: "5%" }}>
              <View style={{ alignSelf: "flex-start" }}>
                <MyText
                  fontFamily={"PoppinsBold"}
                  text={"Nombre: "}
                  fontSize={15}
                  textAlign={"left"}
                />
              </View>
              <View style={{ width: "100%", alignSelf: "flex-start" }}>
                <Input
                  value={data.nombre}
                  onChangeText={(text) => handleChangeText("nombre", text)}
                  borderColor={"#ADADAD"}
                />
              </View>
            </View>

            <View style={{ marginBottom: "5%" }}>
              <View style={{ alignSelf: "flex-start" }}>
                <MyText
                  fontFamily={"PoppinsBold"}
                  text={"Primer apellido: "}
                  fontSize={15}
                  textAlign={"left"}
                />
              </View>
              <View style={{ width: "100%", alignSelf: "flex-start" }}>
                <Input
                  value={data.primer_apellido}
                  onChangeText={(text) =>
                    handleChangeText("primer_apellido", text)
                  }
                  borderColor={"#ADADAD"}
                />
              </View>
            </View>

            <View style={{ marginBottom: "5%" }}>
              <View style={{ alignSelf: "flex-start" }}>
                <MyText
                  fontFamily={"PoppinsBold"}
                  text={"Segundo apellido: "}
                  fontSize={15}
                  textAlign={"left"}
                />
              </View>
              <View style={{ width: "100%", alignSelf: "flex-start" }}>
                <Input
                  value={data.segundo_apellido}
                  onChangeText={(text) =>
                    handleChangeText("segundo_apellido", text)
                  }
                  borderColor={"#ADADAD"}
                />
              </View>
            </View>

            <View style={{ marginBottom: "5%" }}>
              <View style={{ alignSelf: "flex-start" }}>
                <MyText
                  fontFamily={"PoppinsBold"}
                  text={"Telefono: "}
                  fontSize={15}
                  textAlign={"left"}
                />
              </View>
              <View style={{ width: "100%", alignSelf: "flex-start" }}>
                <Input
                  value={data.telefono}
                  onChangeText={(text) => handleChangeText("telefono", text)}
                  keyboardType={"numeric"}
                  borderColor={"#ADADAD"}
                />
                <View style={{ marginTop: "2%" }}>
                  {!checkPhone && (
                    <MyText
                      text={"*Ingrese un teléfono válido"}
                      fontFamily={"Poppins"}
                      fontSize={14}
                      textAlign={"left"}
                      color={"#C62426"}
                    />
                  )}
                </View>
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                marginBottom: "15%",
              }}
            >
              <MyText
                fontFamily={"PoppinsBold"}
                text={"Información de la cuenta "}
                fontSize={20}
                color={"#C62426"}
                textAlign={"center"}
              />
            </View>

            <View style={{ marginBottom: "5%" }}>
              <View style={{ alignSelf: "flex-start" }}>
                <MyText
                  fontFamily={"PoppinsBold"}
                  text={"Correo electrónico: "}
                  fontSize={15}
                  textAlign={"left"}
                />
              </View>
              <View style={{ width: "100%", alignSelf: "flex-start" }}>
                <Input
                  value={data.correo_electronico}
                  onChangeText={(text) =>
                    handleChangeText("correo_electronico", text)
                  }
                  borderColor={"#ADADAD"}
                />
                <View style={{ marginTop: "2%" }}>
                  {!checkEmail && (
                    <MyText
                      text={"*Ingrese un correo electrónico válido"}
                      fontFamily={"Poppins"}
                      fontSize={14}
                      textAlign={"left"}
                      color={"#C62426"}
                    />
                  )}
                  {emailExists && (
                    <MyText
                      text={"*Este correo ya esta en uso"}
                      fontFamily={"Poppins"}
                      fontSize={14}
                      textAlign={"left"}
                      color={"#C62426"}
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ alignSelf: "flex-start" }}>
                <MyText
                  fontFamily={"PoppinsBold"}
                  text={"Nombre de usuario: "}
                  fontSize={15}
                  textAlign={"left"}
                />
              </View>
              <View style={{ width: "100%", alignSelf: "flex-start" }}>
                <Input
                  value={data.nombre_usuario}
                  onChangeText={(text) =>
                    handleChangeText("nombre_usuario", text)
                  }
                  borderColor={"#ADADAD"}
                />
                <View style={{ marginTop: "2%" }}>
                  {userNameExists && (
                    <MyText
                      text={"*Este nombre de usuario ya existe"}
                      fontFamily={"Poppins"}
                      fontSize={14}
                      textAlign={"left"}
                      color={"#C62426"}
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={{ alignSelf: "flex-end" }}>
              <MyText
                fontFamily={"PoppinsBold"}
                text={"Cambiar contraseña"}
                fontSize={15}
                color={"#C62426"}
                onPress={() =>
                  navigate("ChangePassword", { password: data.contrasenia })
                }
                textDecorationLine={"underline"}
              />
            </View>

            <IconButtonText
              label={"Guardar cambios"}
              icon={"save"}
              onPress={handleUpdateData}
              isEnabled={enableButton && checkEmail && checkPhone}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 15,
    // backgroundColor: "#C62426",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
});
