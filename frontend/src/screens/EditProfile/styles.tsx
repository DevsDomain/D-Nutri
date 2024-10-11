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
        textAlign: 'center',
    },
    picker: {
        flex: 1, // Para ocupar o espaço adequadamente
        height: 50, // Altura semelhante aos outros componentes
        backgroundColor: 'transparent', // Fundo branco para manter a consistência
        borderWidth: 1, // Borda para manter o contorno
        borderColor: '#ddd', // Cor da borda semelhante aos inputs
        borderRadius: 8, // Bordas arredondadas, similar ao botão
        paddingHorizontal: 60, // Espaçamento interno
        color: '#000', // Cor do texto para melhor legibilidade
    },
});
