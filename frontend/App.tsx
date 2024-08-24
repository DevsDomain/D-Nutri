import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ backgroundColor:"lightgreen", flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>D-Nutri app</Text>
      <Text>Projeto de Aplicação para Nutrição</Text>
      <StatusBar style="auto" />
    </View>
  );
}