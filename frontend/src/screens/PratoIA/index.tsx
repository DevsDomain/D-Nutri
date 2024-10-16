import React, { useState, useRef } from "react";
import { View, Button, Text, Image, StyleSheet } from "react-native";
import {
  CameraType,
  useCameraPermissions,
  Camera,
  CameraPictureOptions,
  CameraCapturedPicture,
  CameraView,
} from "expo-camera";
//import Clarifai from "clarifai";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const Clarifai = require("clarifai");

const clarifaiApp = new Clarifai.App({
  apiKey: "5527a4e4442b46cd94199aa827d3b606",
});

// Inicialize a API do Clarifai
/*const clarifaiApp = new Clarifai.App({
  apiKey: "5527a4e4442b46cd94199aa827d3b606",
});
*/
const FoodPhotoScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [foodDescription, setFoodDescription] = useState<string | null>(null);
  const [calories, setCalories] = useState<number | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    // Carregando as permissões da câmera.
    return <View />;
  }

  if (!permission.granted) {
    // Caso as permissões não tenham sido concedidas ainda.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos da sua permissão para acessar a câmera
        </Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        // Define as opções para capturar a foto
        const options: CameraPictureOptions = {
          quality: 0.7, // Qualidade entre 0 e 1
          base64: true, // Incluir imagem como base64
          exif: true, // Incluir dados EXIF
        };

        // Captura a imagem usando as opções definidas
        const picture = await cameraRef.current.takePictureAsync(options);

        if (picture) {
          console.log("Imagem URI:", picture.uri);
          console.log("Dados EXIF:", picture.exif);

          setPhotoUri(picture.uri);

          // Copiar o arquivo de imagem para um local permanente, se necessário
          const fileUri = `${FileSystem.documentDirectory}photo.jpg`;
          await FileSystem.copyAsync({
            from: picture.uri,
            to: fileUri,
          });

          console.log("Imagem copiada para:", fileUri);

          // Ler a imagem como base64 para enviar à API Clarifai
          const base64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: "base64",
          });

          // Usar API Clarifai para identificar o alimento
          const response = await clarifaiApp.models.predict(
            "bd3670d8919742639576a2b293496586", // Modelo de alimentação
            { base64 }
          );

          const concepts = response.outputs[0].data.concepts;
          const foodDescription = concepts
            .map((concept: any) => concept.name)
            .join(", ");
          setFoodDescription(foodDescription);

          // Usar API de nutrição para calcular calorias
          await fetchNutritionInfo(foodDescription);
        }
      } catch (error) {
        console.error("Erro ao capturar a imagem:", error);
      }
    }
  };

  const fetchNutritionInfo = async (foodDescription: string) => {
    const nutritionApiUrl = `https://api.nutritionix.com/v1_1/natural/nutrients`;
    const nutritionApiKey = "YOUR_NUTRITIONIX_API_KEY";
    const nutritionApiSecret = "YOUR_NUTRITIONIX_API_SECRET";

    const nutritionApiQuery = {
      query: foodDescription,
      timezone: "US/Eastern",
    };

    try {
      const nutritionApiResponse = await axios.post(
        nutritionApiUrl,
        nutritionApiQuery,
        {
          headers: {
            "Content-Type": "application/json",
            "x-app-id": nutritionApiKey,
            "x-app-key": nutritionApiSecret,
          },
        }
      );

      const nutritionApiData = await nutritionApiResponse.data;
      const totalCalories = nutritionApiData.total_calories;
      setCalories(totalCalories);
    } catch (error) {
      console.error("Erro ao consultar a API de nutrição:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Button title="Take Picture" onPress={takePicture} />
          <Button
            title="Alternar Câmera"
            onPress={() => setFacing(facing === "back" ? "front" : "back")}
          />
        </View>
      </CameraView>
      {photoUri && (
        <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />
      )}
      {foodDescription && <Text>{foodDescription}</Text>}
      {calories && <Text>Estimated Calories: {calories}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
});

export default FoodPhotoScreen;
