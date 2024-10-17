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

export default function SelectAlimento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritos, setFavoritos] = useState<IAlimentos[]>([]);
  const [alimentos, setAlimentos] = useState<IAlimentos[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      if (storedUser) {
        const id = JSON.parse(storedUser).id;
        await fetchFavoritos(id);
      }
    } catch (error) {
      console.log("Erro ao obter dados do AsyncStorage:", error);
    }
  };

  // Função para buscar alimentos favoritos do backend
  const fetchFavoritos = async (id: string) => {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/favoritos/${id}`);
      setFavoritos(response.data);
      console.log("Favoritos:", response.data);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
      Alert.alert("Erro", "Não foi possível carregar seus favoritos.");
    }
  };

  // Função para buscar todos os alimentos cadastrados
  const fetchAlimentosCadastrados = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/alimentos`);
      const alimentosFormatados = response.data.map((item: IAlimentos) => ({
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
      setAlimentos(alimentosFormatados);
    } catch (error) {
      console.error("Erro ao buscar alimentos cadastrados:", error);
      Alert.alert("Erro", "Não foi possível buscar os alimentos.");
    }
  };

  // Carregar alimentos cadastrados na montagem do componente
  useEffect(() => {
    fetchAlimentosCadastrados();
    loadUserFromStorage();
  }, []);

  // Exibir favoritos ao clicar no botão "Meus Favoritos"
  const handleShowFavorites = async () => {
    setShowFavorites(true);
    //await fetchFavoritos();
  };

  // Função para navegar para outra tela ao selecionar um alimento
  const handleSelect = (product: IAlimentos) => {
    if (navigation) {
      navigation.navigate("SelectRefeicao", { barcode: product.barcode });
    }
  };


  // Lógica de alternância de favoritos
  const toggleFavorite = (food: IAlimentos) => {
    if (favoritos.some((fav) => fav.idProduto === food.idProduto)) {
      setFavoritos(favoritos.filter((fav) => fav.idProduto !== food.idProduto));
    } else {
      setFavoritos([...favoritos, food]);
    }
  };



  // Filtrar alimentos com base na exibição (favoritos ou todos)
  const filteredAlimentos = showFavorites
    ? alimentos.filter((product) =>
      favoritos.some((fav) => fav.idProduto === product.idProduto)
    )
    : alimentos;


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={fetchAlimentosCadastrados}>
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
          onPress={handleShowFavorites}
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
              onPress={() => toggleFavorite(product)} // Passa o objeto `product` completo
            >
              <Ionicons
                name={
                  favoritos.some((fav) => fav.idProduto === product.idProduto)
                    ? "heart"         // Ícone de coração preenchido para favoritos
                    : "heart-outline" // Ícone de coração contornado para não favoritos
                }
                size={24}
                color={
                  favoritos.some((fav) => fav.idProduto === product.idProduto)
                    ? "#FF9385" // Cor para itens favoritos
                    : "#FFF8EE" // Cor para itens não favoritos
                }
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

      </ScrollView>

    </View>
  );
}
//16/10/2024