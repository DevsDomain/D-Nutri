import { View, Text, StatusBar } from "react-native";
import { styles } from "./styles.pgInitial";
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

export default function Initial() {
    let [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_800ExtraBold,
    });
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        SplashScreen.preventAutoHideAsync();
        return null;
    }

    return (
        <View style={{ backgroundColor: "lightgreen", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.titulo}>D-Nutri app</Text>
            <Text style={styles.subtitulo}>Projeto de Aplicação para Nutrição</Text>
            <StatusBar barStyle="default" />
        </View>
    );
}