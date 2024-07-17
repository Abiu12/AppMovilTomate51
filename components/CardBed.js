import { View, StyleSheet } from "react-native";

//Components
import NormalText from "./NormalText";
import IconButton from "./IconButton";
import MyText from "./MyText";

export default function CardBed({ bed, onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.containerBed}>
        <View style={styles.column}>
          <View style={styles.row}>
            <MyText fontFamily={"PoppinsBold"} text={"Cama: "} fontSize={15} />
            <MyText
              fontFamily={"PoppinsBold"}
              text={bed.numero_cama}
              fontSize={15}
              color={"#C62426"}
            />
          </View>
          <View style={styles.row}>
            <MyText
              fontFamily={"PoppinsBold"}
              text={"Tipo de cultivo: "}
              fontSize={15}
            />
            <MyText
              fontFamily={"PoppinsBold"}
              text={bed.tipo_cultivo}
              fontSize={15}
              color={"#C62426"}
            />
          </View>
        </View>

        <View style={styles.iconContainer}>
          <IconButton icon={"eye"} onPress={onPress} size={28} />
        </View>
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
  column: {
    flexDirection: "column",
    marginRight: 10,
    // backgroundColor: 'black'
  },
  row: {
    width: "100%",
    flexDirection: "row",
    marginRight: 10,
    flexWrap: "wrap",
  },
});
