import { View, Text, StatusBar, StyleSheet } from "react-native";

export default function Initial() {
    return (
        <View style={{ backgroundColor: "lightgreen", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>D-Nutri app</Text>
            <Text>Projeto de Aplicação para Nutrição</Text>
            <StatusBar barStyle="default" />
        </View>
    );
}