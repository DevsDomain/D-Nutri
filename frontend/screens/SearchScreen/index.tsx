import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Alimentos ou Receitas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite algo para buscar..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 8,
    width: "80%",
    paddingHorizontal: 8,
  },
});
