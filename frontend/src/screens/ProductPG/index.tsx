import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { BACKEND_API_URL } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IAlimentos } from "../../types/AlimentosPG";

export default function ProductDetailsScreenPG() {
  const route = useRoute();
  const { barcode } = route.params as { barcode: string };
  const [product, setProduct] = useState<IAlimentos | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(100);
  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleIncreaseWeight = () => setWeight((prev) => prev + 5);
  const handleDecreaseWeight = () =>
    setWeight((prev) => (prev > 5 ? prev - 5 : 5));

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API_URL}/findAlimento/${barcode}`
        );
        const productData = response.data;
        setProduct(productData)
        if (!productData) {
          Alert.alert("Erro", "Produto não encontrado.");
          return;
        }

      } catch (error) {
        // Tratamento de erro com alerta e log no console
        console.error("Erro ao buscar dados do produto:", error);
        Alert.alert("Erro", "Falha ao buscar dados do produto.");
      }
    };

    if (barcode) {
      fetchProductData();
    }setProduct
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
        imageSrc: "http://exemplo.com/imagem.png", // Supondo que o link da imagem seja obtido de algum lugar
        Proteina: calculateNutrients(parseFloat(product.Proteina)),
        Caloria: calculateNutrients(parseFloat(product.Caloria)),
        Carboidrato: calculateNutrients(parseFloat(product.Carboidrato)),
        gordura: calculateNutrients(parseFloat(product.gordura)),
        sodio: calculateNutrients(parseFloat(product.sodio)),
        acucar: calculateNutrients(parseFloat(product.acucar)),
      });
      console.log("Produto registrado com sucesso:", response.data);

      Alert.alert("Sucesso", "Produto registrado com sucesso!");
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
          <Text style={styles.brands}>Código de barras: {product.barcode}</Text>

          {/* Seção de ajuste de quantidade e peso */}
          <View style={styles.row}>
            <View style={styles.column}>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={handleDecreaseQuantity}
              >
                <Ionicons name="remove-circle" size={30} color="red" />
              </TouchableOpacity>
              <Text style={styles.valueText}>{quantity} Porção</Text>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={handleIncreaseQuantity}
              >
                <Ionicons name="add-circle" size={30} color="green" />
              </TouchableOpacity>
            </View>

            <View style={styles.column}>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={handleDecreaseWeight}
              >
                <Ionicons name="remove-circle" size={30} color="red" />
              </TouchableOpacity>
              <Text style={styles.valueText}>{weight} g</Text>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={handleIncreaseWeight}
              >
                <Ionicons name="add-circle" size={30} color="green" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabela de informações nutricionais */}
          <View style={styles.table}>
            <View style={styles.rowTable}>
              <Text style={styles.headerText}>Caloria</Text>
              <Text style={styles.headerText}>
                {calculateNutrients(parseFloat(product.Caloria))} kcal
              </Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableText}>Carboidratos</Text>
              <Text style={styles.tableText}>
                {calculateNutrients(parseFloat(product.Carboidrato))} g
              </Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableText}>Açúcares</Text>
              <Text style={styles.tableText}>
                {calculateNutrients(parseFloat(product.acucar))} g
              </Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableText}>Proteínas</Text>
              <Text style={styles.tableText}>
                {calculateNutrients(parseFloat(product.Proteina))} g
              </Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableText}>Gorduras</Text>
              <Text style={styles.tableText}>
                {calculateNutrients(parseFloat(product.gordura))} g
              </Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableText}>Sódio</Text>
              <Text style={styles.tableText}>
                {calculateNutrients(parseFloat(product.sodio))} mg
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Registrar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4E3",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4C956C",
  },
  brands: {
    fontSize: 18,
    marginBottom: 20,
    color: "#4C956C",
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  column: {
    justifyContent: "center",
    alignItems: "center",
  },
  circleButton: {
    padding: 10,
  },

  valueText: {
    fontSize: 16,
    marginVertical: 10,
    color: "#4C956C",
  },
  table: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  rowTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerText: {
    fontWeight: "bold",
    color: "#4C956C",
  },
  tableText: {
    color: "#4C956C",
  },
  registerButton: {
    backgroundColor: "#4C956C",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
