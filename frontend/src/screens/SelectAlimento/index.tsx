import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from "../SelectAlimento/styles";
import { useNavigation } from '@react-navigation/native';

export default function SelectAlimento() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritos, setFavoritos] = useState(['Feijão', 'Ovo', 'Arroz', 'Frango']);

  const alimentos = ['Arroz', 'Batata', 'Carne de boi', 'Feijão', 'Frango', 'Jiló', 'Lentilha', 'Mandioca', 'Nuggets', 'Ovo'];

  const filteredAlimentos = (showFavorites ? favoritos : alimentos).filter(alimento =>
    alimento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigation = useNavigation(); // Use hook para navegação

  const handleSelect = (food: string) => {
    navigation.navigate('TabelaNutricional', { alimento: food }); // Navega para a tela TabelaNutricional com o alimento selecionado
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
        <Ionicons name="search" size={24} color="#777" />
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar alimento..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <MaterialIcons name="tune" size={24} color="#777" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, !showFavorites ? styles.activeButton : styles.inactiveButton, { borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }]}
          onPress={() => setShowFavorites(false)}
        >
          <Text style={!showFavorites ? styles.activeButtonText : styles.inactiveButtonText}>
            Todos{"\n"}Alimentos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, showFavorites ? styles.activeButton : styles.inactiveButton, { borderTopRightRadius: 16, borderBottomRightRadius: 16 }]}
          onPress={() => setShowFavorites(true)}
        >
          <Text style={showFavorites ? styles.activeButtonText : styles.inactiveButtonText}>
            Meus{"\n"}Favoritos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredAlimentos.map((alimento, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => handleSelect(alimento)}>
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
