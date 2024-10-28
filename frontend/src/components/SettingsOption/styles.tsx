import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');
const adaptivePadding = width * 0.020; // % da largura da tela

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
        flex: 1,
        borderWidth: 1,
        borderColor: '#ececec',
        padding: 2,
        borderRadius: 5,
        height: 40,
        color: '#000',
    },
    
});
