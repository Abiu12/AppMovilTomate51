import MyText from "./MyText";

export default function RenderPlagues({ analizedImage }) {
  const { detected } = analizedImage;

  if (detected && detected.plagues && detected.plagues.length > 0) {
    const textPlagues = detected.plagues.join(", ");
    return (
      <MyText
        fontFamily={"PoppinsBold"}
        text={textPlagues}
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
