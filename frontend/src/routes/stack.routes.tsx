import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import AguaScreen from "../screens/AguaScreen";
import AlimentacaoScreen from "../screens/AlimentacaoScreen";
import CadastroScreen from "../screens/CadastroScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import TabRoutes from "./tab.routes";
import SelectAlimento from "../screens/SelectAlimento";
import { StatusBar, TouchableOpacity, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

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
    return null; // Exibe um loading ou algo enquanto verifica o AsyncStorage
  }

  return (
    <Stack.Navigator
      initialRouteName={isOnboardingCompleted ? "Login" : "Onboarding"}
      screenOptions={({ navigation, route }) => ({
        headerShown: !(route.name === "Onboarding"),
        headerLeft: route.name === "Login" || route.name === "Cadastro" ? () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={{ marginLeft: 5, fontSize: 18 }}>Voltar</Text>
          </TouchableOpacity>
        ) : undefined,
      })}
    >
      {!isOnboardingCompleted && (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          headerShown: true,
          headerTitle: '', 
        }} 
      />
      <Stack.Screen 
        name="Cadastro" 
        component={CadastroScreen}
        options={{
          headerShown: true,
          headerTitle: '', 
        }} 
      />
      <Stack.Screen 
        name="Main" 
        component={TabRoutes}
        options={{
          headerShown: false,
          title: "Selecione o tipo de Refeição",
          headerStyle: {
            backgroundColor: "#BBDEB5",
          },
          headerTitleStyle: {
            color: "#000000",
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
            backgroundColor: "#BBDEB5",
          },
          headerTitleStyle: {
            color: "#000000",
          },
        }}
      />
      <Stack.Screen
        name="SelectAlimento"
        component={SelectAlimento}
        options={{
          headerShown: true,
          title: "Selecione o Alimento",
          headerStyle: {
            backgroundColor: "#BBDEB5",
          },
          headerTitleStyle: {
            color: "#000000",
          },
        }}
      />
    </Stack.Navigator>
  );
}