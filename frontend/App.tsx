import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';

import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
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
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Add") {
            iconName = "add-circle";
            size = 60; // Ícone maior
          } else if (route.name === "Favorites") {
            iconName = "heart";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size || 30} color={focused ? "#94df83" : "#C0C0C0"} />;
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddScreen} options={{ tabBarIconStyle: { marginTop: -6 } }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isOnboardingCompleted ? "Main" : "Onboarding"}
        screenOptions={({ route }) => ({
          headerShown: route.name === "Onboarding" || route.name === "Login" || route.name === "Cadastro" ? false : true,
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
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Agua" component={AguaScreen} />
        <Stack.Screen name="Alimentacao" component={AlimentacaoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}