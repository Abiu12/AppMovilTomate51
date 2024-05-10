import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import MyText from "../../components/MyText";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BASE_URL } from "../../utils/config";

export default function SecurityCode() {
  const { navigate } = useNavigation();
  const [enteredOtp, setEnteredOtp] = useState("");
  const otpInputs = useRef([]);

  const {
    params: { otp, email },
  } = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      console.log(otp, email);
      console.log(enteredOtp);
      validateCode();
    }, [enteredOtp])
  );
  const validateCode = () => {
    if (otp == enteredOtp) {
      navigate("ChangePasswordLogin", { email: email });
    }
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

  const handleOtpInputChange = (value, index) => {
    setEnteredOtp((prevOtp) => {
      const newOtp = prevOtp.split("");
      newOtp[index] = value;
      return newOtp.join("");
    });

    // Mueve el foco al siguiente TextInput si se ingresa un dígito
    if (value.length === 1 && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }

    // Mueve el foco al TextInput anterior si se elimina un dígito o se borra el contenido de un TextInput vacío
    if (value === "" && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ marginTop: "%5" }}>
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
              text={"Código de seguridad"}
              fontSize={20}
              textAlign={"center"}
              color={"#C62426"}
            />
          </View>

          <View style={{ marginTop: "5%" }}>
            <View style={{ alignSelf: "flex-start", marginBottom: "5%" }}>
              <MyText
                text={"Ingresa el código que has recibido:"}
                fontFamily={"Poppins"}
                fontSize={14}
              />
            </View>

            <View style={styles.otpContainer}>
              {[...Array(4)].map((_, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (otpInputs.current[index] = ref)}
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(value) => handleOtpInputChange(value, index)}
                />
              ))}
            </View>
          </View>

          <View style={{ marginTop: "5%", marginBottom: "5%" }}>
            <MyText
              text={"No recibí ningún código"}
              fontFamily={"Poppins"}
              fontSize={14}
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
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
    height: "75%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ADADAD",
    borderRadius: 10,
    textAlign: "center",
    width: "20%",
    paddingVertical: 10,
    fontSize: 20,
  },
});
