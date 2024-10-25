import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "../SelectAlimento/styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import axios from "axios";
import { BACKEND_API_URL } from "@env";
import { IAlimentos } from "../../types/AlimentosPG";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface para os produtos externos (API OpenFoodFacts)
interface ExternalProduct {
  idProduto: string | null;
  code: number;
  product_name: string;
  image_url: string | null;
  nutriments: {
    proteins: number;
    energy: number;
    carbohydrates: number;
    fat: number;
    sodium: number;
    sugars: number;
  };
}

export default function SelectAlimento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritos, setFavoritos] = useState<IAlimentos[]>([]);
  const [alimentos, setAlimentos] = useState<IAlimentos[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchAlimentosCadastrados();
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    if (searchTerm.length === 0) {
      fetchAndCombineAlimentos();
    }
  }, [searchTerm]);

  // Função para carregar o ID do usuário do AsyncStorage
  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const id = JSON.parse(storedUser).id;
        setUserId(id);
        await fetchFavoritos(id);
      }
    } catch (error) {
      console.log("Erro ao obter dados do AsyncStorage:", error);
    }
  };

  // Função para buscar alimentos cadastrados no backend
  const fetchAlimentosCadastrados = async (): Promise<IAlimentos[]> => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/alimentos`);
      return response.data.map((item: IAlimentos) => ({
        Caloria: parseFloat(item.Caloria),
        Carboidrato: parseFloat(item.Carboidrato),
        Proteina: parseFloat(item.Proteina),
        acucar: parseFloat(item.acucar),
        barcode: item.barcode,
        gordura: parseFloat(item.gordura),
        idProduto: item.idProduto,
        imageSrc: item.imageSrc,
        nomeProduto: item.nomeProduto,
        sodio: parseFloat(item.sodio),
      }));
    } catch (error) {
      console.error("Erro ao buscar alimentos cadastrados:", error);
      Alert.alert("Erro", "Não foi possível buscar os alimentos.");
      return [];
    }
  };

  // Função para buscar produtos da API OpenFoodFacts
  const searchExternalProducts = async (): Promise<IAlimentos[]> => {
    try {
      const response = await axios.get(
        `https://br.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1&page=${page}`
      );

      return response.data.products.map((product: ExternalProduct) => ({
        Caloria: product.nutriments.energy,
        Carboidrato: product.nutriments.carbohydrates,
        Proteina: product.nutriments.proteins,
        acucar: product.nutriments.sugars,
        barcode: product.code.toString(),
        gordura: product.nutriments.fat,
        idProduto: 0, // Valor fictício, pois a API externa não fornece esse dado
        imageSrc: product.image_url,
        nomeProduto: product.product_name,
        sodio: product.nutriments.sodium,
      }));
    } catch (error) {
      console.error("Erro ao buscar produtos externos:", error);
      Alert.alert("Erro", "Não foi possível buscar os produtos.");
      return [];
    }
  };

  // Função para combinar alimentos do backend e da API externa
  const fetchAndCombineAlimentos = async () => {
    const alimentosCadastrados = await fetchAlimentosCadastrados();
    const externalProducts = await searchExternalProducts();
    setAlimentos([...alimentosCadastrados, ...externalProducts]);
  };

  // Função para buscar favoritos do usuário
  const fetchFavoritos = async (id: string) => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/favoritos/${id}`);
      if (response.status === 200 && response.data.length > 0) {
        setFavoritos(response.data);
      } else {
        console.log("Nenhum alimento favorito encontrado.");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
      } else {
        console.error("Erro ao buscar favoritos:", error);
      }
    }
  };

  // Lógica de alternância de favoritos
  const toggleFavorite = async (food: IAlimentos) => {
    const isFavorite = favoritos.some(
      (fav) => fav.idProduto === food.idProduto
    );
    const updatedFavorites = isFavorite
      ? favoritos.filter((fav) => fav.idProduto !== food.idProduto)
      : [...favoritos, food];

    setFavoritos(updatedFavorites);

    if (userId) {
      try {
        await axios.post(`${BACKEND_API_URL}/addFavorito`, {
          idProduto: food.idProduto,
          idUsuario: userId,
          isFavorito: !isFavorite,
        });
      } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
      }
    }
  };

  // Função para navegar ao selecionar um alimento
  const handleSelect = (product: IAlimentos) => {
    navigation.navigate("SelectRefeicao", { barcode: product.barcode });
  };

  // Filtrar alimentos com base na exibição (favoritos ou todos)
  const filteredAlimentos = showFavorites
    ? alimentos.filter((product) =>
        favoritos.some((fav) => fav.nomeProduto === product.nomeProduto)
      )
    : alimentos;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={fetchAndCombineAlimentos}>
          <Ionicons name="search" size={24} color="#777" />
        </TouchableOpacity>
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
          style={[
            styles.toggleButton,
            !showFavorites ? styles.activeButton : styles.inactiveButton,
            { borderTopLeftRadius: 16, borderBottomLeftRadius: 16 },
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
            Todos{"\n"}Alimentos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            showFavorites ? styles.activeButton : styles.inactiveButton,
            { borderTopRightRadius: 16, borderBottomRightRadius: 16 },
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
            Meus{"\n"}Favoritos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredAlimentos.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => handleSelect(product)}
          >
            <Text style={styles.itemText}>{product.nomeProduto}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(product)}>
              <Ionicons
                name={
                  favoritos.some((fav) => fav.idProduto === product.idProduto)
                    ? "heart"
                    : "heart-outline"
                }
                size={24}
                color={
                  favoritos.some((fav) => fav.idProduto === product.idProduto)
                    ? "#FF9385"
                    : "#FFF8EE"
                }
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
