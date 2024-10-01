import React from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { IUser } from '../../types/userDiary';
import ProgressBar from 'react-native-progress/Bar';

interface UserProps {
    userMG: IUser | undefined;
}
const screenWidth = Dimensions.get('window').width;

export default function BarChart({ userMG }: UserProps) {
    const carboIdeal = userMG?.macroIdeal?.Carboidrato || 0
    const carboReal = userMG?.macroReal?.Carboidrato || 0
    const proteinaIdeal = userMG?.macroIdeal?.Proteina || 0
    const proteinaReal = userMG?.macroReal?.Proteina || 0
    const gorduraIdeal = userMG?.macroIdeal?.gordura || 0
    const gorduraReal = userMG?.macroReal?.gordura || 0

    let percentualCarbo = parseFloat(((carboReal / carboIdeal) * 100).toFixed(0)) || 0.5
    let percentualProteina = parseFloat(((proteinaReal / proteinaIdeal) * 100).toFixed(0)) || 0.5
    let percentualGordura = parseFloat(((gorduraReal / gorduraIdeal) * 100).toFixed(0)) || 0.5


    return (
        <SafeAreaView style={styles.container}>
            <Text>Carboidratos</Text>
            <View style={styles.macroContainer}>
                <ProgressBar animated progress={percentualCarbo / 100} width={screenWidth - 120} height={13}
                    color="#55AA55" unfilledColor="#38343424" borderWidth={0.5} />
                <Text>{carboReal} / {carboIdeal}g</Text>
            </View>

            <Text>Proteina</Text>
            <View style={styles.macroContainer}>
                <ProgressBar animated progress={percentualProteina / 100} width={screenWidth - 120} height={13}
                    color="#55AA55" unfilledColor="#38343424" borderWidth={0.5} />
                <Text>{proteinaReal} / {proteinaIdeal}g</Text>
                </View>

            <Text>Gordura</Text>
            <View style={styles.macroContainer}>
                <ProgressBar animated progress={percentualGordura / 100} width={screenWidth - 120} height={13}
                    color="#55AA55" unfilledColor="#38343424" borderWidth={0.5} />
                <Text>{gorduraReal} / {gorduraIdeal}g</Text>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto'
    },
    macroContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }

});




