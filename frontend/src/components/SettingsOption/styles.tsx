import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    iconContainer: {
        marginRight: 20,
    },
    label: {
        fontSize: 18,
        flex: 1,
        fontFamily: "Signika_400Regular",
    },
    chevron: {
        marginLeft: "auto", // ou qualquer outra opção mencionada acima
        padding: 10,
        position: "absolute",
        right: 0,
    },
});
