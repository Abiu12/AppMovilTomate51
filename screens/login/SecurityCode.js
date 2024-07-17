import React, { useState, useRef, useEffect } from "react";
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
import Button from "../../components/Button";

export default function SecurityCode() {
  const { navigate } = useNavigation();
  const [enteredOtp, setEnteredOtp] = useState("");
  const otpInputs = useRef([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [timeLeft, setTimeLeft] = useState(4);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const [newOtp, setNewOpt] = useState("");

  const {
    params: { otp, email },
  } = useRoute();
  // Para validar el codigo ingresado
  useFocusEffect(
    React.useCallback(() => {
      console.log("Codigo original", otp);
      if (newOtp) {
        console.log("Ya hay nuevo codigo", newOtp);
        validateCode(newOtp);
      } else {
        validateCode(otp);
      }
    }, [enteredOtp])
  );

  // Para la cuenta regresiva
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    if (value.length === 0 && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };
  const handleRequestNewCode = async () => {
    try {
      const newOtpGenerate = generateOTP();
      setNewOpt(newOtpGenerate);
      console.log("Codigo nuevo generado: ", newOtpGenerate);
      // const response = await sendEmail(newOtpGenerate);
      setTimeLeft(5); // Reiniciar el temporizador a 2 minutos
      setEnteredOtp("");
    } catch (error) {
      this.toastAlert.show(`Hubo un error ${error}`, 800);
    }
  };
  const validateCode = (currentOtp) => {
    if (currentOtp == enteredOtp) {
      navigate("ChangePasswordLogin", { email: email });
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

  return (
    <View style={styles.container}>
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
          {/* Text */}
          <View style={{ alignSelf: "flex-start", marginBottom: "15%" }}>
            <MyText
              text={"Ingresa el código que has recibido:"}
              fontFamily={"Poppins"}
              fontSize={14}
              textAlign={"justify"}
            />
          </View>
          {/* Cuadros de input */}
          <View style={styles.otpContainer}>
            {[...Array(4)].map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => (otpInputs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  {
                    borderColor: focusedInput === index ? "#C62426" : "#ADADAD",
                  },
                ]}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(value) => handleOtpInputChange(value, index)}
                onFocus={() => setFocusedInput(index)}
                onBlur={() => setFocusedInput(null)}
                onKeyPress={({ nativeEvent: { key } }) => {
                  if (key === "Backspace" && index > 0) {
                    otpInputs.current[index - 1].focus();
                  }
                  // if (index < otpInputs.current.length - 1) {
                  //   otpInputs.current[index + 1].focus();
                  // }
                }}
              />
            ))}
          </View>
          {/* Tiempo de espera */}
          <View>
            {timeLeft > 0 ? (
              <View style={{ marginTop: "15%" }}>
                <MyText
                  style={{ textAlign: "center" }}
                  text={`Puedes solicitar otro código en:`}
                  fontFamily={"Poppins"}
                  textAlign={"center"}
                />
                <MyText
                  style={{ textAlign: "center" }}
                  text={`${minutes} minuto(s) ${seconds} segundo(s)`}
                  fontFamily={"Poppins"}
                  textAlign={"center"}
                />
              </View>
            ) : (
              <View style={{ marginTop: "15%", marginBottom: "15%" }}>
                <Button
                  text={"Solicitar otro código"}
                  onPress={handleRequestNewCode}
                />
              </View>
            )}
          </View>
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
