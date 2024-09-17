import React from "react";
import { View, Text, StatusBar, Image, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Roboto_400Regular, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { RootStackParamList } from "../../types"; // Certifique-se de que este caminho esteja correto

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

type Props = {
  navigation: OnboardingScreenNavigationProp;
};

const logo = require('../../assets/logo.png'); // Ajuste o caminho conforme necessário

export default function OnboardingScreen({ navigation }: Props) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_800ExtraBold,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_900Black
  });

  if (!fontsLoaded) {
    return null; // Você pode querer adicionar um carregador de fontes aqui
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>D-Nutri</Text>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.subtitulo1}>Coma bem!</Text>
      <Text style={styles.subtitulo2}>Transforme sua dieta e sua saúde com facilidade!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Cadastro')} // Navega para a tela Cadastro
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
      <View style={styles.rowContainer}>
        <Text style={styles.login2}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
      </View>
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  login: {
    color: "#91C788",
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
    fontWeight: 'bold',
    marginLeft: 3,
  },
  login2: {
    color: "#797878",
    fontSize: 17,
    fontFamily: "Roboto_400Regular",
    marginLeft: 10,
  },
  titulo: {
    color: "#91C788",
    fontSize: 40,
    fontFamily: "Roboto_700Bold",
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 0,
  },
  subtitulo1: {
    color: "black",
    fontSize: 30,
    fontFamily: "Nunito_800ExtraBold",
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitulo2: {
    color: "#9c9a9a",
    fontSize: 18,
    fontFamily: "Roboto_400Regular",
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#64A759",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 120,
    marginTop: 55,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontFamily: "Roboto_900Black",
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});