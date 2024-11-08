import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import CadastroScreen from "../screens/CadastroScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { IuserLogin } from "../types/user";

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<null | boolean>(null);
  const [user, setUser] = useState<IuserLogin | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const completed = await AsyncStorage.getItem("onboardingCompleted");
      setIsOnboardingCompleted(completed === "true");

      const userData = await AsyncStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };

    checkOnboardingStatus();
  }, [user?.profileCompleted]);

  // Enquanto `AsyncStorage` está verificando as informações, retorna `null`
  if (isOnboardingCompleted === null) {
    return null; // Exibe um carregamento temporário enquanto a verificação ocorre
  }

  return (
    <AuthStack.Navigator
      initialRouteName={isOnboardingCompleted ? "Login" : "Onboarding"}
      screenOptions={({ navigation, route }) => ({
        headerShown: !(route.name === "Onboarding"),
        headerLeft:
          route.name === "Login" ? () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
              <Text style={{ marginLeft: 5, fontSize: 18 }}>Voltar</Text>
            </TouchableOpacity>
          ) : undefined,
      })}
    >
      {/* Tela de Onboarding exibida apenas uma vez */}
      {!isOnboardingCompleted && (
        <AuthStack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      )}

      {/* Tela de Login */}
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
          headerTitle: "", // Título opcional
        }}
      />

      {/* Tela de Cadastro */}
      <AuthStack.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{
          headerShown: true,
          headerTitle: "", // Título opcional
        }}
      />
    </AuthStack.Navigator>
  );
}
