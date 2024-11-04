import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { IUser } from '../../types/userDiary';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";

type FlexibleNavigationProp = StackNavigationProp<RootStackParamList, "AlimentacaoComponent" | "MetricasComponent" | "EditProfile">;

interface UserProps {
    userMG: IUser;
    navigation: FlexibleNavigationProp;
}

const screenWidth = Dimensions.get('window').width;
const logo = require("../../../assets/add.png");

export default function MetricasConsumo({ userMG, navigation }: UserProps) {
    // Acessando as métricas do usuário através de userMG.metrica
    const { ImcAtual, TmbAtual, ImcIdeal, TmbIdeal } = userMG.metrica;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Métricas</Text>
            <View style={styles.aguaContainer}>
                <View style={styles.metricas}>
                    <View style={styles.metricContainer}>
                        <Text>IMC Atual</Text>
                        <Text style={styles.subtitle}>{ImcAtual !== 0 ? ImcAtual.toFixed(2) : ImcAtual}</Text>
                    </View>
                    <View style={styles.metricContainer}>
                        <Text>IMC Ideal</Text>
                        <Text style={styles.subtitle}>{ImcIdeal !== 0 ? ImcIdeal.toFixed(2) : ImcIdeal}</Text>
                    </View>
                    <View style={styles.metricContainer}>
                        <Text>TMB </Text>
                        <Text style={styles.subtitle}>{TmbAtual !== 0 ? TmbAtual.toFixed(2) : TmbAtual}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                    <Image source={logo} style={styles.logo} />
                </TouchableOpacity>
            </View>

            <Text style={styles.infoText}>*IMC (Índice de Massa Corporal)*</Text>
            <Text style={styles.infoText}>*TMB (Taxa Metabólica Basal)*</Text>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        marginHorizontal: 'auto',
        width: screenWidth - 80,
    },
    aguaContainer: {
        marginTop: 2,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 5, // Adiciona um padding para espaço visual
    },
    metricas: {
        flexDirection: 'row',
        marginBottom: 2, // Adiciona espaço entre as linhas
        marginLeft: 0,
        marginRight: 50,
    },
    metricContainer: {
        flex: 1, // Faz cada métrica ocupar espaço igual
        alignItems: 'center', // Centraliza o texto
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    logo: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        marginTop: -30, // Mantém a posição do botão na mesma altura
        marginRight: 10,
        alignSelf: 'flex-end', // Posiciona à direita
    },
    infoText: {
        marginTop: 10, // Adiciona uma margem superior
        fontSize: 12,
        lineHeight: 12, // Define a altura da linha para reduzir o espaçamento
        textAlign: 'left', // Centraliza o texto
    },
});