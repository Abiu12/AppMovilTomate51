import { View, StyleSheet } from "react-native";

//Components
import NormalText from "./NormalText";
import IconButton from "./IconButton";
import MyText from "./MyText";

export default function CardGreenhouse({ greenhouse, onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.containerGreenhouse}>
        <View style={styles.column}>
          <View style={styles.row}>
            <MyText
              fontFamily={"PoppinsBold"}
              text={"Nombre: "}
              fontSize={15}
            />
            <MyText
              fontFamily={"PoppinsBold"}
              text={greenhouse.nombre}
              fontSize={15}
              color={"#C62426"}
            />
          </View>
          <View style={styles.row}>
            <MyText
              fontFamily={"PoppinsBold"}
              text={"Tipo de invernadero: "}
              fontSize={15}
            />
            <MyText
              fontFamily={"PoppinsBold"}
              text={greenhouse.tipo_invernadero}
              fontSize={15}
              color={"#C62426"}
            />
          </View>
          <View style={styles.row}>
            <MyText
              fontFamily={"PoppinsBold"}
              text={"Humedad: "}
              fontSize={15}
            />
            <MyText
              fontFamily={"PoppinsBold"}
              text={greenhouse.humedad}
              fontSize={15}
              color={"#C62426"}
            />
          </View>
          <View style={styles.row}>
            <MyText
              fontFamily={"PoppinsBold"}
              text={"Tamaño: "}
              fontSize={15}
            />
            <MyText
              fontFamily={"PoppinsBold"}
              text={greenhouse.tamanio}
              fontSize={15}
              color={"#C62426"}
            />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconContainer}>
            <IconButton icon={"eye"} onPress={onPress} size={28}></IconButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginTop: 7,
    marginBottom: 5,
    borderWidth: 1,
  },
  containerGreenhouse: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {},
  column: {
    flexDirection: "column",
    width: "89%",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    marginRight: 10,
    flexWrap: "wrap",
  },
});
