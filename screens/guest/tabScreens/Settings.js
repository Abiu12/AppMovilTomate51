import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
  SafeAreaViewBase,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";
import TopText from "../../components/TopText";
import { BASE_URL } from "../../utils/config";
import Input from "../../components/Input";
import NormalText from "../../components/NormalText";
import IconButtonText from "../../components/IconButtonText";
import InputIcon from "../../components/InputIcon";
import { useNavigation } from "@react-navigation/native";
import MyText from "../../components/MyText";
import { useAuth } from "../../AuthContext";

export default function Settings() {
  const { navigate } = useNavigation();
  const { setIsAuthenticated } = useAuth();

  const [dataFarmer, setDataFarmer] = useState({
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    telefono: "",
    correo_electronico: "",
    nombre_usuario: "",
    contrasenia: "",
  });
  const [dataWorker, setDataWorker] = useState([]);
  const [enableButton, setEnableButton] = useState(false);
  const [id, setId] = useState();
  const [role, setRole] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  let idFarmer = 8;
  let idWorker;

  const handleChangeText = (key, value) => {
    setDataFarmer({ ...dataFarmer, [key]: value });
    setEnableButton(true);
  };
  async function fetchData() {
    try {
      const response = await fetch(`${BASE_URL}/${role}/${id}`);
      const data = await response.json();
      if (role == "farmer") {
        setDataFarmer(data);
      }
      if (role == "worker") {
        setDataWorker(data);
      }
      setIsLoaded(true);
    } catch (error) {}

    if (dataFarmer) {
    }
  }
  async function handleUpdateData() {
    const body = {
      name: dataFarmer.nombre,
      surname: dataFarmer.primer_apellido,
      secondSurname: dataFarmer.segundo_apellido,
      phone: dataFarmer.telefono,
      email: dataFarmer.correo_electronico,
      nameUser: dataFarmer.nombre_usuario,
      password: dataFarmer.contrasenia,
    };
    if (role === "farmer") {
      const response = await fetch(`${BASE_URL}/${role}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.toast.show("\u2713 Información actualizada con éxito", 800);
      setIsLoaded(false);
      setEnableButton(false);
    }
  }
  function handleCloseSession() {
    console.log("Entre a cerrar sesion");
    setIsAuthenticated(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      console.log("Monte el componente");
      // setEnableButton(false);
      if (idFarmer) {
        setId(idFarmer);
        setRole("farmer");
        fetchData();
      } else if (idWorker) {
        setId(idWorker);
        setRole("worker");
        fetchData();
      }
      setIsLoaded(true);
    }, [id, role])
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginBottom: 15,
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

          <View style={styles.row}>
            <View style={{ width: "40%", alignSelf: "center" }}>
              <MyText
                fontFamily={"PoppinsBold"}
                text={"Nombre: "}
                fontSize={15}
                textAlign={"left"}
              />
            </View>
            <View style={{ width: "60%", alignSelf: "center" }}>
              <Input
                value={dataFarmer.nombre}
                onChangeText={(text) => handleChangeText("nombre", text)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "40%", alignSelf: "center" }}>
              <MyText
                fontFamily={"PoppinsBold"}
                text={"Primer apellido: "}
                fontSize={15}
                textAlign={"left"}
              />
            </View>
            <View style={{ width: "60%", alignSelf: "center" }}>
              <Input
                value={dataFarmer.primer_apellido}
                onChangeText={(text) =>
                  handleChangeText("primer_apellido", text)
                }
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "40%", alignSelf: "center" }}>
              <MyText
                fontFamily={"PoppinsBold"}
                text={"Segundo apellido: "}
                fontSize={15}
                textAlign={"left"}
              />
            </View>
            <View style={{ width: "60%", alignSelf: "center" }}>
              <Input
                value={dataFarmer.segundo_apellido}
                onChangeText={(text) =>
                  handleChangeText("segundo_apellido", text)
                }
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "40%", alignSelf: "center" }}>
              <MyText
                fontFamily={"PoppinsBold"}
                text={"Telefono: "}
                fontSize={15}
                textAlign={"left"}
              />
            </View>
            <View style={{ width: "60%", alignSelf: "center" }}>
              <Input
                value={dataFarmer.telefono}
                onChangeText={(text) => handleChangeText("telefono", text)}
                keyboardType={"numeric"}
              />
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginBottom: 15,
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

          <View style={styles.row}>
            <View style={{ width: "40%", alignSelf: "center" }}>
              <MyText
                fontFamily={"PoppinsBold"}
                text={"Correo electrónico: "}
                fontSize={15}
                textAlign={"left"}
              />
            </View>
            <View style={{ width: "60%", alignSelf: "center" }}>
              <Input
                value={dataFarmer.correo_electronico}
                onChangeText={(text) =>
                  handleChangeText("correo_electronico", text)
                }
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ width: "40%", alignSelf: "center" }}>
              <MyText
                fontFamily={"PoppinsBold"}
                text={"Nombre de usuario: "}
                fontSize={15}
                textAlign={"left"}
              />
            </View>
            <View style={{ width: "60%", alignSelf: "center" }}>
              <Input
                value={dataFarmer.nombre_usuario}
                onChangeText={(text) =>
                  handleChangeText("nombre_usuario", text)
                }
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
                navigate("ChangePassword", { password: dataFarmer.contrasenia })
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
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  row: {
    padding: 10,
    flexDirection: "row",
    marginBottom: 5,
  },
});
