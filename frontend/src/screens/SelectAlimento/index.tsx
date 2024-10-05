import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import axios from "axios";
import { IAlimentos } from "../../types/AlimentosPG";
import { BACKEND_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

interface Product {
  code: string;
  product_name: string;
}

export default function SelectAlimento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [alimentosPostgres, setAlimentosPostgres] = useState<IAlimentos[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    buscarProdutos();
  }, []);

  useEffect(() => {
    const loadFavoritos = async () => {
      try {
        const favoritosStored = await AsyncStorage.getItem("favoritos");
        if (favoritosStored) {
          setFavoritos(JSON.parse(favoritosStored));
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };
    loadFavoritos();
  }, []);

  useEffect(() => {
    const saveFavoritos = async () => {
      try {
        await AsyncStorage.setItem("favoritos", JSON.stringify(favoritos));
      } catch (error) {
        console.error("Erro ao salvar favoritos:", error);
      }
    };
    saveFavoritos();
  }, [favoritos]);

  const buscarProdutos = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/alimentos`);
      if (response.data && response.data.length > 0) {
        const sortedAlimentos = response.data.sort((a: IAlimentos, b: IAlimentos) => a.nomeProduto.localeCompare(b.nomeProduto));
        setAlimentosPostgres(sortedAlimentos);
        console.log("DATA", sortedAlimentos);
      }
    } catch (error: any) {
      console.log("Erro ao buscar alimentos no postgres", error.message);
    }
  };

  const handleSelect = (product: Product) => {
    if (navigation) {
      navigation.navigate("SelectRefeicao", { barcode: product.code });
      console.log(`Indo para SelectRefeicao com barcode: ${product.code}`);
    }
  };

  const toggleFavorite = (food: string) => {
    if (favoritos.includes(food)) {
      setFavoritos(favoritos.filter((fav) => fav !== food));
    } else {
      setFavoritos([...favoritos, food]);
    }
  };

  const filteredAlimentos = showFavorites
    ? alimentosPostgres.filter((product, index, self) => favoritos.includes(product.nomeProduto) && self.findIndex(p => p.nomeProduto === product.nomeProduto) === index)
    : alimentosPostgres.filter((product) =>
        product.nomeProduto.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar alimento..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity onPress={buscarProdutos} style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#777" />
        </TouchableOpacity>
        <MaterialIcons name="tune" size={24} color="#777" style={styles.filterIcon} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !showFavorites ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setShowFavorites(false)}
        >
          <Text
            style={
              !showFavorites
                ? styles.activeButtonText
                : styles.inactiveButtonText
            }
          >
            Todos Alimentos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            showFavorites ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setShowFavorites(true)}
        >
          <Text
            style={
              showFavorites
                ? styles.activeButtonText
                : styles.inactiveButtonText
            }
          >
            Meus Favoritos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredAlimentos.map((product, index) => (
          <View key={index} style={styles.itemRow}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelect({ product_name: product.nomeProduto, code: product.barcode })}
            >
              <Text style={styles.itemText}>{product.nomeProduto}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavorite(product.nomeProduto)}>
              <Ionicons
                name={favoritos.includes(product.nomeProduto) ? "heart" : "heart-outline"}
                size={24}
                color={favoritos.includes(product.nomeProduto) ? "#FF9385" : "#C0C0C0"}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

