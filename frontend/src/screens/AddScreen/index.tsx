import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Registro</Text>
      <Button
        title="Adicionar Alimento"
        onPress={() => alert("Adicionando alimento...")}
      />
      <Button
        title="Adicionar Refeição"
        onPress={() => alert("Adicionando refeição...")}
      />
      <Button
        title="Adicionar Exercício"
        onPress={() => alert("Adicionando exercício...")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
});
