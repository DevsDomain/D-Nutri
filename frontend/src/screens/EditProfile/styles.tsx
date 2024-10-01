import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ececec',
        padding: 0,
    },
    header: {
        width: '100%',
        padding: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BBDEB5',
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: 'Signika_600SemiBold',
    },
    settingsOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white',
    },

    button: {
        backgroundColor: "#64A759",
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 5,
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 35,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontFamily: 'Signika_600SemiBold',
        textAlign: 'center',
    },
});
