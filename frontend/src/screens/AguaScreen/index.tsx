import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function Agua() {
  const [quantity, setQuantity] = useState(150);
  const [savedQuantity, setSavedQuantity] = useState<number | null>(null); // Estado para armazenar o valor ao pressionar OK

  console.log(savedQuantity);

  const decrement = () => setQuantity(quantity > 0 ? quantity - 50 : 0);
  const increment = () => setQuantity(quantity + 50);

  const handleSave = () => {
    setSavedQuantity(quantity); // Salva o valor atual
    Alert.alert("Quantidade salva", `Você salvou ${quantity} ml.`);
  };

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Selecione a quantidade de Agua</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Image
            source={{ uri: "https://img.icons8.com/color/48/000000/water.png" }}
            style={styles.icon}
          />
          <Text style={styles.foodType}>Água</Text>
        </View>

        <View style={styles.row}>
          {/* Botão de decremento à esquerda */}
          <TouchableOpacity onPress={decrement} style={styles.circleButton}>
            <Ionicons name="remove-circle" size={30} color="red" />
          </TouchableOpacity>

          {/* Texto com a quantidade */}
          <Text style={styles.quantity}>{quantity} ml</Text>

          {/* Botão de incremento à direita */}
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