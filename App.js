import "react-native-gesture-handler";
import NavigationUser from "./NavigationUser";
import NavigationLogin from "./NavigationLogin";
import { useFonts } from "expo-font";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./AuthContext";
import NavigationGuest from "./NavigationGuest";

export default function App() {
  const [fontsLoaded] = useFonts({
    Arial: require("./assets/fonts/Arial.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    SanFrancisco: require("./assets/fonts/SFNSText-Regular.otf"),
    SanFranciscoBold: require("./assets/fonts/SFNSText-Bold.otf"),
  });

  if (!fontsLoaded) {
  } else {
    return (
      <AuthProvider>
        <NavigationContainer>
          <AuthenticationFlow />
        </NavigationContainer>
      </AuthProvider>
    );
  }
}
// Componente que decide qué pantalla renderizar basada en el estado de autenticación
const AuthenticationFlow = () => {
  const { isAuthenticated } = useAuth();
  const { isGuest } = useAuth();
  if (isAuthenticated) {
    return <NavigationUser />;
  } else if (isGuest) {
    return <NavigationGuest />;
  } else {
    return <NavigationLogin />;
  }
};
