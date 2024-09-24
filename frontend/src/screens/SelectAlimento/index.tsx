import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from "../SelectAlimento/styles";

export default function SelectAlimento() {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado da busca
  const [showFavorites, setShowFavorites] = useState(false); // Estado para alternar entre todos os alimentos e favoritos
  const [favoritos, setFavoritos] = useState(['Feijão', 'Ovo', 'Arroz', 'Frango']); // Favoritos

  // Lista de alimentos
  const alimentos = [
    'Arroz',
    'Batata',
    'Carne de boi',
    'Feijão',
    'Frango',
    'Jiló',
    'Lentilha',
    'Mandioca',
    'Nuggets',
    'Ovo',
  ];

  // Filtrar alimentos com base na barra de busca
  const filteredAlimentos = (showFavorites ? favoritos : alimentos).filter(alimento =>
    alimento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (food: string) => {
    setSelectedFood(food);
  };

  const toggleFavorite = (food: string) => {
    if (favoritos.includes(food)) {
      setFavoritos(favoritos.filter(fav => fav !== food));
    } else {
      setFavoritos([...favoritos, food]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {/* Ícone de lupa */}
        <Ionicons name="search" size={24} color="#777" />
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar alimento..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {/* Ícone de filtro */}
        <MaterialIcons name="tune" size={24} color="#777" />
      </View>

      {/* Botões de alternância */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton, 
            !showFavorites ? styles.activeButton : styles.inactiveButton
          ]}
          onPress={() => setShowFavorites(false)}
        >
          <Text style={!showFavorites ? styles.activeButtonText : styles.inactiveButtonText}>
            Todos os Alimentos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton, 
            showFavorites ? styles.activeButton : styles.inactiveButton
          ]}
          onPress={() => setShowFavorites(true)}
        >
          <Text style={showFavorites ? styles.activeButtonText : styles.inactiveButtonText}>
            Meus Favoritos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de alimentos */}
      <ScrollView style={styles.scrollView}>
        {filteredAlimentos.map((alimento, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.item}
            onPress={() => handleSelect(alimento)}
          >
            <Text style={styles.itemText}>{alimento}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(alimento)}>
              <Ionicons
                name={favoritos.includes(alimento) ? 'heart' : 'heart-outline'}
                size={24}
                color={favoritos.includes(alimento) ? '#FF9385' : '#FFF8EE'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>     
    </View>
  );
}
