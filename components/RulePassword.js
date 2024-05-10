import React from "react";
import { Text, StyleSheet, View } from "react-native";
import NormalText from "./NormalText";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MyText from "./MyText";

export default function RulePassword({ text, value }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "90%" }}>
        <MyText
          fontFamily={"Poppins"}
          text={text}
          fontSize={12}
          textAlign={"left"}
        />
      </View>
      {value && (
        <View style={{ width: "10%" }}>
          <BouncyCheckbox
            size={15}
            fillColor="green"
            isChecked={value}
            style={{
              marginLeft: 10,
            }}
            disabled={true}
          />
        </View>
      )}
    </View>
  );
}
