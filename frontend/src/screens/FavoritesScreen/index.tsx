import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { BACKEND_API_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IuserLogin } from "../../types/user";

interface IAlimentosFavoritos {
  "nomeProduto": string
  "isFavorito": boolean
  "idProduto": string
}

export default function FavoritesScreen() {
  const [favoriteItems, setFavoriteItems] = useState<IAlimentosFavoritos[]>([]);

  // Hook para buscar alimentos favoritos do usuário
  useEffect(() => {
    const response = axios.post(`${BACKEND_API_URL}/FavAlimento/1`).then((response) => {
      console.log(response.data, "Ta vindo");
      setFavoriteItems(response.data);
    });
    const fetchData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        
        if (storedUser) {
          console.log(storedUser, "Stored User");
          const user: IuserLogin = JSON.parse(storedUser);
          try {
            
          } catch (error) {
            console.error("Erro ao buscar alimentos cadastrados:", error);
            return [];
          }
        }
      } catch (error) {
        console.error("Erro ao obter dados do AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => item.idProduto.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.nomeProduto}</Text>}
      />
    </View>
  );
}

// Styles
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
