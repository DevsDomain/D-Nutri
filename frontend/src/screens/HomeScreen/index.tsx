import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Componente Água */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Agua")}
      >
        <Image
          source={require("../../../assets/LogoD-NutriBG.png")} // Imagem do item Água
          style={styles.icon}
        />
        <Text style={styles.cardText}>Água</Text>
      </TouchableOpacity>

      {/* Componente Alimentação */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Alimentacao")}
      >
        <Image
          source={require("../../../assets/LogoD-NutriBG.png")} // Imagem do item Alimentação
          style={styles.icon}
        />
        <Text style={styles.cardText}>Alimentação</Text>
      </TouchableOpacity>

      {/* Outros componentes, como exercício, sono, etc. */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("scanner")}
      >
        <Image
          source={require("../../../assets/LogoD-NutriBG.png")} // Imagem do item Exercício
          style={styles.icon}
        />
        <Text style={styles.cardText}>Exercício</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Sono")}
      >
        <Image
          source={require("../../../assets/LogoD-NutriBG.png")} // Imagem do item Sono
          style={styles.icon}
        />
        <Text style={styles.cardText}>Sono</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
