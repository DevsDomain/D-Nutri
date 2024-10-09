import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { IUser } from '../../types/userDiary';

interface UserProps {
    userMG: IUser | undefined;
}

export default function PieChartCalorias({ userMG }: UserProps) {
    const macroIdeal = userMG?.macroIdeal?.Caloria || 0;
    const macroReal = userMG?.macroReal?.Caloria || 0;
    const percent = (macroReal / macroIdeal) * 100 || 0;

    return (
        <SafeAreaView>
            <View style={styles.circularChartContainer}>
                <AnimatedCircularProgress
                    size={175}
                    width={10}
                    fill={percent}
                    tintColor="#55AA55"
                    backgroundColor="#38343424"
                    padding={5}
                >
                    {() => (
                        <Text style={styles.percentText}>
                            {`${percent.toFixed(2) || 0}%`}

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
