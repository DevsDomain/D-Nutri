import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { BACKEND_API_URL } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

interface ProductDetails {
  product_name: string;
  brands: string;
  nutriments: {
    energy_kcal_100g?: number;
    carbohydrates_100g?: number;
    sugars_100g?: number;
    proteins_100g?: number;
    fat_100g?: number;
    sodium_100g?: number;
  };
}

export default function ProductDetailsScreen() {
  const route = useRoute();
  const { barcode } = route.params as { barcode: string };
  const [product, setProduct] = useState<ProductDetails | null>(null);
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
          `https://br.openfoodfacts.net/api/v0/product/${barcode}.json`
        );
        //console.log("Dados do produto:", response.data.product);
        const productData = response.data.product;
        if (!productData) {
          console.log("Produto não encontrado.");
          Alert.alert("Erro", "Produto não encontrado.");
          return;
        }

        const nutriments = productData.nutriments || {}; // Fallback para evitar undefined

        setProduct({
          ...response.data.product,
          nutriments: {
            energy_kcal_100g: nutriments["energy-kcal_100g"],
            carbohydrates_100g: nutriments.carbohydrates_100g,
            sugars_100g: nutriments.sugars_100g,
            proteins_100g: nutriments.proteins_100g,
            fat_100g: nutriments.fat_100g,
            sodium_100g: nutriments.sodium_100g,
          },
        });
      } catch (error) {
        // Tratamento de erro com alerta e log no console
        console.log("Erro ao buscar dados do produto:", error);
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
        nomeProduto: product.product_name,
        imageSrc: "http://exemplo.com/imagem.png", // Supondo que o link da imagem seja obtido de algum lugar
        Proteina: calculateNutrients(product.nutriments.proteins_100g),
        Caloria: calculateNutrients(product.nutriments.energy_kcal_100g),
        Carboidrato: calculateNutrients(product.nutriments.carbohydrates_100g),
        gordura: calculateNutrients(product.nutriments.fat_100g),
        sodio: calculateNutrients(product.nutriments.sodium_100g),
        acucar: calculateNutrients(product.nutriments.sugars_100g),
      });
      //console.log("Produto registrado com sucesso:", response.data);

      Alert.alert("Sucesso", "Produto registrado com sucesso!");
    } catch (error) {
      console.log("Erro ao registrar o produto:", error);
      Alert.alert("Erro", "Falha ao registrar o produto.");
    }
  };

  return (
    <View style={styles.container}>
      {product ? (
        <>
          <Text style={styles.title}>{product.product_name}</Text>
          <Text style={styles.brands}>Marca: {product.brands}</Text>

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
              <Text style={styles.headerText}>Valor energético</Text>
              <Text style={styles.headerText}>
                {calculateNutrients(product.nutriments.energy_kcal_100g)} kcal
              </Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableText}>Carboidratos</Text>
              <Text style={styles.tableText}>
                {calculateNutrients(product.nutriments.carbohydrates_100g)} g
              </Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableText}>Açúcares</Text>
              <Text style={styles.tableText}>
                {calculateNutrients(product.nutriments.sugars_100g)} g
              </Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableText}>Proteínas</Text>
              <Text style={styles.tableText}>
                {calculateNutrients(product.nutriments.proteins_100g)} g
              </Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableText}>Gorduras</Text>
              <Text style={styles.tableText}>
                {calculateNutrients(product.nutriments.fat_100g)} g
              </Text>
            </View>
            <View style={styles.rowTable}>
              <Text style={styles.tableText}>Sódio</Text>
              <Text style={styles.tableText}>
                {calculateNutrients(product.nutriments.sodium_100g)} mg
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

