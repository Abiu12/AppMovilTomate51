import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

//Components
import CardBed from "../../components/CardBed";

//Utils
import { BASE_URL } from "../../utils/config";
import SearchInput from "../../components/SearchInput";
import MyText from "../../components/MyText";

export default function DetailsGreenhouse() {
  const { navigate } = useNavigation();
  const [beds, setBeds] = useState([]);
  const [searchText, setSearchText] = useState("");

  const {
    params: { idGreenhouse, nameGreenhouse },
  } = useRoute();

  useEffect(() => {
    fetchBeds();
  }, []);

  async function fetchBeds() {
    try {
      const response = await fetch(
        `${BASE_URL}/bed/greenhouse/${idGreenhouse}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setBeds(data);
      }
    } catch (error) {
      this.toastAlert.show(`Hubo un error ${error}`, 800);
    }
  }

  const filteredBeds = beds.filter((bed) => {
    const { numero_cama, tipo_cultivo } = bed;
    const lowerSearchText = searchText.toLowerCase();
    return (
      numero_cama.toLowerCase().includes(lowerSearchText) ||
      tipo_cultivo.toLowerCase().includes(lowerSearchText)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyText
          fontFamily={"PoppinsBold"}
          text={nameGreenhouse}
          fontSize={20}
          textAlign={"center"}
        />
        <MyText
          fontFamily={"Poppins"}
          text={"¡Estas son las camas que tiene el invernadero!"}
          fontSize={15}
          textAlign={"center"}
        />
        <View style={{ marginTop: 10 }}>
          <SearchInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        {filteredBeds.length > 0 ? (
          filteredBeds.map((bed, index) => (
            <CardBed
              bed={bed}
              key={index}
              onPress={() =>
                navigate("AnalizedImages", {
                  idBed: bed.id_cama,
                  nameGreenhouse,
                  numberBed: bed.numero_cama,
                })
              }
            />
          ))
        ) : (
          <View style={{ marginTop: "15%" }}>
            <MyText
              fontFamily={"PoppinsBold"}
              text={"No hay camas registradas"}
              fontSize={15}
              textAlign={"center"}
            />
          </View>
        )}
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
