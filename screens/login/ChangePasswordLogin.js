import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import IconButtonText from "../../components/IconButtonText";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import InputIcon from "../../components/InputIcon";
import RulePassword from "../../components/RulePassword";
import { BASE_URL } from "../../utils/config";
import MyText from "../../components/MyText";

export default function ChangePasswordLogin() {
  const { navigate } = useNavigation();
  const {
    params: { email },
  } = useRoute();

  // Inputs
  const [newPassword, setNewPasword] = useState("");
  const [newPasswordConfirm, setNewPaswordConfirm] = useState("");

  // Checks parar verificar los campos
  const [checkNewPassword, setCheckNewPassword] = useState(false);
  const [checkNewPasswordConfirm, setCheckNewPasswordConfirm] = useState(false);
  const [enableButton, setEnableButton] = useState(false);

  //Validar contraseña
  const [length, setLength] = useState(false);
  const [number, setNumber] = useState(false);
  const [upperCaseLetter, setUpperCaseLetter] = useState(false);
  const [lowerCaseLetter, setLowerCaseLetter] = useState(false);
  const [symbol, setSymbol] = useState(false);

  //SecureInputs
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureNewPasswordConfirm, setSecureNewPasswordConfirm] =
    useState(true);

  const {
    params: { password },
  } = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      if (checkFormatPassword(newPassword)) {
        setCheckNewPassword(true);
      } else {
        setCheckNewPassword(false);
      }
      if (newPassword === newPasswordConfirm && newPassword != "") {
        setCheckNewPasswordConfirm(true);
      } else {
        setCheckNewPasswordConfirm(false);
      }
      if (checkNewPassword && newPasswordConfirm === newPassword) {
        setEnableButton(true);
      } else {
        setEnableButton(false);
      }
    }, [newPassword, newPasswordConfirm])
  );

  const checkFormatPassword = (value) => {
    // Verificar si la contraseña tiene al menos 8 caracteres
    setLength(false);
    setUpperCaseLetter(false);
    setLowerCaseLetter(false);
    setNumber(false);
    setSymbol(false);
    let response = true;

    if (value.length < 8) {
      response = false;
    } else {
      setLength(true);
    }

    // Verificar si la contraseña contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(value)) {
      response = false;
    } else {
      setUpperCaseLetter(true);
    }

    // Verificar si la contraseña contiene al menos una letra minúscula
    if (!/[a-z]/.test(value)) {
      response = false;
    } else {
      setLowerCaseLetter(true);
    }

    // Verificar si la contraseña contiene al menos un número
    if (!/\d/.test(value)) {
      response = false;
    } else {
      setNumber(true);
    }

    // Verificar si la contraseña contiene al menos un símbolo
    if (!/[^A-Za-z0-9]/.test(value)) {
      response = false;
    } else {
      setSymbol(true);
    }

    // Si la contraseña pasa todas las verificaciones, devolver true
    return response;
  };

  const handleChangeNewPassword = (value) => {
    setNewPasword(value);
    console.log(newPassword);
  };

  const handleChangeNewPasswordConfirm = (value) => {
    setNewPaswordConfirm(value);
    console.log(newPasswordConfirm);
  };

  const handleChangeSecure = (value) => {
    if (value === "newPassword") {
      if (secureNewPassword) {
        setSecureNewPassword(false);
      } else {
        setSecureNewPassword(true);
      }
    }
    if (value === "newPasswordConfirm") {
      if (secureNewPasswordConfirm) {
        setSecureNewPasswordConfirm(false);
      } else {
        setSecureNewPasswordConfirm(true);
      }
    }
  };

  const handleCancel = () => {
    navigate("Login");
  };

  async function handleUpdatePassword() {
    const body = {
      email: email,
      newPassword: newPassword,
    };
    const response = await fetch(`${BASE_URL}/login/changePassword`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.toastSuccess.show("\u2713 Contraseña actualizada con éxito", 800);
    navigate("Login");
  }

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
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            marginBottom: "15%",
          }}
        >
          <MyText
            fontFamily={"PoppinsBold"}
            text={"Cambiar contraseña"}
            fontSize={20}
            color={"#C62426"}
            textAlign={"center"}
          />
        </View>

        {/* Contraseña nueva */}
        <View style={{ marginBottom: "5%" }}>
          <View style={{ flexDirection: "row" }}>
            <MyText
              fontFamily={"PoppinsBold"}
              text={"Nueva contraseña: "}
              fontSize={15}
              textAlign={"left"}
            />
            {checkNewPassword && (
              <BouncyCheckbox
                size={15}
                fillColor="green"
                isChecked={checkNewPassword}
                // onPress={changeStatus}
                style={{
                  marginLeft: 5,
                }}
                disabled={true}
              />
            )}
          </View>

          <View>
            <InputIcon
              value={newPassword}
              onChangeText={(text) => handleChangeNewPassword(text)}
              icon={secureNewPassword ? "eye" : "eye-slash"}
              sizeIcon={19}
              secureTextEntry={secureNewPassword}
              onPress={() => handleChangeSecure("newPassword")}
              paddingVertical={7}
              borderColor={"#ADADAD"}
            />
          </View>
        </View>

        {/* Confirmar contraseña nueva */}
        <View style={{ marginBottom: "5%" }}>
          <View style={{ flexDirection: "row" }}>
            <MyText
              fontFamily={"PoppinsBold"}
              text={"Confirmar contraseña: "}
              fontSize={15}
              textAlign={"left"}
            />
            {checkNewPasswordConfirm && (
              <BouncyCheckbox
                size={15}
                fillColor="green"
                isChecked={checkNewPasswordConfirm}
                style={{
                  marginLeft: 5,
                }}
                disabled={true}
              />
            )}
          </View>
          <View>
            <InputIcon
              value={newPasswordConfirm}
              onChangeText={(text) => handleChangeNewPasswordConfirm(text)}
              icon={secureNewPasswordConfirm ? "eye" : "eye-slash"}
              sizeIcon={19}
              secureTextEntry={secureNewPasswordConfirm}
              onPress={() => handleChangeSecure("newPasswordConfirm")}
              paddingVertical={7}
              borderColor={"#ADADAD"}
            />
          </View>
        </View>

        {/* Caracteristicas de contraseña */}
        <View style={{}}>
          <RulePassword
            text={"La contraseña debe tener minimo 8 carácteres"}
            value={length}
          />
          <RulePassword
            text={"La contraseña debe tener al menos una mayúscula"}
            value={upperCaseLetter}
          />
          <RulePassword
            text={"La contraseña debe tener al menos una minúscula"}
            value={lowerCaseLetter}
          />
          <RulePassword
            text={"La contraseña debe tener al menos un número"}
            value={number}
          />
          <RulePassword
            text={"La contraseña debe tener al menos un símbolo"}
            value={symbol}
          />
        </View>

        <IconButtonText
          label={"Cambiar contraseña"}
          icon={"save"}
          onPress={handleUpdatePassword}
          isEnabled={enableButton}
        />
        <IconButtonText
          label={"Cancelar"}
          icon={"angle-left"}
          onPress={handleCancel}
          isEnabled={true}
        />
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
    padding: 25,
    margin: 20,
  },
  row: {
    padding: 10,
    flexDirection: "row",
    marginBottom: 5,
  },
  boxText: {
    width: "41%",
    alignSelf: "left",
  },
  boxInput: {
    width: "65%",
    alignSelf: "center",
  },
});
