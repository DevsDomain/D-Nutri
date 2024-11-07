import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "../SelectAlimento/styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import axios from "axios";
import { BACKEND_API_URL } from "@env";
import { IAlimentos } from "../../types/AlimentosPG";
import { FlatList } from "react-native";
import { UserContext } from "../../context/userContext";


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
  const [alimentos, setAlimentos] = useState<IAlimentos[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isExternalSearch, setIsExternalSearch] = useState(false);//*
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(25)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext)!;

  // Função para buscar alimentos cadastrados no backend
  useEffect(() => {
    const fetchData = async () => {
      if (user?.id && searchTerm.length === 0) {
        const data = await fetchAlimentosCadastrados(quantity);
        setAlimentos(data);
        setLoading(false)

      }
    };
    fetchData();
  }, [user?.id, searchTerm]);


  // Função para buscar alimentos cadastrados no backend
  const fetchAlimentosCadastrados = async (quantity: number): Promise<IAlimentos[]> => {
    setLoading(true)
    try {
      const response = await axios.get(`${BACKEND_API_URL}/alimentos/${user?.id}/${quantity}`);
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
        isFavorito: item.isFavorito,
      }));
    } catch (error) {
      console.error("Erro ao buscar alimentos cadastrados:", error);
      Alert.alert("Erro", "Não foi possível buscar os alimentos.");
      return [];
    }
  };

  // Função para buscar alimentos cadastrados no backend
  const buscarAlimentoCadastrado = async (): Promise<IAlimentos[]> => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/searchAlimentoByName/${user?.id}/${searchTerm}`)
      return response.data
    } catch (error: any) {
      console.log("Não encontrou no banco", error.message)
      return []
    }
  }

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
        isFavorito: false,
      }));
    } catch (error) {
      console.error("Erro ao buscar produtos externos:", error);
      Alert.alert("Erro", "Não foi possível buscar os produtos.");
      return [];
    }
  };

  // Função para combinar alimentos do backend e da API externa
  const fetchAndCombineAlimentos = async () => {
    setIsSearching(true);
    setIsExternalSearch(true);
    try {
      const databaseProducts = await buscarAlimentoCadastrado();
      const externalProducts = await searchExternalProducts();
      setAlimentos([...databaseProducts, ...externalProducts]);
    } catch (error) {
      console.error("Error fetching alimentos:", error);
      Alert.alert("Error", "An error occurred while fetching alimentos. Please try again later.");
    } finally {
      setIsSearching(false);
    }
  };

  // Lógica de alternância de favoritos
  const toggleFavorite = async (food: IAlimentos) => {
    // Verifica se é um alimento da busca interna antes de prosseguir
    if (food.idProduto && user?.id) {
      const updatedFavorites = alimentos.map((item) =>
        item.idProduto === food.idProduto
          ? { ...item, isFavorito: !item.isFavorito }
          : item
      );
      setAlimentos(updatedFavorites);

      try {
        await axios.post(`${BACKEND_API_URL}/addFavorito`, {
          idProduto: food.idProduto,
          idUsuario: user.id,
          isFavorito: !food.isFavorito,
        });
      } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
        Alert.alert("Erro", "Não foi possível atualizar o favorito.");
      }
    }
  };

  // Função para navegar ao selecionar um alimento
  const handleSelect = (product: IAlimentos) => {
    navigation.navigate("SelectRefeicao", { barcode: product.barcode });
  };

  // Filtrar alimentos com base na exibição (favoritos ou todos)
  const filteredAlimentos = showFavorites
    ? alimentos.filter((product) => product.isFavorito)
    : alimentos;

  const loadMoreAlimentos = async () => {
    if (!loadingMore) {
      if (quantity > 100 && alimentos.length > 45) {
        return false;
      }
      setLoading(true)
      setLoadingMore(true);
      const newQuantity = quantity + 10;
      setQuantity(newQuantity);

      // Chamar `fetchAlimentosCadastrados` com o valor atualizado de `newQuantity`
      const moreAlimentos = await fetchAlimentosCadastrados(newQuantity);

      // Atualizar a lista de alimentos com o novo conjunto carregado
      setAlimentos(moreAlimentos);
      setLoadingMore(false);
      setLoading(false)
    }
  };

  // Função para renderizar cada item da lista de alimentos
  const renderAlimentoItem = ({ item }: { item: IAlimentos }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.itemText}>{item.nomeProduto || ''}</Text>
      {!isSearching && item.idProduto ? ( // Usando operador ternário para renderização condicional
        <TouchableOpacity
          onPress={() => toggleFavorite(item)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={item.isFavorito ? "heart" : "heart-outline"}
            size={24}
            color={item.isFavorito ? "#FF9385" : "#0303032b"}
          />
        </TouchableOpacity>
      ) : (
        // Renderiza um espaço vazio quando não deve mostrar o coração
        <View style={{ width: 24 }} />
      )}
    </TouchableOpacity>
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
        <TouchableOpacity onPress={fetchAndCombineAlimentos}>
          <Ionicons name="search" size={24} color="#777" />
        </TouchableOpacity>
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
      <FlatList
        data={filteredAlimentos}
        renderItem={renderAlimentoItem}
        keyExtractor={(key) => Math.random().toString()}
        onEndReached={loadMoreAlimentos}
        onEndReachedThreshold={0.01}
      />
      {loading && <ActivityIndicator size="large" color="#0303032b" />}
    </View>
  );
}
//FD 06-11-2024