import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

//Components
import NormalText from "./NormalText";
import IconButton from "./IconButton";
import TopText from "./TopText";
import MyText from "./MyText";

export default function CardNotifications({ notification, onPress }) {
  return (
    <View style={styles.card}>
      <MyText
        fontFamily={"PoppinsBold"}
        text={notification.nombre_invernadero}
        fontSize={20}
        color={"#C62426"}
        textAlign={"center"}
      />
      <View style={styles.containerNotification}>
        <View style={styles.row}>
          <MyText
            fontFamily={"PoppinsBold"}
            text={"Número de cama: "}
            fontSize={15}
            color={"#C62426"}
            textAlign={"center"}
          />
          <MyText
            fontFamily={"PoppinsBold"}
            text={notification.numero_cama}
            fontSize={15}
            textAlign={"center"}
          />
        </View>
        <View style={styles.row}>
          <MyText
            fontFamily={"PoppinsBold"}
            text={"Fecha: "}
            fontSize={15}
            color={"#C62426"}
            textAlign={"center"}
          />
          <MyText
            fontFamily={"PoppinsBold"}
            text={notification.fecha}
            fontSize={15}
            textAlign={"center"}
          />
        </View>
        <View style={styles.row}>
          <MyText
            fontFamily={"PoppinsBold"}
            text={"Detectado: "}
            fontSize={15}
            color={"#C62426"}
            textAlign={"center"}
          />
          <MyText
            fontFamily={"PoppinsBold"}
            text={notification.nombres_detectados}
            fontSize={15}
            textAlign={"center"}
          />
        </View>
      </View>
      <View style={styles.containerImage}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={{ uri: notification.imagen }}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerNotification: {
    flexDirection: "column",
  },
  containerImage: {
    alignItems: "center",
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
