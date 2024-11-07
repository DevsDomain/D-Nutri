import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    tituloContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 0,
        marginTop: 0,
    },
    tituloText: {
        fontSize: 30,
        fontFamily: "Roboto_700Bold",
        fontWeight: "bold",
        color: "#91C788",
        marginRight: 10,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: "contain",
    },
    formContainer: {
        width: "85%",
        padding: 20,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#BBDEB5",
        backgroundColor: "#BBDEB5",
        alignItems: "center",
        marginTop: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#64A759",
        textAlign: "center",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#64A759",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "white",
    },
    button: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "#91C788",
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    login: {
        color: "#91C788",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 3,
        marginTop: 0,
    },
    login2: {
        color: "#797878",
        fontSize: 17,
        marginRight: 5,
        marginTop: 0,
    },
});

export default styles;
//