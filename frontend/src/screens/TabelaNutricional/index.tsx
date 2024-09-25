import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function TabelaNutricional({ route, navigation }: any) {
  const { alimento } = route.params; // Recebe o alimento selecionado da tela anterior

  // Simulação dos dados nutricionais
  const tabelaNutricional = [
    { label: 'Caloria', qtd: '13 kcal', vd: '1%' },
    { label: 'Carboidratos', qtd: '13 kcal', vd: '1%' },
    { label: 'Proteínas', qtd: '13 kcal', vd: '1%' },
    { label: 'Gord.Totais', qtd: '13 kcal', vd: '1%' },
    { label: 'Gord.Sat.', qtd: '13 kcal', vd: '1%' },
    { label: 'Gord.Trans', qtd: '13 kcal', vd: '1%' },
    { label: 'Fibra', qtd: '13 kcal', vd: '1%' },
    { label: 'Açucar', qtd: '13 kcal', vd: '1%' },
    { label: 'Sódio', qtd: '13 kcal', vd: '1%' },
    { label: 'Cálcio', qtd: '13 kcal', vd: '1%' },
    { label: 'Ferro', qtd: '13 kcal', vd: '1%' },
  ];

  return (
    <View style={styles.container}>
      {/* Header com o nome do alimento */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{alimento}</Text>
      </View>

      {/* Seção de controle de quantidade */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={30} color="#6FCF97" />
        </TouchableOpacity>
        <Text style={styles.controlText}>1 qtde</Text>
        <TouchableOpacity>
          <Ionicons name="remove-circle" size={30} color="#FF8473" />
        </TouchableOpacity>
        <Text style={styles.controlText}>50 gramas</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={30} color="#6FCF97" />
        </TouchableOpacity>
      </View>

      {/* Tabela Nutricional */}
      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableText, styles.headerLabel]}>Tabela</Text>
          <Text style={[styles.tableText, styles.headerLabel]}>Qtd.</Text>
          <Text style={[styles.tableText, styles.headerLabel]}>%VD</Text>
        </View>

        {tabelaNutricional.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableText}>{item.label}</Text>
            <Text style={styles.tableText}>{item.qtd}</Text>
            <Text style={styles.tableText}>{item.vd}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Botão Registrar */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}


