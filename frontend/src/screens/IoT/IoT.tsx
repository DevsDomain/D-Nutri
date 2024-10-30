import { BACKEND_API_URL } from "@env";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

interface FoodData {
  product: {
    product_name: string;
    brands: string;
    nutriments: {
      energy_kcal_100g: number;
      carbohydrates_100g: number;
      sugars_100g: number;
      proteins_100g: number;
      fat_100g: number;
      sodium_100g: number;
    };
    [key: string]: any; // Permite outras propriedades dinâmicas
  };
  [key: string]: any; // Permite outras propriedades dinâmicas
}

const BarcodeScreen: React.FC = () => {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [foodData, setFoodData] = useState<FoodData | null>(null);

  useEffect(() => {
    const fetchFoodData = async (barcode: string) => {
      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );
        const data: FoodData = await response.json();
        setFoodData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do produto:", error);
      }
    };

    if (barcode) {
      fetchFoodData(barcode);
    }
  }, [barcode]);

  // Recebe o código de barras do servidor que processa as imagens do ESP32-CAM
  useEffect(() => {
    const getBarcodeFromServer = async () => {
      try {
        const response = await fetch(`${BACKEND_API_URL}/barcode`);
        const data = await response.json();
        setBarcode(data.barcode);
      } catch (error) {
        console.error("Erro ao buscar código de barras do servidor:", error);
      }
    };

    getBarcodeFromServer();
  }, []);

  return (
    <View>
      <Text>Barcode: {barcode}</Text>
      {foodData && (
        <View>
          <Text>Product Name: {foodData.product.product_name}</Text>
          <Text>Brand: {foodData.product.brands}</Text>
          <Text>Calories: {foodData.product.nutriments.energy_kcal_100g}</Text>
          <Text>Carbohydrates: {foodData.product.carbohydrates_100g}</Text>
          <Text>Sugars: {foodData.product.sugars_100g}</Text>
          <Text>Proteins: {foodData.product.proteins_100g}</Text>
          <Text>Fat: {foodData.product.fat_100g}</Text>
          <Text>Sodium: {foodData.product.sodium_100g}</Text>
        </View>
      )}
    </View>
  );
};

export default BarcodeScreen;
