import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');
const adaptivePadding = width * 0.015; // % da largura da tela

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
    fontAwesome: {
        fontFamily: "FontAwesome",
        color: "#FF9385",
        padding: adaptivePadding,
    },
    textInput: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ececec',
        padding: 2,
        borderRadius: 5,
    },
});
