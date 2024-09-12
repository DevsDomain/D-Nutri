import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  // Gerenciar o estado da refeição selecionada
  const [selectedMeal, setSelectedMeal] = useState<string>('Café da Manhã');

  console.log (selectedMeal)

  // Opções de refeições
  const mealOptions = [
    'Café da Manhã',
    'Lanche da Manhã',
    'Almoço',
    'Lanche da Tarde',
    'Jantar',
    'Ceia',
    'Pré-Treino',
    'Pós-Treino',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o tipo de refeição</Text>

      <View style={styles.card}>
        {mealOptions.map((meal, index) => (
          <TouchableOpacity
            key={index}
            style={styles.row}
            onPress={() => setSelectedMeal(meal)} // Atualiza o estado com a refeição selecionada
          >
            <Ionicons
              name={
                selectedMeal === meal ? 'radio-button-on' : 'radio-button-off'
              }
              size={24}
              color={selectedMeal === meal ? '#FF5733' : '#C0C0C0'}
            />
            <Text style={styles.mealText}>{meal}</Text>
          </TouchableOpacity>
        ))}
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0e8cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  card: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  mealText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});
