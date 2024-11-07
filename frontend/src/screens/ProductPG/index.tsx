import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BACKEND_API_URL } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IAlimentos } from "../../types/AlimentosPG";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { UserContext } from "../../context/userContext";
import styles from "./style";
import { useSelector } from "react-redux";
import { selectDate } from "../../dateSlice";
type ProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductDetailsScreenPG"
>;

export default function ProductDetailsScreenPG() {
  const route = useRoute();
  const { barcode, meal } = route.params as { barcode: string; meal: string };
  const [product, setProduct] = useState<IAlimentos | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(100);
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const userContexto = useContext(UserContext);
  const dates = useSelector(selectDate);

  const user = userContexto?.user

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleIncreaseWeight = () => setWeight((prev) => prev + 5);
  const handleDecreaseWeight = () =>
    setWeight((prev) => (prev > 5 ? prev - 5 : 5));

  const fetchProductFromBackend = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/findAlimento/${barcode}`
      );
      const productData = response.data;
      if (productData) {
        setProduct(productData);
      } else {
        throw new Error("Produto não encontrado no backend.");
      }
    } catch (error) {
      console.log("Erro ao buscar no backend:", error);
      await fetchProductFromOpenFoodFacts(); // Busca na OpenFoodFacts se não encontrar no backend
    }
  };

  const fetchProductFromOpenFoodFacts = async () => {
    try {
      const response = await axios.get(
        `https://br.openfoodfacts.net/api/v0/product/${barcode}.json`
      );
      const productData = response.data.product;

      if (productData) {
        setProduct({
          idProduto: 0, // ID temporário, será atribuído pelo backend
          barcode: productData.code,
          nomeProduto: productData.product_name || "Produto desconhecido",
          imageSrc: productData.image_url || "", // Imagem do produto, se disponível
          Proteina: productData.nutriments.proteins_100g?.toString() || "0",
          Caloria:
            productData.nutriments["energy-kcal_100g"]?.toString() || "0",
          Carboidrato:
            productData.nutriments["carbohydrates_100g"]?.toString() || "0",
          gordura: productData.nutriments.fat_100g?.toString() || "0",
          sodio: productData.nutriments.sodium_100g?.toString() || "0",
          acucar: productData.nutriments.sugars_100g?.toString() || "0",
          tiporefeicao: meal,
          quantidade: quantity.toString(),
          isFavorito: false
        });
      } else {
        Alert.alert("Erro", "Produto não encontrado.");
      }
    } catch (error) {
      console.log("Erro ao buscar no OpenFoodFacts:", error);
      Alert.alert("Erro", "Produto não encontrado.");
    }
  };

  useEffect(() => {
    if (barcode) {
      fetchProductFromBackend();
    }
  }, [barcode, dates]);

  const calculateNutrients = (nutrientPer100g: number | undefined) => {
    if (nutrientPer100g === undefined) return "0.00";
    return ((nutrientPer100g / 100) * weight * quantity).toFixed(2);
  };

  const addAlimentoToUserDiary = async () => {
    const data = formatResponse();

    const response = await axios.post(`${BACKEND_API_URL}/addAlimento`, {
      data,
    });

    if (response.status === 201) {
      Alert.alert("Tudo certo!", "Alimento adicionado a dieta do dia.");
      navigation.navigate("Dashboard");
    }
  };

  const formatResponse = () => {
    if (product) {
      const data = {
        idProduto: product.idProduto,
        barcode: product.barcode,
        nomeProduto: product.nomeProduto,
        imageSrc: product.imageSrc,
        Proteina: calculateNutrients(parseFloat(product.Proteina)),
        Caloria: calculateNutrients(parseFloat(product.Caloria)),
        Carboidrato: calculateNutrients(parseFloat(product.Carboidrato)),
        gordura: calculateNutrients(parseFloat(product.gordura)),
        sodio: calculateNutrients(parseFloat(product.sodio)),
        acucar: calculateNutrients(parseFloat(product.acucar)),
        idUser: user?.id,
        date: dates,
        meal: meal,
        quantidade: quantity,
      };
      return data;
    }
    const data = {};
    return data;
  };

  const handleRegister = async () => {
    if (!product) return;

    try {
      const findAlimento = await axios.get(
        `${BACKEND_API_URL}/findAlimento/${product.barcode}`
      ); // VERIFICA SE O ALIMENTO JÁ EXISTE NO BANCO

      if (findAlimento.status !== 201) {
        try {
          const data = formatResponse();
          const response = await axios.post(`${BACKEND_API_URL}/alimentos`, {
            data,
          });

          addAlimentoToUserDiary();
          return;
        } catch (error) {
          console.log("Erro ao registrar o produto:", error);
          Alert.alert("Erro", "Falha ao registrar o produto.");
        }
      }

      addAlimentoToUserDiary();
    } catch (error) {
      console.log("Erro ao buscar produto", error);
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

