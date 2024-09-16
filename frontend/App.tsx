import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons"; // Importando os ícones do Ionicons
import SearchScreen from "./screens/SearchScreen";
import AddScreen from "./screens/AddScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AguaScreen from "./screens/AguaScreen";
import AlimentacaoScreen from "./screens/AlimentacaoScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          if (route.name === "Home") {
            iconName = "home";
            color = focused ? "#94df83" : "#C0C0C0"; // Cor verde se focado, cinza se não
            size = 30;
          } else if (route.name === "Search") {
            iconName = "search";
            color = focused ? "#94df83" : "#C0C0C0";
            size = 30;
          } else if (route.name === "Add") {
            iconName = "add-circle";
            color = "#94df83"; // Sempre verde
            size = 60; // Ícone maior
          } else if (route.name === "Favorites") {
            iconName = "heart";
            color = focused ? "#94df83" : "#C0C0C0";
            size = 30;
          } else if (route.name === "Profile") {
            iconName = "person";
            color = focused ? "#94df83" : "#C0C0C0";
            size = 30;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false, // Ocultar os rótulos das abas
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{ tabBarIconStyle: { marginTop: -6 } }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<
    null | boolean
  >(null);

  useEffect(() => {
    // Função para verificar se o Onboarding já foi concluído
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isOnboardingCompleted ? "Login" : "Onboarding"}
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
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Agua" component={AguaScreen} />
        <Stack.Screen name="Alimentacao" component={AlimentacaoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}