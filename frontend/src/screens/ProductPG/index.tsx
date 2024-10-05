import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import { BACKEND_API_URL } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IAlimentos } from "../../types/AlimentosPG";
import styles from "./styles";

export default function ProductDetailsScreenPG() {
  const route = useRoute();
  const navigation = useNavigation();
  const { barcode, refeicao } = route.params as { barcode: string, refeicao: string };
  const [product, setProduct] = useState<IAlimentos | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(50);

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncreaseWeight = () => setWeight((prev) => prev + 5);
  const handleDecreaseWeight = () => setWeight((prev) => (prev > 5 ? prev - 5 : 5));

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/findAlimento/${barcode}`);
        const productData = response.data;
        setProduct(productData);
        if (!productData) {
          Alert.alert("Erro", "Produto não encontrado.");
          return;
        }
      } catch (error) {
        console.error("Erro ao buscar dados do produto:", error);
        Alert.alert("Erro", "Falha ao buscar dados do produto.");
      }
    };

    if (barcode) {
      fetchProductData();
    }
  }, [barcode]);

  const calculateNutrients = (nutrientPer100g: number | undefined) => {
    if (nutrientPer100g === undefined) return "0.00";
    return ((nutrientPer100g / 100) * weight * quantity).toFixed(2);
  };

  const handleRegister = async () => {
    if (!product) return;

    try {
      const response = await axios.post(`${BACKEND_API_URL}/alimentos`, {
        barcode,
        nomeProduto: product.nomeProduto,
        refeicao,
        imageSrc: "http://exemplo.com/imagem.png",
        Proteina: calculateNutrients(parseFloat(product.Proteina)),
        Caloria: calculateNutrients(parseFloat(product.Caloria)),
        Carboidrato: calculateNutrients(parseFloat(product.Carboidrato)),
        gordura: calculateNutrients(parseFloat(product.gordura)),
        sodio: calculateNutrients(parseFloat(product.sodio)),
        acucar: calculateNutrients(parseFloat(product.acucar)),
      });
      console.log("Produto registrado com sucesso:", response.data);
      Alert.alert("Sucesso", "Produto registrado com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("AlimentosConsumidosScreen") }
      ]);
    } catch (error) {
      console.error("Erro ao registrar o produto:", error);
      Alert.alert("Erro", "Falha ao registrar o produto.");
    }
  };

  return (
    <View style={styles.container}>
      {product ? (
        <>
          <Text style={styles.title}>{product.nomeProduto}</Text>

          <View style={styles.rowAdjuster}>
            <View style={styles.adjusterContainer}>
              <TouchableOpacity style={styles.circleButton} onPress={handleDecreaseQuantity}>
                <Ionicons name="remove-circle" size={30} color="#FF9385" />
              </TouchableOpacity>
              <Text style={styles.adjusterText}>{quantity} qtde</Text>
              <TouchableOpacity style={styles.circleButton} onPress={handleIncreaseQuantity}>
                <Ionicons name="add-circle" size={30} color="#94DF83" />
              </TouchableOpacity>
            </View>
            <View style={styles.adjusterContainer}>
              <TouchableOpacity style={styles.circleButton} onPress={handleDecreaseWeight}>
                <Ionicons name="remove-circle" size={30} color="#FF9385" />
              </TouchableOpacity>
              <Text style={styles.adjusterText}>{weight} gramas</Text>
              <TouchableOpacity style={styles.circleButton} onPress={handleIncreaseWeight}>
                <Ionicons name="add-circle" size={30} color="#94DF83" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.nutrientsSummaryContainer}>
            <Text style={styles.nutrientSummary}>Calorias: {calculateNutrients(parseFloat(product.Caloria))} kcal</Text>
            <Text style={styles.nutrientSummary}>Carb. Liq.: {calculateNutrients(parseFloat(product.Carboidrato))}g</Text>
            <Text style={styles.nutrientSummary}>Proteína: {calculateNutrients(parseFloat(product.Proteina))}g</Text>
            <Text style={styles.nutrientSummary}>Gordura: {calculateNutrients(parseFloat(product.gordura))}g</Text>
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.rowTableHeader}>
              <Text style={styles.headerCell}>Tabela</Text>
              <Text style={styles.headerCell}>Qtd.</Text>
              <Text style={styles.headerCell}>%VD</Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableCell}>Caloria</Text>
              <Text style={styles.tableCell}>{calculateNutrients(parseFloat(product.Caloria))} kcal</Text>
              <Text style={styles.tableCell}>1%</Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableCell}>Carboidratos</Text>
              <Text style={styles.tableCell}>{calculateNutrients(parseFloat(product.Carboidrato))}g</Text>
              <Text style={styles.tableCell}>1%</Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableCell}>Proteínas</Text>
              <Text style={styles.tableCell}>{calculateNutrients(parseFloat(product.Proteina))}g</Text>
              <Text style={styles.tableCell}>1%</Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableCell}>Gorduras</Text>
              <Text style={styles.tableCell}>{calculateNutrients(parseFloat(product.gordura))}g</Text>
              <Text style={styles.tableCell}>1%</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('AlimentosConsumidosScreen')}>
            <Text style={styles.registerButtonText}>Registrar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}