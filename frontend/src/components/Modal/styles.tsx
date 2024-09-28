import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    cancelButton: {
      marginRight: 10,
    },
    cancelButtonText: {
      color: 'red',
    },
    okButton: {
      marginLeft: 10,
    },
    okButtonText: {
      color: 'green',
    },
  });
  