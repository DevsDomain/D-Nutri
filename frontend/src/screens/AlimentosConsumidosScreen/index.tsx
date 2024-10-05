import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { BACKEND_API_URL } from "@env";
import styles from "./styles";

export default function AlimentosConsumidosScreen() {
  const [alimentosConsumidos, setAlimentosConsumidos] = useState([]);
  const [totals, setTotals] = useState({
    calorias: 0,
    carboidrato: 0,
    acucar: 0,
    proteina: 0,
    gordura: 0,
    sodio: 0,
  });

  useEffect(() => {
    const fetchAlimentos = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/alimentos`);
        const alimentos = response.data;
        setAlimentosConsumidos(alimentos);

        // Calcula os totais
        let totalCalorias = 0;
        let totalCarboidrato = 0;
        let totalAcucar = 0;
        let totalProteina = 0;
        let totalGordura = 0;
        let totalSodio = 0;

        alimentos.forEach((alimento) => {
          totalCalorias += parseFloat(alimento.calorias) || 0;
          totalCarboidrato += parseFloat(alimento.carboidrato) || 0;
          totalAcucar += parseFloat(alimento.acucar) || 0;
          totalProteina += parseFloat(alimento.proteina) || 0;
          totalGordura += parseFloat(alimento.gordura) || 0;
          totalSodio += parseFloat(alimento.sodio) || 0;
        });

        setTotals({
          calorias: totalCalorias,
          carboidrato: totalCarboidrato,
          acucar: totalAcucar,
          proteina: totalProteina,
          gordura: totalGordura,
          sodio: totalSodio,
        });
      } catch (error) {
        console.error("Erro ao buscar alimentos do banco de dados:", error);
      }
    };

    fetchAlimentos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alimentos Consumidos</Text>
      <ScrollView style={styles.scrollView}>
        {alimentosConsumidos.map((alimento, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{alimento.nomeProduto}</Text>
              <Text style={styles.itemRefeicao}>{alimento.refeicao}</Text>
            </View>
            <Text style={styles.itemQuantidade}>{alimento.quantidade}</Text>
            <View style={styles.itemNutrients}>
              <Text style={styles.nutrient}>Calorias: {alimento.calorias} kcal</Text>
              <Text style={styles.nutrient}>Carboidrato: {alimento.carboidrato}g</Text>
              <Text style={styles.nutrient}>Açúcares: {alimento.acucar}g</Text>
              <Text style={styles.nutrient}>Proteína: {alimento.proteina}g</Text>
              <Text style={styles.nutrient}>Gordura: {alimento.gordura}g</Text>
              <Text style={styles.nutrient}>Sódio: {alimento.sodio}mg</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Calorias= {totals.calorias.toFixed(2)} kcal</Text>
        <Text style={styles.footerText}>Carboidratos= {totals.carboidrato.toFixed(2)}g</Text>
        <Text style={styles.footerText}>Açúcares= {totals.acucar.toFixed(2)}g</Text>
        <Text style={styles.footerText}>Proteínas= {totals.proteina.toFixed(2)}g</Text>
        <Text style={styles.footerText}>Gordura= {totals.gordura.toFixed(2)}g</Text>
        <Text style={styles.footerText}>Sódio= {totals.sodio.toFixed(2)}mg</Text>
      </View>
      
    </View>
  );
}

