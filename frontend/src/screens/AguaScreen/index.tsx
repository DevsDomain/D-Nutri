import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_API_URL } from "@env";
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação

export default function Agua() {
  const [quantity, setQuantity] = useState(150);
  const [savedQuantity, setSavedQuantity] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const MAX_QUANTITY = 1000;

  const navigation = useNavigation();

  const decrement = () => setQuantity(quantity > 0 ? quantity - 50 : 0);
  const increment = () => setQuantity(quantity < MAX_QUANTITY ? quantity + 50 : MAX_QUANTITY);

  const handleSave = async () => {
    // Check if userId and date are provided
    if (userId && date) {
      try {
        // Make PUT request to update the water quantity for the user
        const response = await axios.post(`${BACKEND_API_URL}/agua/${userId}`, {
          date: date,
          quantify: quantity
        });
        // Update the saved quantity state
        setSavedQuantity(quantity);

        // Show a success alert to the user
        Alert.alert("Quantidade salva", `Você salvou ${quantity} ml.`, [
          { text: "OK", onPress: () => navigation.goBack() }, // Navigate back to the previous screen
        ]);
      } catch (error) {
        // Log error and show an alert if the request fails
        console.error("Erro ao salvar a quantidade de água:", error);
        Alert.alert("Erro", "Não foi possível salvar a quantidade de água.");
      }
    } else {
      // Show an alert if userId or date is not provided
      Alert.alert("Erro", "Usuário ou data não encontrada.");
    }
  };

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const storedDate = await AsyncStorage.getItem("date");

      if (storedUser && storedDate) {
        const user = JSON.parse(storedUser);
        setUserId(user.id);
        setDate(JSON.parse(storedDate));
      }
    } catch (error) {
      console.error("Erro ao obter dados do AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione a quantidade de Água</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Image
            source={{ uri: "https://img.icons8.com/color/48/000000/water.png" }}
            style={styles.icon}
          />
          <Text style={styles.foodType}>Água</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={decrement} style={styles.circleButton}>
            <Ionicons name="remove-circle" size={30} color="red" />
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity} ml</Text>

          <TouchableOpacity onPress={increment} style={styles.circleButton}>
            <Ionicons name="add-circle" size={30} color="green" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.okButton} onPress={handleSave}>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>

        {savedQuantity !== null && (
          <Text style={styles.savedText}>
            Quantidade salva: {savedQuantity} ml
          </Text>
        )}
      </View>
    </View>
  );
}