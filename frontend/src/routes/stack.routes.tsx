import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import AguaScreen from "../screens/AguaScreen";
import TabRoutes from "./tab.routes";
import SelectAlimento from "../screens/SelectAlimento";
import TabelaNutricional from "../screens/TabelaNutricional"; // Importando TabelaNutricional
import ProfileScreen from "../screens/ProfileScreen";
import EditProfile from "../screens/EditProfile";
import TermsOfUse from "../screens/Terms";
import { StatusBar } from "react-native";
import ScannerScreen from "../screens/BarcodeScreen";
import ProductDetailsScreen from "../screens/ProductScreen";
import React from "react";
import ProductDetailsScreenPG from "../screens/ProductPG";
import AlimentosConsumidosScreen from "../screens/AlimentosConsumidosScreen";
import SelectRefeicao from "../screens/SelectRefeicao";
import { IuserLogin } from "../types/user";

const Stack = createStackNavigator();

export default function StackRoutes() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<
    null | boolean
  >(null);
  const [user, setUser] = useState<IuserLogin>();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const completed = await AsyncStorage.getItem("onboardingCompleted");
      setIsOnboardingCompleted(completed === "true");

      const userData = await AsyncStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };

    checkOnboardingStatus();
  }, [user?.profileCompleted]);

  if (isOnboardingCompleted === null) {
    return null; // Exibe um loading ou algo enquanto verifica o AsyncStorage
  }

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Main"
        component={TabRoutes}
        options={{ headerShown: false }}
      />



      <Stack.Screen
        name="SelectRefeicao"
        component={SelectRefeicao}
        options={{
          headerShown: false,
          title: "Selecione o tipo de Refeição",
          headerStyle: {
            backgroundColor: "#BBDEB5", // Cor de fundo do cabeçalho
          },
          headerTitleStyle: {
            color: "#000000", // Cor do título, ajustada para melhor contraste com o fundo
          },
        }}
      />

      <Stack.Screen
        name="Agua"
        component={AguaScreen}
        options={{
          headerShown: false,
          title: "Selecione a quantidade de Agua",
          headerStyle: {
            backgroundColor: "#BBDEB5", // Cor do cabeçalho
          },
          headerTitleStyle: {
            color: "#000000",
          },
          // Adicionar StatusBar
          header: () => (
            <>
              <StatusBar backgroundColor="#BBDEB5" barStyle="dark-content" />
            </>
          ),
        }}
      />

      <Stack.Screen
        name="SelectAlimento"
        component={SelectAlimento}
        options={{
          headerShown: false,
          title: "Selecione o Alimento",
          headerStyle: {
            backgroundColor: "#BBDEB5", // Cor de fundo do cabeçalho
          },
          headerTitleStyle: {
            color: "#000000", // Cor do título, ajustada para melhor contraste com o fundo
          },
        }}
      />

      {/* Adicionando a tela TabelaNutricional */}
      <Stack.Screen
        name="TabelaNutricional"
        component={TabelaNutricional}
        options={{
          headerShown: false,
          title: "Tabela Nutricional",
          headerStyle: {
            backgroundColor: "#BBDEB5", // Cor de fundo do cabeçalho
          },
          headerTitleStyle: {
            color: "#000000", // Cor do título, ajustada para melhor contraste com o fundo
          },
        }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          title: "Editar Perfil",
          headerStyle: {
            backgroundColor: "#BBDEB5",
          },
          headerTitleStyle: {
            color: "#BBDEB5",
          },
        }}
      />
      <Stack.Screen
        name="AlimentosConsumidosScreen"
        component={AlimentosConsumidosScreen}
        options={{
          headerShown: false,
          title: "Meus Consumos",
          headerStyle: {
            backgroundColor: "#BBDEB5", // Cor de fundo do cabeçalho
          },
          headerTitleStyle: {
            color: "#000000", // Cor do título, ajustada para melhor contraste com o fundo
          },
        }}
      />
      <Stack.Screen
        name="termsOfUse"
        component={TermsOfUse}
        options={{
          headerShown: false,
          title: "Selecione a quantidade de Agua",
          headerStyle: {
            backgroundColor: "#BBDEB5",
          },
          headerTitleStyle: {
            color: "#000000",
          },
          header: () => (
            <>
              <StatusBar backgroundColor="#BBDEB5" barStyle="dark-content" />
            </>
          ),
        }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: "Profile",
          headerStyle: {
            backgroundColor: "#BBDEB5", // Cor de fundo do cabeçalho
          },
          headerTitleStyle: {
            color: "#000000", // Cor do título, ajustada para melhor contraste com o fundo
          },
        }} />



      <Stack.Screen name="scanner" component={ScannerScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="ProductDetailsScreenPG" component={ProductDetailsScreenPG} />

      <Stack.Screen name="Terms" component={TermsOfUse} />
    </Stack.Navigator>
  );
}
