import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const favoriteItems = [
  { id: "1", name: "Banana" },
  { id: "2", name: "Salada de Frutas" },
  { id: "3", name: "Frango Grelhado" },
  // Adicione mais itens favoritos conforme necessário
];

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  item: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#C0C0C0",
  },
});
