import { useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

//Components
import CardAnalizedImages from "../../components/CardAnalizedImages";
import IconButtonText from "../../components/IconButtonText";

//Animations
import * as Animatable from "react-native-animatable";

//Utils
import { BASE_URL } from "../../utils/config";
import SearchInput from "../../components/SearchInput";
import MyText from "../../components/MyText";
import { useAuth } from "../../AuthContext";

export default function AnalizedImages() {
  const { navigate } = useNavigation();
  const [analizedImages, setAnalizedImages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentUser } = useAuth();

  const {
    params: { idBed, nameGreenhouse, numberBed },
  } = useRoute();
  useFocusEffect(() => {
    if (!isLoaded) {
      fetchAnalizedImages();
    }
  });

  async function fetchAnalizedImages() {
    try {
      const response = await fetch(
        `${BASE_URL}/analizedImage/greenhouse/bed/${idBed}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setAnalizedImages(data);
      }
      setIsLoaded(true);
    } catch (error) {
      this.toastAlert.show(`Hubo un error ${error}`, 800);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      sendImageToBackend(result.assets[0].uri);
    }
  };
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      sendImageToBackend(result.assets[0].uri);
    }
  };
  const sendImageToBackend = async (uriImagen) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: uriImagen,
        name: "image.jpg",
        type: "image/jpeg",
      });
      const response = await fetch(
        `${BASE_URL}/analyzeimage/${idBed}/${currentUser.idUser}`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const dataResponse = await response.json();
      if (response.ok) {
        this.toastSuccess.show(`${dataResponse.message}`, 800);
        setIsLoaded(false);
      }
    } catch (error) {
      this.toastAlert.show(`Hubo un error ${error}`, 800);
    }
  };
  const filteredAnalizedImages = analizedImages.filter((analizedImage) => {
    const { date, detected } = analizedImage;
    const lowerSearchText = searchText.toLowerCase();
    // Verificar si la fecha incluye el texto de búsqueda
    if (date.toLowerCase().includes(lowerSearchText)) {
      return true;
    }
    // Verificar si alguna enfermedad incluye el texto de búsqueda
    if (detected && detected.diseases) {
      const foundDisease = detected.diseases.some((disease) =>
        disease.toLowerCase().includes(lowerSearchText)
      );
      if (foundDisease) {
        return true;
      }
    }
    // Verificar si alguna plaga incluye el texto de búsqueda
    if (detected && detected.plagues) {
      const foundPlague = detected.plagues.some((plague) =>
        plague.toLowerCase().includes(lowerSearchText)
      );
      if (foundPlague) {
        return true;
      }
    }
    return false;
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
          fontFamily={"PoppinsBold"}
          text={"Cama: " + numberBed}
          fontSize={20}
          textAlign={"center"}
        />

        <MyText
          fontFamily={"Poppins"}
          text={"¡Estas son las plagas y enfermedades que se han detectado!"}
          fontSize={15}
          textAlign={"center"}
        />

        <View style={{ marginTop: 10 }}>
          <SearchInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        {filteredAnalizedImages.length > 0 ? (
          filteredAnalizedImages.map((analizedImage, index) => (
            <CardAnalizedImages
              key={index}
              analizedImage={analizedImage}
              onPress={() => {
                setIsLoaded(false);
                navigate("RecomendationsAndActions", {
                  idAnalizedImage: analizedImage.id_analizedImage,
                  urlImage: analizedImage.image,
                  date: analizedImage.date,
                  status: analizedImage.status,
                });
              }}
            />
          ))
        ) : (
          <View>
            <MyText
              fontFamily={"PoppinsBold"}
              text={"No hay enfermedades o plagas detectadas"}
              fontSize={15}
              textAlign={"center"}
            />
          </View>
        )}
        <Animatable.View
          animation="swing"
          iterationDelay={1000}
          iterationCount="infinite"
        >
          <MyText
            fontFamily={"Poppins"}
            text={"¡Analiza una imagen!"}
            fontSize={15}
            textAlign={"center"}
          />
        </Animatable.View>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
        >
          <View style={styles.footerContainer}>
            <IconButtonText
              label={"Toma una foto"}
              icon={"camera-retro"}
              onPress={takePhoto}
              isEnabled={true}
            />
            <IconButtonText
              label={"Selecciona una foto"}
              icon={"file-image"}
              onPress={pickImage}
              isEnabled={true}
            />
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  footerContainer: {
    flexDirection: "row",
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
