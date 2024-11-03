import React, { useState, useEffect, useContext, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import { BACKEND_API_URL } from "@env";
import styles from "./styles";
import { IAlimentos } from "../../types/AlimentosPG";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IuserLogin } from "../../types/user";
import { useFocusEffect, useNavigation } from '@react-navigation/native'; // Importação da navegação
import { RootStackParamList } from "../../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { selectDate } from "../../dateSlice";
import { UserContext } from "../../context/userContext";

type ConsumidosNavigationProp = StackNavigationProp<RootStackParamList, "AlimentacaoComponent">;
type Props = {
    navigation: ConsumidosNavigationProp;
};
export default function AlimentosConsumidosScreen({ navigation }: Props) {
    const dates = useSelector(selectDate);
    const { user } = useContext(UserContext)!;



    const [alimentosConsumidos, setAlimentosConsumidos] = useState<IAlimentos[]>([]);
    const [totals, setTotals] = useState({
        calorias: 0,
        carboidrato: 0,
        acucar: 0,
        proteina: 0,
        gordura: 0,
        sodio: 0,
    });


    const fetchAlimentos = async () => {
        try {
            const response = await axios.post(`${BACKEND_API_URL}/consumidos`, {
                idUser: user?.id,
                date: dates
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

    useFocusEffect(
        useCallback(() => {
            fetchAlimentos();
        },
            [dates])
    );


    return (
        <SafeAreaView style={styles.container}>
            {!alimentosConsumidos ?
                <View style={[styles.loadingWait, styles.loadingHorizontal]}>
                    <ActivityIndicator size={"large"} color={"#97cc74"} />


                </View>
                :
                <>
                    <Text style={styles.header}>Alimentos Consumidos</Text>
                    {alimentosConsumidos.length == 0 && <Text style={styles.subtitle}>Que pena, parece que você ainda não adicionou nenhum alimento hoje!</Text>}
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




                </>
            }
        </SafeAreaView>
    );
}
