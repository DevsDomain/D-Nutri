import React from 'react';
import { styles } from './styles';
import { View, Text, SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';

export default function TermsOfUse() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Termos de Uso</Text>
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.title}>Termos e Condições de Uso do Aplicativo Dnutri</Text>

                <Text style={styles.sectionTitle}>1. Aceitação dos Termos</Text>
                <Text style={styles.text}>
                    Ao usar o aplicativo Dnutri, você concorda em cumprir estes Termos e Condições de Uso. Caso não
                    concorde com os termos aqui estabelecidos, você não deve utilizar o aplicativo.
                </Text>

                <Text style={styles.sectionTitle}>2. Descrição do Serviço</Text>
                <Text style={styles.text}>
                    O Dnutri é um aplicativo voltado para o controle de calorias e nutrição, oferecendo ferramentas
                    para monitorar a ingestão de alimentos, estabelecer metas de saúde e receber recomendações
                    nutricionais. O serviço não substitui a orientação de um profissional de saúde.
                </Text>

                <Text style={styles.sectionTitle}>3. Registro de Conta</Text>
                <Text style={styles.text}>
                    Para utilizar o Dnutri, você deve criar uma conta, fornecendo informações precisas, atuais e
                    completas. Você é responsável por manter a confidencialidade da sua senha e pelos atos
                    realizados com a sua conta.
                </Text>

                <Text style={styles.sectionTitle}>4. Uso do Aplicativo</Text>
                <Text style={styles.text}>
                    O aplicativo é destinado a pessoas maiores de 18 anos. Caso você seja menor de idade, deve obter
                    o consentimento dos seus responsáveis para usar o Dnutri. O uso do aplicativo deve ser
                    exclusivamente para fins pessoais e não comerciais.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
