import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import axios from "axios";
import { BACKEND_API_URL } from "@env";
import styles from "./styles";
import { IAlimentos } from "../../types/AlimentosPG";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IuserLogin } from "../../types/user";
import { useNavigation } from '@react-navigation/native'; // Importação da navegação
import { RootStackParamList } from "../../../types";
import { StackNavigationProp } from "@react-navigation/stack";

type ConsumidosNavigationProp = StackNavigationProp<RootStackParamList, "AlimentacaoComponent">;
type Props = {
    navigation: ConsumidosNavigationProp;
};
export default function AlimentosConsumidosScreen({ navigation }: Props) {

    const [alimentosConsumidos, setAlimentosConsumidos] = useState<IAlimentos[]>([]);
    const [user, setUser] = useState<IuserLogin>();
    const [date, setDate] = useState("");
    const [totals, setTotals] = useState({
        calorias: 0,
        carboidrato: 0,
        acucar: 0,
        proteina: 0,
        gordura: 0,
        sodio: 0,
    });

    const loadUserFromStorage = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            const storedDate = await AsyncStorage.getItem("date");

            if (storedUser && storedDate) {
                const user: IuserLogin = JSON.parse(storedUser)
                const date = JSON.parse(storedDate);
                await fetchAlimentos(user.id, date);
            }

        } catch (error) {
            console.error("Erro ao obter dados do AsyncStorage:", error);
        }
    };
    const fetchAlimentos = async (id: string, date: string) => {
        try {
            const response = await axios.post(`${BACKEND_API_URL}/consumidos`, {
                idUser: id,
                date: date
            });
            const alimentos = response.data

            setAlimentosConsumidos(alimentos);

            // Calcula os totais
            let totalCalorias = 0;
            let totalCarboidrato = 0;
            let totalAcucar = 0;
            let totalProteina = 0;
            let totalGordura = 0;
            let totalSodio = 0;

            alimentos.forEach((alimento: IAlimentos) => {
                totalCalorias += parseFloat(alimento.Caloria) || 0;
                totalCarboidrato += parseFloat(alimento.Carboidrato) || 0;
                totalAcucar += parseFloat(alimento.acucar) || 0;
                totalProteina += parseFloat(alimento.Proteina) || 0;
                totalGordura += parseFloat(alimento.gordura) || 0;
                totalSodio += parseFloat(alimento.sodio) || 0;
            });

            setTotals({
                calorias: totalCalorias,
                carboidrato: totalCarboidrato,
                acucar: totalAcucar,
                proteina: totalProteina,
                gordura: totalGordura,
                sodio: totalSodio,
            });
        } catch (error) {
            console.error("Erro ao buscar alimentos do banco de dados:", error);
        }
    };

    useEffect(() => {
        navigation.addListener('focus', async () => {

            await loadUserFromStorage();
        })
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Alimentos Consumidos</Text>
            <ScrollView style={styles.scrollView}>
                {alimentosConsumidos.map((alimento, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemName}>{alimento.nomeProduto}</Text>
                            <Text style={styles.itemRefeicao}>{alimento.tiporefeicao}</Text>
                        </View>
                        <Text style={styles.itemQuantidade}>Quantidade: {alimento.quantidade}</Text>
                        <View style={styles.itemNutrients}>
                            <Text style={styles.nutrient}>Calorias: {alimento.Caloria} kcal</Text>
                            <Text style={styles.nutrient}>Carboidrato: {alimento.Carboidrato}g</Text>
                            <Text style={styles.nutrient}>Açúcares: {alimento.acucar}g</Text>
                            <Text style={styles.nutrient}>Proteína: {alimento.Proteina}g</Text>
                            <Text style={styles.nutrient}>Gordura: {alimento.gordura}g</Text>
                            <Text style={styles.nutrient}>Sódio: {alimento.sodio}mg</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Calorias = {totals.calorias.toFixed(2)} kcal</Text>
                <Text style={styles.footerText}>Carboidratos = {totals.carboidrato.toFixed(2)}g</Text>
                <Text style={styles.footerText}>Açúcares = {totals.acucar.toFixed(2)}g</Text>
                <Text style={styles.footerText}>Proteínas = {totals.proteina.toFixed(2)}g</Text>
                <Text style={styles.footerText}>Gordura = {totals.gordura.toFixed(2)}g</Text>
                <Text style={styles.footerText}>Sódio = {totals.sodio.toFixed(2)}mg</Text>
            </View>
        </SafeAreaView>
    );
}
