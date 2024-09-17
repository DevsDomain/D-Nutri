import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import AguaScreen from "../screens/AguaScreen";
import AlimentacaoScreen from "../screens/AlimentacaoScreen";
import CadastroScreen from "../screens/CadastroScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import TabRoutes from "./tab.routes";

const Stack = createStackNavigator();
export default function StackRoutes() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<
    null | boolean
  >(null);

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
      <Stack.Screen name="Main" component={TabRoutes} />
      <Stack.Screen name="Agua" component={AguaScreen} />
      <Stack.Screen name="Alimentacao" component={AlimentacaoScreen} />
    </Stack.Navigator>
  );
}
