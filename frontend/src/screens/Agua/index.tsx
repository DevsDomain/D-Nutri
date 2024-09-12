import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Agua() {
  const [quantity, setQuantity] = useState(180);
  const [savedQuantity, setSavedQuantity] = useState<number | null>(null); // Estado para armazenar o valor ao pressionar OK

  console.log (savedQuantity)

  const increment = () => setQuantity(quantity + 50);
  const decrement = () => setQuantity(quantity > 0 ? quantity - 50 : 0);

  const handleSave = () => {
    setSavedQuantity(quantity); // Salva o valor atual
    Alert.alert('Quantidade salva', `Você salvou ${quantity} ml.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o tipo de refeição</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Image 
            source={{ uri: 'https://img.icons8.com/color/48/000000/water.png' }} 
            style={styles.icon} 
          />
          <Text style={styles.foodType}>Água</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={increment} style={styles.circleButton}>
            <Ionicons name="add-circle" size={30} color="green" />
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity} ml</Text>

          <TouchableOpacity onPress={decrement} style={styles.circleButton}>
            <Ionicons name="remove-circle" size={30} color="red" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.okButton} onPress={handleSave}>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>

        {savedQuantity !== null && (
          <Text style={styles.savedText}>Quantidade salva: {savedQuantity} ml</Text>
        )}
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
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  foodType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  circleButton: {
    padding: 10,
  },
  okButton: {
    marginTop: 20,
    backgroundColor: '#94df83',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  okButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  savedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
