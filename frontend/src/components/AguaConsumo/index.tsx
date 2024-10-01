import React from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { IUser } from '../../types/userDiary';

interface UserProps {
    userMG: IUser | undefined;
}
const screenWidth = Dimensions.get('window').width;
const logo = require("../../../assets/add.png");


export default function AguaConsumo({ userMG }: UserProps) {
    let aguaIdeal = userMG?.ingestaoAgua?.ingestaoIdeal || 0
    let aguaReal = userMG?.ingestaoAgua?.ingestaoAtual || 0
    let idealMetrica = "ml"
    let realMetrica = "ml"

    if(aguaIdeal >= 1000){
        aguaIdeal = aguaIdeal/1000 
        idealMetrica = 'Litros'
    }

    if(aguaReal >= 1000){
        aguaReal = aguaReal/1000
        realMetrica = 'L'
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Água</Text>
            <View style={styles.aguaContainer}>
                <Image
                    source={{ uri: "https://img.icons8.com/color/48/000000/water.png" }}
                    style={styles.icon}
                />

                <Text style={styles.text}>Você consumiu {aguaReal}{realMetrica} de {aguaIdeal} {idealMetrica}</Text>
                <TouchableOpacity onPress={() => alert("NAVEGAR PARA PÁGINA DE AGUA")}>
                <Image source={logo} style={styles.logo} />
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:12,
        marginHorizontal:'auto',
        width:screenWidth - 80

    },
    aguaContainer: {
        marginTop:6,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-evenly',
        backgroundColor: '#ffffff',
        borderRadius:10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text:{
        fontSize:13,
        fontWeight:'bold',
    },
    icon: {
        width: 40,
        height: 40,
        margin:0,
        padding:0,
    },

    logo: {
        width: 25, // Largura da imagem
        height: 25, // Altura da imagem
        resizeMode: "contain", // Mantém a proporção da imagem
    },


});




