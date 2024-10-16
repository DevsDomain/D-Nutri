import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        width: 85,
        height: 85,
        borderRadius: 100,
    },
    name: {
        fontSize: 22,
        marginTop: 10,
        marginLeft: 20,
        fontFamily: 'Signika_700Bold',
        maxWidth: 200
    },
});
