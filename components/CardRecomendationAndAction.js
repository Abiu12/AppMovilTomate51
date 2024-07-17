import { View, StyleSheet } from "react-native";

//Components
import NormalText from "./NormalText";
import TopText from "./TopText";
import MyText from "./MyText";

export default function CardRecomendationAndAction({
  recomendationAndAction,
  onPress,
}) {
  return (
    <View style={styles.card}>
      <MyText
        fontFamily={"PoppinsBold"}
        text={recomendationAndAction.nombre}
        fontSize={20}
        color={"#C62426"}
        textAlign={"center"}
      />

      <View style={styles.row}>
        <MyText
          fontFamily={"PoppinsBold"}
          text={"Nombre científico: "}
          fontSize={15}
        />
        <MyText
          fontFamily={"PoppinsBold"}
          text={recomendationAndAction.nombre_cientifico}
          fontSize={15}
          color={"#C62426"}
        />
      </View>
      <View style={styles.row}>
        <MyText
          fontFamily={"PoppinsBold"}
          text={"Descripcion: "}
          fontSize={15}
        />
        <MyText
          fontFamily={"PoppinsBold"}
          text={recomendationAndAction.descripcion}
          fontSize={15}
          color={"#C62426"}
          textAlign={"justify"}
        />
      </View>

      <View style={styles.row}>
        <MyText fontFamily={"PoppinsBold"} text={"Acciones: "} fontSize={15} />
        <MyText
          fontFamily={"PoppinsBold"}
          text={recomendationAndAction.acciones}
          fontSize={15}
          color={"#C62426"}
          textAlign={"justify"}
        />
      </View>

      <View style={styles.row}>
        <MyText
          fontFamily={"PoppinsBold"}
          text={"Recomendaciones: "}
          fontSize={15}
        />
        <MyText
          fontFamily={"PoppinsBold"}
          text={recomendationAndAction.recomendaciones}
          fontSize={15}
          color={"#C62426"}
          textAlign={"justify"}
        />
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
    shadowColor: "#000",
    borderWidth: 1,
  },
  containerBed: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    right: 0,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    marginRight: 10,
    flexWrap: "wrap",
  },
});
