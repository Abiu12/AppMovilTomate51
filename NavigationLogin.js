import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import Toast from "react-native-easy-toast";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login/Login";
import RecoveryPassword from "./screens/login/RecoveryPassword";
import SecurityCode from "./screens/login/SecurityCode";
import ChangePasswordLogin from "./screens/login/ChangePasswordLogin";

//Stack
const Stack = createNativeStackNavigator();

function StackGroupLogin() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecoveryPassword"
        component={RecoveryPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SecurityCode"
        component={SecurityCode}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePasswordLogin"
        component={ChangePasswordLogin}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function NavigationLogin() {
  return (
    <>
      <StackGroupLogin></StackGroupLogin>

      <Toast
        ref={(toastSuccess) => (this.toastSuccess = toastSuccess)}
        style={{ backgroundColor: "green" }}
        position="bottom"
        opacity={0.8}
        textStyle={{ color: "white" }}
      />
      <Toast
        ref={(toastAlert) => (this.toastAlert = toastAlert)}
        style={{ backgroundColor: "red" }}
        position="bottom"
        opacity={0.8}
        textStyle={{ color: "white" }}
      />
      <StatusBar style="dark" />
    </>
  );
}
