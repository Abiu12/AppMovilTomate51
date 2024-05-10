import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import IconButton from "./IconButton";

export default function SearchInput({ value, onChangeText }) {
  return (
    <View style={styles.card}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChangeText}
        />
        <View style={styles.iconContainer}>
          <IconButton icon={"search"} size={22} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    //   backgroundColor: 'black'
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconContainer: {
    position: "absolute",
    right: 10,
  },
});
