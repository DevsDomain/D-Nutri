import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAF4E3",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#4C956C",
    },
    brands: {
        fontSize: 18,
        marginBottom: 20,
        color: "#4C956C",
        fontStyle: "italic",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 20,
    },
    column: {
        justifyContent: "center",
        alignItems: "center",
    },
    circleButton: {
        padding: 10,
    },

    valueText: {
        fontSize: 16,
        marginVertical: 10,
        color: "#4C956C",
    },
    table: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    rowTable: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    headerText: {
        fontWeight: "bold",
        color: "#4C956C",
    },
    tableText: {
        color: "#4C956C",
    },
    registerButton: {
        backgroundColor: "#4C956C",
        padding: 15,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
    },
    registerButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default styles;
//