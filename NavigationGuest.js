import { StatusBar } from "react-native";
import Toast from "react-native-easy-toast";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import Feed from "./screens/guest/tabScreens/Feed";

import MyText from "./components/MyText";
import Settings from "./screens/guest/tabScreens/Settings";

//Stack
const Stack = createNativeStackNavigator();

function StackGroupFeed() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="DetailsGreenhouse"
        component={DetailsGreenhouse}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TakePhoto"
        component={TakePhoto}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AnalizedImages"
        component={AnalizedImages}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecomendationsAndActions"
        component={RecomendationsAndActions}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconColor = focused ? "#C62426" : color;
          let iconName;
          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Ajustes") {
            iconName = focused ? "settings" : "settings-sharp";
          } else if (route.name === "Notificaciones") {
            iconName = focused ? "notifications" : "notifications-outline";
          }
          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        tabBarActiveTintColor: "#C62426",
        tabBarShowLabel: true,
        tabBarLabel: ({ focused, colosi }) => {
          return (
            <MyText
              color={focused ? "#C62426" : "gray"}
              text={route.name}
              fontFamily={"Poppins"}
            />
          );
        },
        getLabelText: ({ route }) => {
          return route.name;
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={StackGroupFeed}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#C62426",
          },
          headerTintColor: "white",
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={Settings}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#C62426",
          },
          headerTintColor: "white",
        }}
      />
    </Tab.Navigator>
  );
}
export default function NavigationGuest() {
  return (
    <>
      <TabGroup></TabGroup>

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
    // <NavigationContainer>

    // </NavigationContainer>
  );
}
