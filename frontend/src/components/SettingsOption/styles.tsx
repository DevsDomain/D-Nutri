import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    iconContainer: {
        marginRight: 5,
        width: width * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
    },
        fontAwesome: {
        fontFamily: "FontAwesome",
        color: "#FF9385",
        padding: width * 0.02,
    },
    label: {
        flex: 1,
        fontFamily: "Signika_400Regular",
        fontSize: Math.max(width * 0.04, 14), // Define tamanho mínimo para legibilidade
    },
    textInput: {
        fontFamily: "Signika_400Regular",
        fontSize: Math.max(width * 0.04, 14), // Define tamanho mínimo para legibilidade
        flex: 1,
        borderWidth: 1,
        borderColor: '#ececec',
        padding: Math.max(2, width * 0.02), // Define padding adaptável com valor mínimo
        borderRadius: 5,
        height: 40,
        color: '#000',
    },
});
