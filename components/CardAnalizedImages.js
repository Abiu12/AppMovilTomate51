import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

//Components
import NormalText from "./NormalText";
import RenderDiseases from "./RenderDiseases";
import RenderPlagues from "./RenderPlagues";
import MyText from "./MyText";

export default function CardAnalizedImages({ analizedImage, onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.containerAnalizedImage}>
        <View style={styles.row}>
          <MyText
            fontFamily={"PoppinsBold"}
            text={"Enfermedades: "}
            fontSize={15}
          />

          <RenderDiseases analizedImage={analizedImage} />
        </View>
        <View style={styles.row}>
          <MyText fontFamily={"PoppinsBold"} text={"Plagas: "} fontSize={15} />
          <RenderPlagues analizedImage={analizedImage} />
        </View>
        <View style={styles.row}>
          <MyText fontFamily={"PoppinsBold"} text={"Fecha: "} fontSize={15} />
          <MyText
            fontFamily={"PoppinsBold"}
            text={analizedImage.date}
            fontSize={15}
            color={"#C62426"}
          />
        </View>
        <View style={styles.row}>
          <MyText fontFamily={"PoppinsBold"} text={"Estado: "} fontSize={15} />
          <MyText
            fontFamily={"PoppinsBold"}
            text={analizedImage.status}
            fontSize={15}
            color={"#C62426"}
          />
        </View>
      </View>
      <View style={styles.containerImage}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={{ uri: analizedImage.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  containerAnalizedImage: {
    alignItems: "center",
  },
  containerImage: {
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    marginRight: 10,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    marginRight: 10,
    flexWrap: "wrap",
  },
  image: {
    width: 100, // Ancho de la imagen
    height: 100, // Alto de la imagen
    borderRadius: 8, // Borde redondeado
  },
});
