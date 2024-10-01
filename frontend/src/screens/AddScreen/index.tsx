import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native"; // Importação da navegação
import styles from "../../screens/AddScreen/styles";
import { RootStackParamList } from "../../types";

export default function AddScreen() {
  const [selectedMeal, setSelectedMeal] = useState<string>("Café da Manhã");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Hook de navegação

  const mealOptions = [
    "Café da Manhã",
    "Lanche da Manhã",
    "Almoço",
    "Lanche da Tarde",
    "Jantar",
    "Ceia",
    "Pré-Treino",
    "Pós-Treino",
  ];

  const handleMealSelection = (meal: string) => {
    setSelectedMeal(meal); // Atualiza a refeição selecionada
    if (navigation) {
      navigation.navigate("SelectAlimento"); // Navega para a tela de seleção de alimentos
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {mealOptions.map((meal, index) => (
          <TouchableOpacity
            key={index}
            style={styles.row}
            onPress={() => handleMealSelection(meal)} // Chama a função ao selecionar uma refeição
          >
            <Ionicons
              name={
                selectedMeal === meal ? "radio-button-on" : "radio-button-off"
              }
              size={24}
              color={selectedMeal === meal ? "#FF5733" : "#C0C0C0"}
            />
            <Text style={styles.mealText}>{meal}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
