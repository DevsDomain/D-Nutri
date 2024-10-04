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
import { IAlimentos } from "../../types/AlimentosPG";
import { BACKEND_API_URL } from "@env";

interface Product {
  code: string;
  product_name: string;
}

export default function SelectAlimento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [alimentosPostgres, setAlimentosPostgres] = useState<IAlimentos[]>([])
  const [favoritos, setFavoritos] = useState<string[]>([
    "Feijão",
    "Ovo",
    "Arroz",
    "Frango",
  ]);
  const [alimentos, setAlimentos] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    buscarProdutos()
  }, [])





  const buscarProdutos = () => {
    try {
      axios.get(`${BACKEND_API_URL}/alimentos`).then(({ data }) => {
        if (data && data.length > 0) {
          setAlimentosPostgres(data);
          console.log("DATA", data);

        }

      })
    } catch (error: any) {
      console.log("Erro ao buscar alimentos no postgres", error.message);
    }
  }

  const searchProducts = async () => {
    try {
      const response = await axios.get(
        `https://br.openfoodfacts.net/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1&page=${page}`
      );
      setAlimentos(response.data.products);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      Alert.alert("Erro", "Não foi possível buscar os produtos.");
    }
  };

  const handleSelect = (product: Product) => {
    if (navigation) {
      navigation.navigate("ProductDetailsScreenPG", { barcode: product.code });
      console.log(`Alimento selecionado: ${product.code}`);
    }
  };

  const toggleFavorite = (food: string) => {
    if (favoritos.includes(food)) {
      setFavoritos(favoritos.filter((fav) => fav !== food));
    } else {
      setFavoritos([...favoritos, food]);
    }
  };

  // Lógica de filtragem: se showFavorites estiver ativo, exibe apenas os favoritos
  const filteredAlimentos = showFavorites
    ? alimentos.filter((product: Product) =>
      favoritos.includes(product.product_name)
    )
    : alimentos.filter((product: Product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={searchProducts}>
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
        {alimentosPostgres.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => handleSelect({ product_name: product.nomeProduto, code: product.barcode })}
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
