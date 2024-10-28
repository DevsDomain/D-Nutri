import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#ececec',
    padding: 0,
  },

  // Header
  header: {
    width: '100%',
    padding: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BBDEB5',
  },
  headerTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: "600",
  },

  // Modal
  modalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },

  // Input e botão
  input: {
    flex: 0,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlign: "center",
  },
  eyeButton: {
    alignSelf: "flex-start",
    paddingLeft: 0,
    paddingRight: 10,
    marginTop: 10,
    fontSize: 30,
  },

  // Container de botão
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginRight: 5,
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  okButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  okButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Ações adicionais
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  confirmButton: {
    padding: 10,
  },
  cancelText: {
    color: "red",
  },
  confirmText: {
    color: "green",
  },
});
