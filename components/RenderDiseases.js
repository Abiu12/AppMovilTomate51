import MyText from "./MyText";

export default function RenderDiseases({ analizedImage }) {
  const { detected } = analizedImage;

  if (detected && detected.diseases && detected.diseases.length > 0) {
    const textDiseases = detected.diseases.join(", "); // Une las enfermedades con coma y espacio
    return (
      <MyText
        fontFamily={"PoppinsBold"}
        text={textDiseases}
        fontSize={15}
        color={"#C62426"}
      />
    );
  } else {
    return (
      <MyText
        fontFamily={"PoppinsBold"}
        text={"No encontradas"}
        fontSize={15}
        color={"#C62426"}
      />
    );
  }
}
