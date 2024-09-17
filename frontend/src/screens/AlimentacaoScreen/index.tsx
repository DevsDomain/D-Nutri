import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function AlimentacaoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Alimentação</Text>
      {/* Adicione aqui o layout e a lógica para adicionar refeições */}
      <Button
        title="Adicionar Refeição"
        onPress={() => alert("Refeição adicionada!")}
        color="#94df83"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
