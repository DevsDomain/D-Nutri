import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types"; // Importe os tipos de navegação
import styles from "./styles"; // Importe seus estilos

export default function SelectRefeicao() {
  const route = useRoute();
  const { barcode } = route.params as { barcode: string };
  const [selectedMeal, setSelectedMeal] = useState<string>("Café da Manhã");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Hook de navegação com tipos

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
      navigation.navigate("ProductDetailsScreenPG", {
        barcode: barcode,
        meal: meal,
      }); // Navega para a tela de seleção de alimentos
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
              color={selectedMeal === meal ? "#FF9385" : "#C0C0C0"}
            />
            <Text style={styles.mealText}>{meal}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
