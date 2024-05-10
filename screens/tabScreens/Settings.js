import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "../../utils/config";
import Input from "../../components/Input";
import IconButtonText from "../../components/IconButtonText";
import { useNavigation } from "@react-navigation/native";
import MyText from "../../components/MyText";
import { useAuth } from "../../AuthContext";

export default function Settings() {
  const { navigate } = useNavigation();
  const { setIsAuthenticated, currentUser } = useAuth();
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

  const handleChangeText = (key, value) => {
    setData({ ...data, [key]: value });
    setEnableButton(true);
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
    } catch (error) {
      this.toastAlert.show("A ocurrido un problema", 800);
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
      setIsLoaded(true);
    } catch (error) {}
  }

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
            isEnabled={enableButton}
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
    padding: 15,
    // backgroundColor: "#C62426",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
});
