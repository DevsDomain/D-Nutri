import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { IUser } from '../../types/userDiary';

interface UserProps {
    userMG: IUser | undefined;
}

export default function PieChartCalorias({ userMG }: UserProps) {
    const macroIdeal = userMG?.macroIdeal?.Caloria || 1500;
    const macroReal = userMG?.macroReal?.Caloria || 830;
    const percent = (macroReal / macroIdeal) * 100




    return (
        <SafeAreaView style={styles.container}>
            {/* Circular Progress Chart */}
            <View style={styles.circularChartContainer}>
                <AnimatedCircularProgress
                   size={120}
                   width={15}
                   fill={percent}
                   tintColor="#55AA55"
                   backgroundColor="#ff938542"
                   padding={10}
                   {
                  ...<Text>                        {`${macroReal.toString()}/${macroIdeal.toString()} Kcal`}
                  </Text>
                   }
                    
                >
                </AnimatedCircularProgress>
                    <Text style={styles.calorieText}>
                        {`${macroReal}/${macroIdeal} Kcal`}
                    </Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    circularChartContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    calorieText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
 
});
