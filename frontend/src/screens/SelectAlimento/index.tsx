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
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [alimentos, setAlimentos] = useState<IAlimentos[]>([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    console.log(searchTerm.length, "SEARCH TEMR")
    if (searchTerm.length == 0) {
      fetchAndCombineAlimentos();
    }
  }, [searchTerm])



  // Função para buscar alimentos cadastrados no banco
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
        `https://br.openfoodfacts.net/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1&page=${page}`
      );

      // Mapear os dados da API externa para a interface Alimento
      return response.data.products.map((product: ExternalProduct) => ({
        Caloria: product.nutriments.energy,
        Carboidrato: product.nutriments.carbohydrates,
        Proteina: product.nutriments.proteins,
        acucar: product.nutriments.sugars,
        barcode: product.code,
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

  // Função para buscar e combinar alimentos do banco e da API externa
  const fetchAndCombineAlimentos = async () => {
    const alimentosCadastrados = await fetchAlimentosCadastrados();
    setAlimentos(alimentosCadastrados);
  };

  // Chama a função para carregar alimentos cadastrados ao montar o componente


  // Lógica de busca no banco de dados e na OpenFoodFacts
  const searchProducts = async () => {
    try {
      setIsSearching(true);

      const alimentosCadastrados = await fetchAlimentosCadastrados();
      const externalProducts = await searchExternalProducts();

      // Combina os dados das duas fontes e define os alimentos filtrados
      const combinedAlimentos = [
        ...alimentosCadastrados.filter((product) =>
          product.nomeProduto.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        ...externalProducts.filter((product) =>
          product.nomeProduto.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      ];

      setAlimentos(combinedAlimentos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      Alert.alert("Erro", "Não foi possível buscar os produtos.");
    } finally {
      setIsSearching(false);
    }
  };

  // Função de seleção de alimentos
  const handleSelect = (product: IAlimentos) => {
    if (navigation) {
      navigation.navigate("ProductDetailsScreenPG", {
        barcode: product.barcode,
      });
      console.log(`Alimento selecionado: ${product.barcode}`);
    }
  };

  // Lógica de alternância de favoritos
  const toggleFavorite = (food: string) => {
    if (favoritos.includes(food)) {
      setFavoritos(favoritos.filter((fav) => fav !== food));
    } else {
      setFavoritos([...favoritos, food]);
    }
  };

  // Lógica de filtragem: exibe todos os alimentos ou apenas favoritos
  const filteredAlimentos = showFavorites
    ? alimentos.filter((product: IAlimentos) =>
      favoritos.includes(product.nomeProduto || "")
    )
    : alimentos;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={searchProducts} disabled={isSearching}>
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
            <TouchableOpacity
              onPress={() => toggleFavorite(product.nomeProduto)}
            >
              <Ionicons
                name={
                  favoritos.includes(product.nomeProduto)
                    ? "heart"
                    : "heart-outline"
                }
                size={24}
                color={
                  favoritos.includes(product.nomeProduto)
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