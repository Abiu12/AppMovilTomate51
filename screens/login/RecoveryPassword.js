import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Input from "../../components/Input";
import MyText from "../../components/MyText";
import React, { useState } from "react";
import Button from "../../components/Button";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "../../utils/config";
import { useNavigation } from "@react-navigation/native";

export default function RecoveryPassword() {
  const { navigate } = useNavigation();

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [emailExist, setEmailExist] = useState(true);
  const [otpCode, setOtpCode] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      if (isEmailValid(email)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
        setEmailExist(true);
      }
    }, [email, isValidEmail])
  );

  const handleSendEmail = async () => {
    const response = await checkEmailExist();
    if (response.exists) {
      // Generar y enviar OTP al correo electrónico
      const otp = generateOTP();
      // const responseSendEmail = await sendEmail(otp);
      this.toastSuccess.show(
        "\u2713  Se ha enviado el código al correo electrónico",
        1000
      );
      navigate("SecurityCode", { email: email, otp: otp });
    } else {
      setEmailExist(false);
    }
  };

  const sendEmail = async (otp) => {
    const body = {
      recipient_email: email,
      OTP: otp,
    };
    const response = await fetch(`${BASE_URL}/login/send_recovery_email`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  const generateOTP = () => {
    // Aquí puedes generar un código OTP aleatorio, por ejemplo, de 6 dígitos
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  };

  async function checkEmailExist() {
    const body = {
      email: email,
    };
    const response = await fetch(`${BASE_URL}/login/check_email_existence`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  const isEmailValid = (email) => {
    // Expresión regular para validar el formato de un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = (value) => {
    setEmail(value);
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
            marginBottom: "15%",
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <MyText
            fontFamily={"PoppinsBold"}
            text={"Recupera tu contraseña"}
            fontSize={20}
            textAlign={"center"}
            color={"#C62426"}
          />
        </View>

        <View style={{ marginTop: "5%" }}>
          <View style={{ marginBottom: "5%" }}>
            <MyText
              text={"Ingresa el correo electronico asociado con tu cuenta."}
              fontFamily={"Poppins"}
              fontSize={14}
              textAlign={"left"}
            />
          </View>
          <View>
            <Input
              placeholder={"email@address.com"}
              paddingVertical={15}
              fontSize={15}
              borderColor={"#ADADAD"}
              value={email}
              onChangeText={(value) => handleChangeEmail(value)}
            />
            {/* Alert */}
            {!isValidEmail && email != "" && (
              <View style={{ marginTop: "5%" }}>
                <MyText
                  text={"Ingrese un correo electrónico válido"}
                  fontFamily={"Poppins"}
                  fontSize={12}
                  color={"#C62426"}
                />
              </View>
            )}
            {!emailExist && (
              <View style={{ marginTop: "5%" }}>
                <MyText
                  text={"El correo ingresado no está asociado a ninguna cuenta"}
                  fontFamily={"Poppins"}
                  fontSize={12}
                  color={"#C62426"}
                />
              </View>
            )}
          </View>
        </View>
        <View style={{ marginTop: "5%" }}>
          <MyText
            text={
              "Se te enviará un código con el cuál podrás restablecer tu contraseña."
            }
            fontFamily={"Poppins"}
            fontSize={14}
          />
        </View>
        <View style={{ marginTop: "5%", marginBottom: "5%" }}>
          <Button
            text={"Enviar código"}
            disabled={!isValidEmail}
            onPress={() => {
              handleSendEmail();
            }}
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
