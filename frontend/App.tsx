import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Initial from './src/screens/Inicio/Initial';
import Cadastro from './src/screens/Cadastro/Cadastro';
import Login from './src/screens/Login/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen
          name="Initial"
          component={Initial}
          options={{ headerShown: false }} // Oculta o cabeçalho para a tela inicial
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }} // Oculta o cabeçalho para a tela de cadastro
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Oculta o cabeçalho para a tela de cadastro
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}