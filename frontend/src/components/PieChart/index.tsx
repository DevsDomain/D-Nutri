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
    const percent = (macroReal / macroIdeal) * 100;

    return (
        <SafeAreaView>
            <View style={styles.circularChartContainer}>
                <AnimatedCircularProgress
                    size={200}
                    width={10}
                    fill={percent}
                    tintColor="#55AA55"
                    backgroundColor="#38343424"
                    padding={5}
                >
                    {() => (
                        <Text style={styles.percentText}>
                            {`${macroReal}/${macroIdeal} kcal`}

                        </Text>
                    )}
                </AnimatedCircularProgress>
                <Text style={styles.calorieText}>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    circularChartContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    calorieText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    percentText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#55AA55',
        position: 'absolute',
    },
});
