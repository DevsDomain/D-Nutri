import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import AguaScreen from "../screens/AguaScreen";
import CadastroScreen from "../screens/CadastroScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import TabRoutes from "./tab.routes";
import SelectAlimento from "../screens/SelectAlimento";
import TabelaNutricional from "../screens/TabelaNutricional"; // Importando TabelaNutricional
import { StatusBar } from "react-native";
import EditProfile from "../screens/EditProfile";
import TermsOfUse from "../screens/Terms";

const Stack = createStackNavigator();

export default function StackRoutes() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<null | boolean>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const completed = await AsyncStorage.getItem("onboardingCompleted");
      setIsOnboardingCompleted(completed === "true");
    };

    checkOnboardingStatus();
  }, []);

  if (isOnboardingCompleted === null) {
    // Exibe um loading ou algo enquanto verifica o AsyncStorage
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={isOnboardingCompleted ? "Login" : "Onboarding"}
      screenOptions={({ route }) => ({
        headerShown:
          route.name === "Onboarding" ||
          route.name === "Login" ||
          route.name === "Cadastro"
            ? false
            : true,
      })}
    >
      {!isOnboardingCompleted && (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen
        name="Main"
        component={TabRoutes}
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
          headerShown: true,
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
          headerShown: true,
          title: "Tabela Nutricional",
          headerStyle: {
            backgroundColor: "#BBDEB5", // Cor de fundo do cabeçalho
          },
          headerTitleStyle: {
            color: "#000000", // Cor do título, ajustada para melhor contraste com o fundo
          },
        }}
      />
    </Stack.Navigator>
  );
}
