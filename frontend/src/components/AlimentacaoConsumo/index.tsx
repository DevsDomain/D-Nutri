import React from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { IUser } from '../../types/userDiary';

interface UserProps {
    userMG: IUser | undefined;
}
const screenWidth = Dimensions.get('window').width;
const logo = require("../../../assets/add.png");


export default function AlimentacaoConsumo({ userMG }: UserProps) {
    const carboIdeal = userMG?.macroIdeal?.Carboidrato || 0
    const carboReal = userMG?.macroReal?.Carboidrato || 0
    const proteinaIdeal = userMG?.macroIdeal?.Proteina || 0
    const proteinaReal = userMG?.macroReal?.Proteina || 0
    const gorduraIdeal = userMG?.macroIdeal?.gordura || 0
    const gorduraReal = userMG?.macroReal?.gordura || 0

    let Carbo = carboIdeal - carboReal || 0
    let Proteina = proteinaIdeal - proteinaReal || 0
    let Gordura = gorduraIdeal - gorduraReal || 0


    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Alimentação</Text>
            <View style={styles.aguaContainer}>
                <Text style={styles.subtitle}>Você ainda pode consumir:</Text>

        <View style={styles.metricas}>
                <View>
                    <Text>Carboidrato</Text>
                    <Text style={styles.subtitle}>{Carbo}g</Text>
                </View>

                <View>
                    <Text>Proteina</Text>
                    <Text style={styles.subtitle}>{Proteina}g</Text>
                </View>

                <View>
                    <Text>Gordura</Text>
                    <Text style={styles.subtitle}>{Gordura}g</Text>
                </View>
                <TouchableOpacity onPress={() => alert("NAVEGAR PARA PÁGINA DE INSERIR ALIMENTO")}>

                <Image source={logo} style={styles.logo} />
                </TouchableOpacity>
                </View>
            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:12,
        marginHorizontal:'auto',
        width:screenWidth - 80,

    },
    aguaContainer: {
        marginTop:6,
        backgroundColor:'#fff',

        borderRadius:10
    },
    metricas:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    subtitle:{
        fontSize:13,
        fontWeight:'bold',
        marginLeft:23,
        marginVertical:5
    },
    text:{
        fontSize:13,
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




