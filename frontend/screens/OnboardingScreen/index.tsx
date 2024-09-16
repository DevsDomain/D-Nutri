import React, { useEffect } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types"; // Defina seus tipos de navegação em um arquivo separado

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

type Props = {
  navigation: OnboardingScreenNavigationProp;
};

export default function OnboardingScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/LogoD-NutriBG.png")} // Use a imagem correspondente
        style={styles.image}
      />
      <Text style={styles.title}>Coma Bem!</Text>
      <Text style={styles.subtitle}>
        Transforme sua dieta e sua saúde com facilidade.
      </Text>
      <Button
        title="Começar"
        onPress={() => navigation.navigate("Login")}
        color="#94df83"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
});
