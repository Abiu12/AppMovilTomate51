import { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Components
import CardGreenhouse from "../../components/CardGreenhouse";

//utils
import { BASE_URL } from "../../utils/config";
import SearchInput from "../../components/SearchInput";
import MyText from "../../components/MyText";
import { useAuth } from "../../AuthContext";

export default function Feed() {
  const { navigate } = useNavigation();
  const [greenhouses, setGreenhouses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchGreenhouses();
  }, []);

  async function fetchGreenhouses() {
    let response;
    if (currentUser.role == "farmer") {
      response = await fetch(
        `${BASE_URL}/greenhouse/farmer/${currentUser.idFarmer}`
      );
    }
    if (currentUser.role == "worker") {
      response = await fetch(
        `${BASE_URL}/worker/getgreenhouses/${currentUser.idWorker}`
      );
    }
    const data = await response.json();
    setGreenhouses(data);
  }

  const filteredGreenhouses = greenhouses.filter((greenhouse) => {
    const { nombre, tipo_invernadero, humedad, tamanio } = greenhouse;
    const lowerSearchText = searchText.toLowerCase();
    return (
      nombre.toLowerCase().includes(lowerSearchText) ||
      tipo_invernadero.toLowerCase().includes(lowerSearchText) ||
      humedad.toLowerCase().includes(lowerSearchText) ||
      tamanio.toLowerCase().includes(lowerSearchText)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <MyText
            fontFamily={"PoppinsBold"}
            text={"Bienvenido a la app"}
            fontSize={20}
          />
          <MyText
            fontFamily={"Poppins"}
            text={"¡Estos son los invernaderos en los que puedes trabajar!"}
            fontSize={15}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <SearchInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        {filteredGreenhouses.map((greenhouse, index) => (
          <CardGreenhouse
            key={index}
            greenhouse={greenhouse}
            onPress={() =>
              navigate("DetailsGreenhouse", {
                idGreenhouse: greenhouse.id_invernadero,
                nameGreenhouse: greenhouse.nombre,
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
